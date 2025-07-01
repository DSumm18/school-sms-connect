
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Clock } from 'lucide-react';

const DelayNode = ({ data }: { data: any }) => {
  return (
    <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-3 min-w-48">
      <Handle type="target" position={Position.Top} />
      
      <div className="flex items-center space-x-2 mb-2">
        <Clock className="h-4 w-4 text-orange-600" />
        <span className="font-medium text-orange-800">Wait</span>
      </div>
      
      <div className="text-xs text-gray-600 bg-white p-2 rounded border">
        {data.delay || 30} minutes
      </div>
      
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default DelayNode;
