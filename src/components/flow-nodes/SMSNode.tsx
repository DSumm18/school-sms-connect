
import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { MessageSquare, Settings } from 'lucide-react';

const SMSNode = ({ data }: { data: any }) => {
  const [showConfig, setShowConfig] = useState(false);
  const [message, setMessage] = useState(data.content || 'Dear {ParentName}, {StudentName} is late for school.');

  return (
    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 min-w-48">
      <Handle type="target" position={Position.Top} />
      
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-4 w-4 text-blue-600" />
          <span className="font-medium text-blue-800">Send SMS</span>
        </div>
        <button 
          onClick={() => setShowConfig(!showConfig)}
          className="text-blue-600 hover:text-blue-800"
        >
          <Settings className="h-3 w-3" />
        </button>
      </div>
      
      {showConfig ? (
        <div className="space-y-2">
          <textarea
            className="w-full text-xs border rounded px-2 py-1 bg-white resize-none"
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="SMS message template..."
          />
          <div className="text-xs text-gray-500">
            Use variables: {'{ParentName}'}, {'{StudentName}'}, {'{Date}'}
          </div>
        </div>
      ) : (
        <div className="text-xs text-gray-600 bg-white p-2 rounded border">
          {message.length > 50 ? `${message.substring(0, 50)}...` : message}
        </div>
      )}
      
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default SMSNode;
