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
  tasks: AITask[];
}

export const AIAutomationTasks: React.FC<AIAutomationTasksProps> = ({ issueId, tasks }) => {
  const [localTasks, setLocalTasks] = useState<AITask[]>(tasks);

  const handleApprove = (taskId: number) => {
    // Update the task status to processing to show the spinner
    setLocalTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: 'processing' } : task
      )
    );

    // Set timeout to simulate processing delay
    const timer = setTimeout(() => {
      setLocalTasks(prevTasks =>
        prevTasks.map(task =>
          task.id === taskId ? { ...task, status: 'approved' } : task
        )
      );
    }, 1000);

    // Return a cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  };

  // Handle the button click event
  const handleClick = (taskId: number) => {
    // Call the approve handler
    const cleanup = handleApprove(taskId);
    // Setup the cleanup function
    return cleanup;
  };

  return (
    <div>
      {localTasks.map(task => (
        <div key={task.id} className="flex justify-between items-center border-b-2 py-2">
          <span className="text-gray-700">{task.description}</span>
          <button
            onClick={() => handleClick(task.id)}
            disabled={task.status === 'approved'}
            className={`flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white ${task.status === 'approved' ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
          >
            {task.status === 'processing' && <AiOutlineLoading3Quarters className="animate-spin h-5 w-5 mr-3" />}
            {task.status === 'pending' && <span>Approve</span>}
            {task.status === 'approved' && <AiOutlineCheckCircle className="text-green-500 h-5 w-5 mr-3" />}
          </button>
        </div>
      ))}
    </div>
  );
};
