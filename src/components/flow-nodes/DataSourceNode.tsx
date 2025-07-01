
import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Database, Sheet, Cloud } from 'lucide-react';

const DataSourceNode = ({ data }: { data: any }) => {
  const [sourceType, setSourceType] = useState(data.dataSource || 'googleSheets');
  
  const getIcon = () => {
    switch (sourceType) {
      case 'googleSheets':
        return <Sheet className="h-4 w-4 text-purple-600" />;
      case 'airtable':
        return <Database className="h-4 w-4 text-purple-600" />;
      case 'supabase':
        return <Cloud className="h-4 w-4 text-purple-600" />;
      default:
        return <Database className="h-4 w-4 text-purple-600" />;
    }
  };

  return (
    <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-3 min-w-48">
      <Handle type="target" position={Position.Top} />
      
      <div className="flex items-center space-x-2 mb-2">
        {getIcon()}
        <span className="font-medium text-purple-800">Data Source</span>
      </div>
      
      <div className="space-y-2">
        <select 
          className="w-full text-xs border rounded px-2 py-1 bg-white"
          value={sourceType}
          onChange={(e) => setSourceType(e.target.value)}
        >
          <option value="googleSheets">Google Sheets</option>
          <option value="airtable">Airtable</option>
          <option value="supabase">Supabase DB</option>
        </select>
        
        <div className="text-xs text-gray-600 bg-white p-2 rounded border">
          {sourceType === 'googleSheets' && 'Connect to Google Sheets'}
          {sourceType === 'airtable' && 'Connect to Airtable Base'}
          {sourceType === 'supabase' && 'Connect to Supabase Database'}
        </div>
      </div>
      
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default DataSourceNode;
