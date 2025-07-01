
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Sheet, Cloud, Link, CheckCircle, AlertCircle } from 'lucide-react';

const DataIntegrations = () => {
  const [integrations] = useState([
    {
      id: 'googleSheets',
      name: 'Google Sheets',
      icon: <Sheet className="h-5 w-5" />,
      status: 'connected',
      description: 'Student data and parent contact information',
      lastSync: '2 minutes ago',
      records: 1247
    },
    {
      id: 'airtable',
      name: 'Airtable',
      icon: <Database className="h-5 w-5" />,
      status: 'disconnected',
      description: 'Attendance records and automated workflows',
      lastSync: 'Never',
      records: 0
    },
    {
      id: 'supabase',
      name: 'Supabase Database',
      icon: <Cloud className="h-5 w-5" />,
      status: 'available',
      description: 'Secure cloud database for all school data',
      lastSync: 'Real-time',
      records: 0
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800';
      case 'disconnected': return 'bg-red-100 text-red-800';
      case 'available': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'disconnected': return <AlertCircle className="h-4 w-4 text-red-600" />;
      case 'available': return <Link className="h-4 w-4 text-blue-600" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Data Sources</h3>
        <Badge variant="outline" className="text-xs">
          Flow data connections
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {integrations.map((integration) => (
          <Card key={integration.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {integration.icon}
                  <CardTitle className="text-sm">{integration.name}</CardTitle>
                </div>
                {getStatusIcon(integration.status)}
              </div>
              <Badge variant="outline" className={`w-fit text-xs ${getStatusColor(integration.status)}`}>
                {integration.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-gray-600">{integration.description}</p>
              
              <div className="flex justify-between text-xs text-gray-500">
                <span>Records: {integration.records.toLocaleString()}</span>
                <span>Sync: {integration.lastSync}</span>
              </div>
              
              <Button 
                size="sm" 
                variant={integration.status === 'connected' ? 'outline' : 'default'}
                className="w-full"
              >
                {integration.status === 'connected' ? 'Configure' : 
                 integration.status === 'available' ? 'Connect' : 'Reconnect'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Cloud className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-blue-900">Recommended: Supabase Integration</h4>
            <p className="text-sm text-blue-700 mt-1">
              For secure data handling and real-time functionality, we recommend using Supabase as your primary data source. 
              It provides authentication, database, and API capabilities all in one.
            </p>
            <Button size="sm" className="mt-2 bg-blue-600 hover:bg-blue-700">
              Setup Supabase Integration
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataIntegrations;
