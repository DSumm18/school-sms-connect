
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, Pause, Play, Trash2, Edit } from "lucide-react";

const ScheduledMessages = () => {
  const [scheduledMessages] = useState([
    {
      id: 1,
      title: "Late Mark Alert - Automated",
      type: "attendance",
      scheduledTime: "9:00 AM",
      frequency: "Daily",
      recipients: 847,
      status: "active",
      lastRun: "Today 9:00 AM",
      nextRun: "Tomorrow 9:00 AM",
      template: "Dear {ParentName}, {StudentName} has been marked late for registration. Please ensure they arrive on time."
    },
    {
      id: 2,
      title: "Absence Follow-up - Automated",
      type: "attendance", 
      scheduledTime: "9:30 AM",
      frequency: "Daily",
      recipients: 847,
      status: "active",
      lastRun: "Today 9:30 AM",
      nextRun: "Tomorrow 9:30 AM",
      template: "Dear {ParentName}, {StudentName} is absent with no reason given. Please contact the school office immediately on {SchoolPhone}."
    },
    {
      id: 3,
      title: "Parent Evening Reminder",
      type: "event",
      scheduledTime: "6:00 PM",
      frequency: "One-time",
      recipients: 245,
      status: "pending",
      lastRun: "Never",
      nextRun: "Today 6:00 PM",
      template: "Reminder: Parent evening appointments are tomorrow. Please arrive 5 minutes early."
    },
    {
      id: 4,
      title: "School Trip Payment Reminder",
      type: "payment",
      scheduledTime: "3:00 PM",
      frequency: "Weekly",
      recipients: 156,
      status: "paused",
      lastRun: "Last Friday 3:00 PM",
      nextRun: "Paused",
      template: "Payment reminder: Year 7 trip to the Science Museum is due by Friday. £15 via SchoolPay."
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "paused": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "attendance": return "bg-red-100 text-red-800";
      case "event": return "bg-blue-100 text-blue-800";
      case "payment": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Scheduled Messages</h1>
          <p className="text-gray-600">Manage automated and scheduled message campaigns</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Calendar className="mr-2 h-4 w-4" />
          Schedule New Message
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Active Schedules</CardTitle>
            <Play className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">2</div>
            <p className="text-xs text-green-600 mt-1">Running automatically</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">1</div>
            <p className="text-xs text-yellow-600 mt-1">Awaiting send time</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-800">Paused</CardTitle>
            <Pause className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">1</div>
            <p className="text-xs text-gray-600 mt-1">Temporarily disabled</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Recipients</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">2,095</div>
            <p className="text-xs text-blue-600 mt-1">Across all schedules</p>
          </CardContent>
        </Card>
      </div>

      {/* Scheduled Messages List */}
      <div className="space-y-4">
        {scheduledMessages.map((message) => (
          <Card key={message.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <CardTitle className="text-lg">{message.title}</CardTitle>
                    <Badge variant="outline" className={getTypeColor(message.type)}>
                      {message.type}
                    </Badge>
                    <Badge variant="outline" className={getStatusColor(message.status)}>
                      {message.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{message.scheduledTime} • {message.frequency}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{message.recipients} recipients</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Pause className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-700">{message.template}</p>
              </div>
              
              <div className="flex flex-wrap justify-between text-xs text-gray-500 gap-2">
                <span>Last run: {message.lastRun}</span>
                <span>Next run: {message.nextRun}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ScheduledMessages;
