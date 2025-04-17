import { ContentSection, CardData, TableData, InfoData } from "@/lib/types";

interface LessonContentProps {
  sections: ContentSection[];
}

export function LessonContent({ sections }: LessonContentProps) {
  const renderSection = (section: ContentSection, index: number) => {
    switch (section.type) {
      case "heading":
        return (
          <h1 key={index} className="text-2xl font-bold text-neutral-800 mb-4">
            {section.content as string}
          </h1>
        );
        
      case "paragraph":
        return (
          <p key={index} className="text-neutral-700 mb-4">
            {section.content as string}
          </p>
        );
        
      case "list":
        return (
          <ul key={index} className="list-disc pl-5 mb-4 text-neutral-700 space-y-2">
            {(section.content as string[]).map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        );
        
      case "table":
        const tableData = section.content as TableData;
        return (
          <div key={index} className="overflow-x-auto mb-6">
            <table className="min-w-full bg-white border border-neutral-200 rounded-lg mt-4">
              <thead>
                <tr className="bg-neutral-50">
                  {tableData.headers.map((header, headerIndex) => (
                    <th key={headerIndex} className="py-2 px-4 border-b text-left text-sm font-medium text-neutral-800">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className={`py-3 px-4 ${rowIndex < tableData.rows.length - 1 ? "border-b" : ""} text-sm`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        
      case "card":
        const cards = section.content as CardData[];
        return (
          <div key={index} className="grid md:grid-cols-2 gap-4 my-6">
            {cards.map((card, cardIndex) => (
              <div key={cardIndex} className="bg-neutral-50 p-4 rounded-lg border border-neutral-100">
                <div className="flex items-start">
                  <span className="material-icons text-primary mr-3 mt-0.5">{card.icon}</span>
                  <div>
                    <h3 className="font-semibold text-neutral-800">{card.title}</h3>
                    <p className="text-sm text-neutral-600 mt-1">{card.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
        
      case "info":
        const infoData = section.content as InfoData;
        return (
          <div key={index} className="bg-primary/5 border border-primary/20 rounded-lg p-4 my-6">
            <div className="flex items-start">
              <span className="material-icons text-primary mr-3 mt-0.5">{infoData.icon}</span>
              <div>
                <h3 className="font-semibold text-neutral-800">{infoData.title}</h3>
                <p className="text-sm text-neutral-700 mt-1" dangerouslySetInnerHTML={{ __html: infoData.description }}></p>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="text-neutral-700 space-y-4">
      {sections.map(renderSection)}
    </div>
  );
}

export default LessonContent;
