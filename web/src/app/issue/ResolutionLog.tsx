import { Fragment } from "react";

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

export interface ResolutionAction {
  date: string;
  description: string;
  by: string; // Could be the ID or name of the team member who took the action
}


export interface IssueResolution {
  issue_id: number;
  status: 'open' | 'in progress' | 'resolved';
  actions: ResolutionAction[];
  assignments: {
    [key: string]: {
      assignedTo: string; // Team member ID or name
      deadline: string; // ISO format date
      completed: boolean;
    };
  };
}

export interface ResolutionLogProps {
  actions: ResolutionAction[];
  assignments: {
    [assignmentId: string]: {
      assignedTo: string;
      deadline: string;
      completed: boolean;
    };
  };
}
export const ResolutionLog: React.FC<ResolutionLogProps> = ({ actions, assignments }) => {
  // Ensure assignments is an object before using Object.keys or Object.entries
  const safeAssignments = assignments ?? {};

  return (
    <div className="p-6 border-l-4 border-yellow-400 bg-white rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Resolution Tracking
      </h3>
      <dl>
        <dt className="text-md font-medium text-gray-900 mb-2">Actions Taken</dt>
        {actions.length > 0 ? actions.map((action, index) => (
            
          <dd key={index} className="text-gray-700 mb-1">
            
            <strong>{action.date}</strong>: {action.description} (by <strong>{action.by}</strong>)
          </dd>
        )) : <dd className="text-gray-700">No actions recorded.</dd>}
      </dl>
      <dl className="mt-4">
        <dt className="text-md font-medium text-gray-900 mb-2">Assignments</dt>
        {Object.keys(safeAssignments).length > 0 ? Object.entries(safeAssignments).map(([id, assignment]) => (
          <Fragment key={id}>
            <hr></hr>

            <dd className="text-gray-700 mb-1">
              <strong>Task</strong>: {id.replace(/-/g, ' ')}
            </dd>
            <dd className="text-gray-700 mb-1">
              <strong>Assigned to</strong>: {assignment.assignedTo}
            </dd>
            <dd className="text-gray-700 mb-1">
              <strong>Deadline</strong>: {assignment.deadline}
            </dd>
            <dd className="text-gray-700 mb-1">
              <strong>Status</strong>: {assignment.completed ? 'Completed' : 'In Progress'}
            </dd>
            <hr></hr>
          </Fragment>
        )) : <dd className="text-gray-700">No assignments recorded.</dd>}
      </dl>
    </div>
  );
};