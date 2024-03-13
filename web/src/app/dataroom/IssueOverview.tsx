interface IssueOverviewItem {
  issue_id: number;
  summary: string;
  fullTextLink: string;
  tags: string[]; // Tags like 'legal', 'financial', 'operational'
}

const issueOverviews: IssueOverviewItem[] = [
  {
    issue_id: 1,
    summary: "SolarVantage",
    fullTextLink: "/documents/employment-agreement.pdf#section6",
    tags: ['eployment', 'legal', 'confidentiality', 'non-competition']
  },
  {
    issue_id: 2,
    summary: "ECorp",
    fullTextLink: "/documents/employment-agreement.pdf#section4b",
    tags: ['legal', 'labor', 'compliance']
  },
  {
    issue_id: 3,
    summary: "Hooli",
    fullTextLink: "/documents/employment-agreement.pdf#section5b",
    tags: ['financial', 'employment', 'benefits']
  },
  {
    issue_id: 4,
    summary: "Pied Piper",
    fullTextLink: "/documents/employment-agreement.pdf#section7a",
    tags: ['legal', 'corporate', 'ma']
  },
  {
    issue_id: 5,
    summary: "Goolybib",
    fullTextLink: "/documents/employment-agreement.pdf#section8g",
    tags: ['legal', 'arbitration']
  },
  {
    issue_id: 6,
    summary: "Aviato",
    fullTextLink: "/documents/employment-agreement.pdf#section9",
    tags: ['legal', 'indemnification']
  },
  {
    issue_id: 7,
    summary: "AllSafe Cybersecurity",
    fullTextLink: "/documents/employment-agreement.pdf#section10",
    tags: ['legal', 'ip', 'inventions']
  },
  {
    issue_id: 8,
    summary: "ChatOpenSource",
    fullTextLink: "/documents/employment-agreement.pdf#section11",
    tags: ['legal', 'employment', 'termination']
  }
];

export interface IssueOverviewProps {
  issueId: number;
}

export const IssueOverview: React.FC = () => { // Removed issueId prop as it's no longer needed
  // Define the styles for tags based on type
  const tagStyles = {
    legal: {
      color: '#4f4f4f',
      backgroundColor: '#e0e0e0',
    },
    financial: {
      color: '#2b6cb0',
      backgroundColor: '#bee3f8',
    },
    operational: {
      color: '#2f855a',
      backgroundColor: '#9ae6b4',
    },
    // Add other tag types with their respective styles
  };

  return (
    <>
      {issueOverviews.map((overview, index) => (
        <div key={index} className="p-6 border-l-4 border-yellow-400 bg-white rounded-lg shadow mb-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Dataroom
          </h3>
          <p className="text-gray-700 mb-4">{overview.summary}</p>
          <a href={overview.fullTextLink}
             className="text-blue-600 hover:text-blue-800 hover:underline mb-4">
            Go to Dataroom Dashboard
          </a>
          <div className="mt-4">
            {overview.tags.map((tag, tagIndex) => {
              const style = tagStyles[tag as keyof typeof tagStyles] || {};
              return (
                <span key={tagIndex} style={{ ...style, fontWeight: 'bold', padding: '4px 8px', borderRadius: '8px', marginRight: '8px', display: 'inline-block' }}>
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
};
