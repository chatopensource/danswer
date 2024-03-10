import React from 'react';
import { Issue } from "../interfaces";

interface IssueDisplayProps {
  issue: Issue;
  setPopup: (popupSpec: PopupSpec | null) => void;
}

export function ChatIssueDisplay({
  issue,
  setPopup,
}: IssueDisplayProps) {
  // Define the severity styles with a TypeScript type
  type SeverityStyle = {
    [key in Issue['severity']]?: {
      color: string;
      backgroundColor: string;
    }
  };

  const severityStyles: SeverityStyle = {
    Low: {
      color: '#0d6efd', // Bootstrap primary blue
      backgroundColor: '#e3f2fd', // light blue
    },
    Medium: {
      color: '#d39e00', // Bootstrap warning yellow
      backgroundColor: '#fff3e0', // light orange
    },
    High: {
      color: '#dc3545', // Bootstrap danger red
      backgroundColor: '#ffebee', // light red
    }
  };

  // Safely access the severity styles with type assertion
  const severity = issue.severity as keyof SeverityStyle;
  const issueSeverityStyle = severityStyles[severity] || {};

  return (
    <div key={issue.issue_id} style={{ padding: '20px', margin: '10px 0', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', borderRadius: '8px', backgroundColor: 'white' }}>
      <div style={{ marginBottom: '10px' }}>
        {/* Severity indicator */}
        <span style={{ ...issueSeverityStyle, fontWeight: 'bold', padding: '4px 8px', borderRadius: '8px' }}>
          {severity} Severity
        </span>
        <span style={{ marginLeft: '8px' }}>{issue.document_type}</span>
      </div>
      <div style={{ fontSize: '0.9rem', marginBottom: '16px' }}>
        {/* Issue Reasoning */}
        <div><strong>Reason:</strong> {issue.reasoning}</div>
        {/* Recommendation */}
        <div style={{ fontWeight: 'bold' }}><strong>Recommendation:</strong> {issue.immediateRecommendation}</div>
      </div>
      <button
        onClick={() => { /* setPopup function call */ }}
        style={{
          padding: '8px 16px',
          border: 'none',
          borderRadius: '5px',
          backgroundColor: '#0d6efd',
          color: 'white',
          cursor: 'pointer',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
          fontSize: '0.9rem'
        }}
      >
        Details
      </button>
    </div>
  );
}
