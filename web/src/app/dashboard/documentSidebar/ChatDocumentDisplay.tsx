import React from 'react';
import { Issue } from "../interfaces";
import Link from 'next/link';

interface IssueDisplayProps {
  issue: Issue;
}

export function ChatIssueDisplay({
  issue,
}: IssueDisplayProps) {
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
  debugger;
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
        <div style={{ fontWeight: 'bold' }}><strong>Recommendation:</strong> {issue.immediateRecommendation}</div>
      </div>
      <Link href={`/issue/${Number(issue.issue_id)}`}>
        <button style={{ padding: '8px 16px', border: 'none', borderRadius: '5px', backgroundColor: '#0d6efd', color: 'white', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', fontSize: '0.9rem' }}>
          Details
        </button>
      </Link>
    </div>
  );
};
