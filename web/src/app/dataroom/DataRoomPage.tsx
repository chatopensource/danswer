"use client";

import { User } from "@/lib/types";
import { Header } from "@/components/Header";
import { HealthCheckBanner } from "@/components/health/healthcheck";
import { ApiKeyModal } from "@/components/openai/ApiKeyModal";
import { InstantSSRAutoRefresh } from "@/components/SSRAutoRefresh";
import { FaChartBar } from "react-icons/fa";
import { Fragment } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { IssueOverview } from "./IssueOverview";
import { IssueResolution, ResolutionLog } from "./ResolutionLog";

function SectionHeader({
  name,
  icon,
}: {
  name: string;
  icon: React.FC<{ className: string }>;
}) {
  return (
    <div className="text-lg text-emphasis font-medium flex pb-0.5 mb-3.5 mt-2 font-bold">
      {icon({ className: "my-auto mr-1" })}
      {name}
    </div>
  );
}

const issueResolutions: IssueResolution[] = [
  {
    issue_id: 1,
    status: 'in progress',
    actions: [
      {
        date: '2023-03-01',
        description: 'Initial review of non-competition clauses.',
        by: 'John Doe',
      },
      {
        date: '2023-03-03',
        description: 'Discuss enforceability with legal team.',
        by: 'John Doe',
      },
    ],
    assignments: {
      'review-contracts': {
        assignedTo: 'Jane Smith',
        deadline: '2023-03-04',
        completed: false,
      },
      'update-clauses': {
        assignedTo: 'Mike Johnson',
        deadline: '2023-03-07',
        completed: false,
      },
    },
  },
  {
    issue_id: 2,
    status: 'in progress',
    actions: [
      {
        date: '2023-03-02',
        description: 'Review at-will employment clause with HR.',
        by: 'Sarah Lee',
      },
    ],
    assignments: {
      'check-local-laws': {
        assignedTo: 'David Brown',
        deadline: '2023-03-06',
        completed: false,
      },
    },
  },
  {
    issue_id: 3,
    status: 'resolved',
    actions: [
      {
        date: '2023-03-01',
        description: 'Analyze financial impact of severance pay.',
        by: 'Emily Davis',
      },
      {
        date: '2023-03-03',
        description: 'Present findings to finance team.',
        by: 'Emily Davis',
      },
    ],
    assignments: {
      'review-policies': {
        assignedTo: 'Michael Wilson',
        deadline: '2023-03-05',
        completed: true,
      },
    },
  },
  {
    issue_id: 4,
    status: 'in progress',
    actions: [
      {
        date: '2023-03-02',
        description: 'Evaluate change of control provisions.',
        by: 'Daniel Taylor',
      },
    ],
    assignments: {
      'review-ma-handbook': {
        assignedTo: 'Olivia Anderson',
        deadline: '2023-03-08',
        completed: false,
      },
    },
  },
  {
    issue_id: 5,
    status: 'in progress',
    actions: [
      {
        date: '2023-03-03',
        description: 'Consider legal implications of arbitration venue.',
        by: 'Sophia Martinez',
      },
    ],
    assignments: {
      'review-arbitration-examples': {
        assignedTo: 'Liam Thompson',
        deadline: '2023-03-10',
        completed: false,
      },
    },
  },
  {
    issue_id: 6,
    status: 'in progress',
    actions: [
      {
        date: '2023-03-04',
        description: 'Review indemnification clauses.',
        by: 'Ava Harris',
      },
    ],
    assignments: {
      'analyze-indemnification': {
        assignedTo: 'Noah Clark',
        deadline: '2023-03-09',
        completed: false,
      },
    },
  },
  {
    issue_id: 7,
    status: 'in progress',
    actions: [
      {
        date: '2023-03-05',
        description: 'Evaluate intellectual property provisions.',
        by: 'Isabella Lewis',
      },
    ],
    assignments: {
      'review-ip-clauses': {
        assignedTo: 'William Young',
        deadline: '2023-03-11',
        completed: false,
      },
    },
  },
  {
    issue_id: 8,
    status: 'resolved',
    actions: [
      {
        date: '2023-03-02',
        description: 'Analyze termination for cause provisions.',
        by: 'Harper Hall',
      },
      {
        date: '2023-03-04',
        description: 'Discuss findings with management team.',
        by: 'Harper Hall',
      },
    ],
    assignments: {
      'review-termination-clauses': {
        assignedTo: 'Benjamin Wright',
        deadline: '2023-03-06',
        completed: true,
      },
    },
  },
];

