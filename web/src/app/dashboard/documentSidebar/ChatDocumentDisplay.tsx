import React, { useState } from 'react';
import { Issue } from "../interfaces";
import Link from 'next/link';
import { AiOutlineCheckCircle, AiOutlineLoading3Quarters } from 'react-icons/ai';

interface IssueDisplayProps {
  issue: Issue;
  onResolve: (issueId: number) => void;
}

export function ChatIssueDisplay({ issue, onResolve }: IssueDisplayProps) {
  const [isResolving, setIsResolving] = useState(false);
  const severityStyles = {
    Low: {
      color: '#0d6efd',
      backgroundColor: '#e3f2fd',
    },
    Medium: {
      color: '#ffc107',
      backgroundColor: '#fff3e0',
    },
    High: {
      color: '#dc3545',
      backgroundColor: '#ffebee',
    },
  };

  const severity = issue.severity as keyof typeof severityStyles;
  const issueSeverityStyle = severityStyles[severity] || {};

  const handleResolve = () => {
    setIsResolving(true);
    setTimeout(() => {
      onResolve(issue.issue_id);
      setIsResolving(false);
    }, 1000); // Simulates an async operation
  };

  const buttonStyle = {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    color: 'white',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    fontSize: '0.9rem',
    marginRight: '8px',
  };

  return (
    <div key={issue.issue_id} style={{ padding: '20px', margin: '10px 0', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: 'white' }}>
      <div style={{ marginBottom: '10px' }}>
        <span style={{ ...issueSeverityStyle, fontWeight: 'bold', padding: '4px 8px', borderRadius: '8px' }}>
          {issue.severity} Severity
        </span>
        <span style={{ marginLeft: '8px' }}>{issue.document_type}</span>
      </div>
      <div style={{ fontSize: '0.9rem', marginBottom: '16px' }}>
        <div><strong>Reason:</strong> {issue.reasoning}</div>
        <div><strong>Recommendation:</strong> {issue.immediateRecommendation}</div>
      </div>
      <div>
        <Link href={`/issue/${issue.issue_id}`}>
          <button style={{ ...buttonStyle, backgroundColor: '#0d6efd' }}>
            Details
          </button>
        </Link>
        <button
          style={{ ...buttonStyle, backgroundColor: isResolving || issue.resolvingStatus === 'resolved' ? '#ccc' : '#28a745' }}
          onClick={handleResolve}
          disabled={isResolving || issue.resolvingStatus === 'resolved'}
        >
          {isResolving ? <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-3" /> : issue.resolvingStatus === 'resolved' ? <AiOutlineCheckCircle className="text-green-500 h-5 w-5" /> : 'Resolve'}
        </button>
        {/* Additional buttons for Comment and Share can be similarly implemented */}
      </div>
    </div>
  );
}
