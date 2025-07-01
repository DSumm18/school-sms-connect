
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, Users, MessageSquare, Calendar, Settings, LogOut, Phone, Send, Archive, Bell } from "lucide-react";

const Index = () => {
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const stats = {
    activeContacts: 847,
    sentThisMonth: 1250,
    remainingCredits: 3750,
    scheduledMessages: 3
  };

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

  const handleEmergencyBroadcast = () => {
    setShowEmergencyDialog(false);
    // This would integrate with your SMS service
    console.log("Emergency broadcast sent!");
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Active Contacts</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{stats.activeContacts.toLocaleString()}</div>
            <p className="text-xs text-blue-600 mt-1">+12 this week</p>
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
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-1">Emergency Broadcast</h3>
              <p className="text-sm text-red-700">Send urgent messages to all active contacts immediately</p>
            </div>
            <Dialog open={showEmergencyDialog} onOpenChange={setShowEmergencyDialog}>
              <DialogTrigger asChild>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Emergency Send
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-red-600">Confirm Emergency Broadcast</DialogTitle>
                  <DialogDescription>
                    You are about to send an emergency message to all {stats.activeContacts} active contacts. 
                    This action cannot be undone. Are you sure you want to proceed?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setShowEmergencyDialog(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-red-600 hover:bg-red-700" onClick={handleEmergencyBroadcast}>
                    Send Emergency Message
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
            <div className="space-y-4">
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
            <div className="space-y-4">
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
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900">SchoolConnect SMS</h1>
              </div>
              <div className="hidden md:block ml-8">
                <div className="flex items-baseline space-x-4">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Arbor Connected
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Twilio Active
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: "dashboard", label: "Dashboard", icon: "📊" },
              { id: "contacts", label: "Contacts", icon: "👥" },
              { id: "messages", label: "Messages", icon: "💬" },
              { id: "templates", label: "Templates", icon: "📝" },
              { id: "logs", label: "Logs", icon: "📋" },
              { id: "settings", label: "Settings", icon: "⚙️" }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab !== "dashboard" && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
            </h2>
            <p className="text-gray-600">This section is ready for development based on your requirements.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
