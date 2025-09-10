import 'dotenv/config';
import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import memorystore from "memorystore";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

// Create memory store
const MemoryStore = memorystore(session);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Ortam değişkenlerinden SESSION_SECRET'ı alın veya varsayılan değer kullanın
const SESSION_SECRET = process.env.SESSION_SECRET || "bilgisayar-operatoru-app-secret";

// PostgreSQL ile oturum depolamayı desteklemek için
let sessionStoreConfig: any = {
  store: new MemoryStore({
    checkPeriod: 86400000 // Prune expired entries every 24h
  })
};

// Eğer DATABASE_URL tanımlıysa ve production ortamındaysa, PostgreSQL session store kullan
if (process.env.DATABASE_URL && process.env.NODE_ENV === 'production') {
  try {
    const pgSession = require('connect-pg-simple')(session);
    sessionStoreConfig = {
      store: new pgSession({
        conString: process.env.DATABASE_URL,
        tableName: 'session', // Oturum verileri için tablo adı
        createTableIfMissing: true
      })
    };
    console.log("PostgreSQL session store initialized");
  } catch (error) {
    console.error("Failed to initialize PostgreSQL session store:", error);
    // Hata durumunda memory store'a düş
  }
}

// Set up session middleware
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  ...sessionStoreConfig,
  cookie: { 
    secure: process.env.NODE_ENV === 'production', // Production'da HTTPS kullan
    maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
  }
}));

// For TypeScript typing
declare module "express-session" {
  interface SessionData {
    userId?: number;
    progress?: any[];
    moduleUnlocks?: any[];
    quizResults?: any[];
  }
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    console.error("Server error:", err);
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const HOST = process.env.NODE_ENV === 'development' ? '127.0.0.1' : '0.0.0.0';
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3005;

  server.listen({
    port: PORT,
    host: HOST,
  }, () => {
    log(`serving on ${HOST}:${PORT}`);
  });
})();
