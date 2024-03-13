interface IssueOverviewItem {
  issue_id: number;
  summary: string;
  fullTextLink: string;
  tags: string[]; // Tags like 'legal', 'financial', 'operational'
}

const issueOverviews: IssueOverviewItem[] = [
  {
    issue_id: 1,
    summary: "This issue pertains to the enforceability of Non-Competition and Confidentiality Clauses in SolarVantage's standard Employment Agreement.",
    fullTextLink: "/documents/employment-agreement.pdf#section6",
    tags: ['legal', 'employment']
  },
  {
    issue_id: 2,
    summary: "This issue relates to ensuring the at-will employment clause in section 4(b) of the Employment Agreement is consistent with local labor laws.",
    fullTextLink: "/documents/employment-agreement.pdf#section4b",
    tags: ['legal', 'labor', 'compliance']
  },
  {
    issue_id: 3,
    summary: "This issue involves analyzing the financial implications of Termination Benefits and Severance Pay as outlined in the Employment Agreement.",
    fullTextLink: "/documents/employment-agreement.pdf#section5b",
    tags: ['financial', 'employment', 'benefits']
  },
  {
    issue_id: 4,
    summary: "This issue focuses on evaluating the implications of change of control provisions on the company's obligations in the event of a merger or acquisition.",
    fullTextLink: "/documents/employment-agreement.pdf#section7a",
    tags: ['legal', 'corporate', 'ma']
  },
  {
    issue_id: 5,
    summary: "This issue considers the legal and operational implications of arbitration venue specificity in the Employment Agreement.",
    fullTextLink: "/documents/employment-agreement.pdf#section8g",
    tags: ['legal', 'arbitration']
  },
  {
    issue_id: 6,
    summary: "This issue examines the scope and limitations of indemnification clauses in the Employment Agreement.",
    fullTextLink: "/documents/employment-agreement.pdf#section9",
    tags: ['legal', 'indemnification']
  },
  {
    issue_id: 7,
    summary: "This issue evaluates the intellectual property provisions in the Employment Agreement, including ownership and assignment of inventions.",
    fullTextLink: "/documents/employment-agreement.pdf#section10",
    tags: ['legal', 'ip', 'inventions']
  },
  {
    issue_id: 8,
    summary: "This issue analyzes the termination for cause provisions in the Employment Agreement and their potential impact on the company.",
    fullTextLink: "/documents/employment-agreement.pdf#section11",
    tags: ['legal', 'employment', 'termination']
  }
];

export interface IssueOverviewProps {
  issueId: number;
}

export const IssueOverview: React.FC<IssueOverviewProps> = ({ issueId }) => {
  const overview = issueOverviews.find(item => item.issue_id === issueId);

  if (!overview) {
    return (
      <div className="p-6 border border-gray-200 rounded-lg shadow bg-white">
        <p className="text-gray-700">No issue overview available 1.</p>
      </div>
    );
  }

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
    <div className="p-6 border-l-4 border-yellow-400 bg-white rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Issue Overview
      </h3>
      <p className="text-gray-700 mb-4">{overview.summary}</p>
      <a href={overview.fullTextLink}
         className="text-blue-600 hover:text-blue-800 hover:underline mb-4">
        Read the full text
      </a>
      <div className="mt-4">
        {overview.tags.map((tag, index) => {
          const style = tagStyles[tag as keyof typeof tagStyles] || {};
          return (
            <span key={index} style={{ ...style, fontWeight: 'bold', padding: '4px 8px', borderRadius: '8px', marginRight: '8px', display: 'inline-block' }}>
              {tag.charAt(0).toUpperCase() + tag.slice(1)}
            </span>
          );
        })}
      </div>
    </div>
  );
};
