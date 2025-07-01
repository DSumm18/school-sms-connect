
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { MessageSquare } from 'lucide-react';

const SMSNode = ({ data }: { data: any }) => {
  return (
    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3 min-w-48">
      <Handle type="target" position={Position.Top} />
      
      <div className="flex items-center space-x-2 mb-2">
        <MessageSquare className="h-4 w-4 text-blue-600" />
        <span className="font-medium text-blue-800">Send SMS</span>
      </div>
      
      <div className="text-xs text-gray-600 bg-white p-2 rounded border">
        {data.content || 'SMS message content...'}
      </div>
      
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default SMSNode;
