
import React from 'react';
import { Handle, Position } from '@xyflow/react';
import { Play } from 'lucide-react';

const TriggerNode = ({ data }: { data: any }) => {
  return (
    <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-3 min-w-48">
      <div className="flex items-center space-x-2 mb-2">
        <Play className="h-4 w-4 text-purple-600" />
        <span className="font-medium text-purple-800">Trigger</span>
      </div>
      
      <div className="text-xs text-gray-600 bg-white p-2 rounded border">
        {data.label || 'Event trigger'}
      </div>
      
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default TriggerNode;
