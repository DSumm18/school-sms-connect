
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Mail } from 'lucide-react';

const EmailNode = ({ data }: { data: any }) => {
  return (
    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3 min-w-48">
      <Handle type="target" position={Position.Top} />
      
      <div className="flex items-center space-x-2 mb-2">
        <Mail className="h-4 w-4 text-green-600" />
        <span className="font-medium text-green-800">Email Report</span>
      </div>
      
      <div className="text-xs text-gray-600 space-y-1">
        <div className="bg-white p-1 rounded border">
          To: {data.email || 'admin@school.com'}
        </div>
        <div className="bg-white p-1 rounded border">
          {data.content || 'Email report content...'}
        </div>
      </div>
      
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default EmailNode;
