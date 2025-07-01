
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Users, Send, Calendar, MessageSquare, Archive, TrendingUp } from "lucide-react";

interface DashboardProps {
  stats: {
    activeContacts: number;
    sentThisMonth: number;
    remainingCredits: number;
    scheduledMessages: number;
  };
  onEmergencyClick: () => void;
}

const Dashboard = ({ stats, onEmergencyClick }: DashboardProps) => {
  const upcomingMessages = [
    { id: 1, title: "Parent Evening Reminder", scheduled: "Today 3:00 PM", recipients: 340, status: "pending" },
    { id: 2, title: "Sports Day Information", scheduled: "Tomorrow 9:00 AM", recipients: 280, status: "pending" },
    { id: 3, title: "Homework Club Notice", scheduled: "Friday 2:00 PM", recipients: 156, status: "pending" }
  ];

  const recentActivity = [
    { id: 1, message: "Uniform Policy Update", sent: "2 hours ago", recipients: 425, delivered: 423, failed: 2 },
    { id: 2, message: "Year 7 Trip Reminder", sent: "Yesterday", recipients: 156, delivered: 156, failed: 0 },
    { id: 3, message: "School Closure Notice", sent: "3 days ago", recipients: 847, delivered: 845, failed: 2 }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Active Contacts</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{stats.activeContacts.toLocaleString()}</div>
            <p className="text-xs text-blue-600 mt-1 flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12 this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Sent This Month</CardTitle>
            <Send className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{stats.sentThisMonth.toLocaleString()}</div>
            <p className="text-xs text-green-600 mt-1">18% increase</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">SMS Credits</CardTitle>
            <MessageSquare className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900">{stats.remainingCredits.toLocaleString()}</div>
            <p className="text-xs text-purple-600 mt-1">Expires in 45 days</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-800">Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900">{stats.scheduledMessages}</div>
            <p className="text-xs text-orange-600 mt-1">Next in 2 hours</p>
          </CardContent>
        </Card>
      </div>

      {/* Emergency Broadcast Button */}
      <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-1">Emergency Broadcast</h3>
              <p className="text-sm text-red-700">Send urgent messages to all active contacts immediately</p>
            </div>
            <Button 
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={onEmergencyClick}
            >
              <AlertTriangle className="mr-2 h-4 w-4" />
              Emergency Send
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Messages and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="mr-2 h-5 w-5 text-blue-600" />
              Upcoming Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingMessages.map((message) => (
                <div key={message.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{message.title}</h4>
                    <p className="text-sm text-gray-600">{message.scheduled} • {message.recipients} recipients</p>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {message.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Archive className="mr-2 h-5 w-5 text-green-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{activity.message}</h4>
                    <span className="text-xs text-gray-500">{activity.sent}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-xs">
                    <span className="text-green-600">✓ {activity.delivered} delivered</span>
                    {activity.failed > 0 && (
                      <span className="text-red-600">✗ {activity.failed} failed</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
