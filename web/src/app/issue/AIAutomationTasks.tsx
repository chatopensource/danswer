import React, { useState } from 'react';
import { AiOutlineCheckCircle, AiOutlineLoading3Quarters } from 'react-icons/ai';

interface AITask {
  id: number;
  description: string;
  type: 'dataRequest' | 'meetingSchedule' | 'memoCreation';
  status: 'pending' | 'approved' | 'processing';
}

interface AIAutomationTasksProps {
  issueId: number;
}

const aiTasks: AITask[] = [
  {
    id: 1,
    description: 'Send data request to SolarVantage for confirmation of local labor complicance.',
    type: 'dataRequest',
    status: 'pending',
  },
  {
    id: 2,
    description: 'Schedule meeting with SolarVantage legal team to discuss contract clauses.',
    type: 'meetingSchedule',
    status: 'pending',
  },
  {
    id: 3,
    description: 'Generate investment memo based on issue findings.',
    type: 'memoCreation',
    status: 'pending',
  },
];
export const AIAutomationTasks: React.FC<AIAutomationTasksProps> = ({ issueId }) => {
  const [localTasks, setLocalTasks] = useState<AITask[]>(aiTasks);

  const handleApprove = (taskId: number) => {
    // Temporarily store the current tasks to use inside the timeout
    const currentTasks = [...localTasks];

    // Update the task status to processing to show the spinner
    setLocalTasks(currentTasks.map(task =>
      task.id === taskId ? { ...task, status: 'processing' } : task
    ));

    // Set timeout to simulate processing delay
    setTimeout(() => {
      setLocalTasks(currentTasks.map(task =>
        task.id === taskId ? { ...task, status: 'approved' } : task
      ));
    }, 1000);
  };

  return (
    <div className="p-6 border-l-4 border-yellow-400 bg-white rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        AI Automation Tasks
      </h3>
      {localTasks.map(task => (
        <div key={task.id} className="flex justify-between items-center border-b border-gray-300 py-2">
          <span className="text-gray-700">{task.description}</span>
          <button
            onClick={() => handleApprove(task.id)}
            disabled={task.status !== 'pending'}
            className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium 
                        focus:outline-none focus:ring-2 focus:ring-offset-2 ${task.status === 'pending' 
                        ? 'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500' 
                        : 'cursor-not-allowed bg-gray-300'}`}
          >
            {task.status === 'processing' && <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-3" />}
            {task.status === 'pending' && <span>Approve</span>}
            {task.status === 'approved' && <AiOutlineCheckCircle className="text-green-500 h-5 w-5" />}
          </button>
        </div>
      ))}
    </div>
  );
};