// Mock data for legal analysis points related to each issue_id
const legalAnalysis: LegalAnalysisItem[] = [
  {
    issue_id: 1,
    detail: "Review the enforceability of Non-Competition and Confidentiality Clauses...",
    reference: "Section 6 - Invention, Confidential Information and Non-Competition Agreement.",
    documents: [
      {
        title: "Employment Agreement",
        url: "/documents/employment-agreement.pdf",
        section: "Section 6"
      },
    ]
  },
  {
    issue_id: 2,
    detail: "Ensure the at-will employment clause in section 4(b) is consistent with local labor laws...",
    reference: "Section 4(b) - Term of Employment: Basic Rule.",
    documents: [
      {
        title: "Labor Law Compliance Guide",
        url: "/documents/labor-law-compliance-guide.pdf",
        section: "Chapter 4"
      },
    ]
  },
  {
    issue_id: 3,
    detail: "Analyze the financial implications of Termination Benefits and Severance Pay...",
    reference: "Section 5(b) - Termination Benefits: Severance Pay.",
    documents: [
      {
        title: "Severance Pay Policies",
        url: "/documents/severance-pay-policies.pdf",
        section: "Section 5(b)"
      },
    ]
  },
  {
    issue_id: 4,
    detail: "Evaluate the implications of change of control provisions on the company’s obligation...",
    reference: "Section 7(a) - Successors: Company’s Successors.",
    documents: [
      {
        title: "Mergers and Acquisitions Handbook",
        url: "/documents/ma-handbook.pdf",
        section: "Section 7(a)"
      },
    ]
  },
  {
    issue_id: 5,
    detail: "Consider the legal and operational implications of arbitration venue specificity...",
    reference: "Section 8(g) - Miscellaneous Provisions: Arbitration.",
    documents: [
      {
        title: "Arbitration Agreement Examples",
        url: "/documents/arbitration-agreement-examples.pdf",
        section: "Section 8(g)"
      },
    ]
  }
];



interface ContentBoxProps {
  width: string;
  height: string;
  className?: string; // Add this line
  children: React.ReactNode;
}

const ContentBox: React.FC<ContentBoxProps> = ({
  width,
  height,
  className,
  children,
}) => {
  return (
    <div
      className={`relative overflow-y-auto flex flex-col ${width} ${height} ${className}`}
    >
      {children}
    </div>
  );
};

export default ContentBox;

interface FinancialDataPoint {
  name: string;
  value: number;
}

interface FinancialAnalysisProps {
  financialImpacts: FinancialDataPoint[];
}

export const FinancialAnalysis: React.FC<FinancialAnalysisProps> = ({ financialImpacts }) => {
  return (
    <div>
      <SectionHeader name="Financial Analysis" icon={FaChartBar} /> {/* FaChartBar is a placeholder, replace with actual icon */}
      <div>
        <h3 className="font-semibold">Breakdown:</h3>
        {financialImpacts.map((impact, index) => (
          <p key={index}>{impact.name}: {impact.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={financialImpacts}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};



// LegalAnalysis component
interface LegalAnalysisProps {
  issueId: number;
}

interface DocumentReference {
  title: string;
  url: string;
  section: string;
}

interface LegalAnalysisItem {
  issue_id: number;
  detail: string;
  reference: string;
  documents: DocumentReference[];
}

// Assuming legalAnalysis is imported or accessible in your component

const LegalAnalysisDetail: React.FC<LegalAnalysisProps> = ({ issueId }) => {
  const analysis = legalAnalysis.find((item) => item.issue_id === issueId);

  if (!analysis) {
    return (
      <div className="p-6 border border-gray-200 rounded-lg shadow bg-white">
        <p className="text-gray-700">No legal analysis found for this issue.</p>
      </div>
    );
  }

  return (
    <div className="p-6 border-l-4 border-yellow-400 bg-white rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Legal Analysis
      </h3>
      <p className="text-gray-700 mb-4">{analysis.detail}</p>
      <a href="#"
         className="text-blue-600 hover:text-blue-800 hover:underline mb-4">
        Refer to: {analysis.reference}
      </a>
      {/* Document references section */}
      {analysis.documents && analysis.documents.length > 0 && (
        <div className="mt-4">
          <h4 className="text-md font-medium text-gray-900 mb-2">Document References</h4>
          {analysis.documents.map((doc, index) => (
            <div key={index} className="mb-2">
              <p className="text-gray-700 font-semibold">{doc.title} ({doc.section})</p>
              <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">
                View Document
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export function DataRoomLayout({
  user,
  issue_id
}: {
  user: User | null;
  issue_id:number
}) {
  // Assuming resolution data is fetched or available in your component
  const resolution = issueResolutions.find(res => res.issue_id === issue_id);

  return (
    <>
      <div className="bg-gray-100 p-5">
        <Header user={user} />
        <HealthCheckBanner />
        <ApiKeyModal />
        <InstantSSRAutoRefresh />

        <div className="container grid-cols-1 lg:grid-cols-12 gap-2 items-start">
          {/* IssueOverview box */}

          {/* Other ContentBoxes like LegalAnalysis and ResolutionLog... */}
          {/* ContentBox for LegalAnalysis, taking full width on mobile, half on larger screens */}
          <ContentBox width="w-full" height="auto" className="bg-white p-6 rounded-lg shadow-lg lg:col-span-6">
            <LegalAnalysisDetail issueId={issue_id} />
          </ContentBox>

          {/* Placeholder for FinancialAnalysis */}
          {/* <ContentBox width="w-full" height="auto" className="bg-white p-6 rounded-lg shadow-lg lg:col-span-6">
            <FinancialAnalysis issueId={issue_id} />
          </ContentBox> */}

          {/* Resolution Tracking Box */}
        {resolution && (
          <ContentBox width="w-full" height="auto" className="bg-white p-6 rounded-lg shadow-lg lg:col-span-6">
            <ResolutionLog actions={resolution.actions} assignments={resolution.assignments} />
            {/* Integrate other components like StatusTimeline and AssignmentManager as needed */}
          </ContentBox>
        )}
          <ContentBox width="w-full" height="auto" className="bg-white p-6 rounded-lg shadow-lg lg:col-span-6">
            <IssueOverview issueId={issue_id} />
          </ContentBox>
          </div>
        </div>
    </>
  );
}

