import React from 'react';


export interface AITask {
  id: number;
  description: string;
  type: 'dataRequest' | 'meetingSchedule' | 'memoCreation';
  status: 'pending' | 'approved';
}

export interface AIAutomationTasksProps {
  issueId: number;
  tasks: AITask[];
  onApproveTask: (taskId: number) => void;
}



export const AIAutomationTasks: React.FC<AIAutomationTasksProps> = ({ issueId, tasks, onApproveTask }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">AI-Generated Tasks for Issue #{issueId}</h3>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="mb-4">
            <p className="text-gray-700">{task.description}</p>
            <button
              className={`mt-2 px-4 py-2 text-white font-bold rounded ${task.status === 'pending' ? 'bg-blue-500 hover:bg-blue-700' : 'bg-gray-500'}`}
              onClick={() => task.status === 'pending' && onApproveTask(task.id)}
              disabled={task.status !== 'pending'}
            >
              {task.status === 'pending' ? 'Approve' : 'Approved'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
