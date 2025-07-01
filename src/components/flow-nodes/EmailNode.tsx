
import React, { useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { Mail, Settings } from 'lucide-react';

const EmailNode = ({ data }: { data: any }) => {
  const [showConfig, setShowConfig] = useState(false);
  const [email, setEmail] = useState(data.email || 'admin@school.com');
  const [subject, setSubject] = useState(data.subject || 'Late Student Report');
  const [content, setContent] = useState(data.content || 'Late student report for {Date}');

  return (
    <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3 min-w-48">
      <Handle type="target" position={Position.Top} />
      
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Mail className="h-4 w-4 text-green-600" />
          <span className="font-medium text-green-800">Email Report</span>
        </div>
        <button 
          onClick={() => setShowConfig(!showConfig)}
          className="text-green-600 hover:text-green-800"
        >
          <Settings className="h-3 w-3" />
        </button>
      </div>
      
      {showConfig ? (
        <div className="space-y-2">
          <input
            type="email"
            className="w-full text-xs border rounded px-2 py-1 bg-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Recipient email..."
          />
          <input
            type="text"
            className="w-full text-xs border rounded px-2 py-1 bg-white"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Email subject..."
          />
          <textarea
            className="w-full text-xs border rounded px-2 py-1 bg-white resize-none"
            rows={2}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Email content..."
          />
        </div>
      ) : (
        <div className="text-xs text-gray-600 space-y-1">
          <div className="bg-white p-1 rounded border">
            To: {email}
          </div>
          <div className="bg-white p-1 rounded border">
            {subject}
          </div>
        </div>
      )}
      
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default EmailNode;
