
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle, Users, MessageSquare, Calendar, Settings, LogOut, Phone, Send, Archive, Bell, CreditCard, FileText, Upload, Database } from "lucide-react";
import Dashboard from "@/components/Dashboard";
import Templates from "@/components/Templates";
import Contacts from "@/components/Contacts";
import Credits from "@/components/Credits";
import Messages from "@/components/Messages";

const Index = () => {
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const stats = {
    activeContacts: 847,
    sentThisMonth: 1250,
    remainingCredits: 3750,
    scheduledMessages: 3
  };

  const handleEmergencyBroadcast = () => {
    setShowEmergencyDialog(false);
    console.log("Emergency broadcast sent!");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard stats={stats} onEmergencyClick={() => setShowEmergencyDialog(true)} />;
      case "templates":
        return <Templates />;
      case "contacts":
        return <Contacts />;
      case "messages":
        return <Messages />;
      case "credits":
        return <Credits />;
      default:
        return <Dashboard stats={stats} onEmergencyClick={() => setShowEmergencyDialog(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-blue-600">SchoolGle SMS</h1>
              </div>
              <div className="hidden md:block ml-8">
                <div className="flex items-baseline space-x-4">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <Database className="w-3 h-3 mr-1" />
                    Arbor Connected
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <Send className="w-3 h-3 mr-1" />
                    SMS Ready
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
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: "dashboard", label: "Dashboard", icon: "📊" },
              { id: "templates", label: "Templates", icon: "📝" },
              { id: "contacts", label: "Contacts", icon: "👥" },
              { id: "messages", label: "Messages", icon: "💬" },
              { id: "credits", label: "Credits", icon: "💳" }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
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
        {renderContent()}
      </main>

      {/* Emergency Dialog */}
      <Dialog open={showEmergencyDialog} onOpenChange={setShowEmergencyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Confirm Emergency Broadcast
            </DialogTitle>
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
  );
};

export default Index;
