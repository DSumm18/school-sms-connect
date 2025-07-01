import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle, Settings, LogOut, Bell, Search, MessageSquare, Calendar, FileText } from "lucide-react";
import Messages from "@/components/Messages";
import Templates from "@/components/Templates";
import ScheduledMessages from "@/components/ScheduledMessages";
import AttendanceDashboard from "@/components/AttendanceDashboard";

const Index = () => {
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("attendance");

  const handleEmergencyBroadcast = () => {
    setShowEmergencyDialog(false);
    console.log("Emergency broadcast sent!");
  };

  const tabs = [{
    id: "attendance",
    label: "Attendance Dashboard",
    icon: AlertTriangle
  }, {
    id: "messages",
    label: "Messages",
    icon: MessageSquare
  }, {
    id: "templates",
    label: "Templates",
    icon: FileText
  }, {
    id: "scheduled",
    label: "Scheduled",
    icon: Calendar
  }];

  const renderActiveTab = () => {
    switch (activeTab) {
      case "attendance":
        return <AttendanceDashboard />;
      case "messages":
        return <Messages />;
      case "templates":
        return <Templates />;
      case "scheduled":
        return <ScheduledMessages />;
      default:
        return <AttendanceDashboard />;
    }
  };

  return <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <MessageSquare className="h-12 w-12 text-orange-500" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-4">Schoolgle SMS</h1>
                <p className="text-xl mb-2">1p per message • No surprises</p>
                <p className="text-lg mb-8 max-w-3xl">
                  Arbor may be free — but what good is free if parents don't read the messages? 
                  SchoolGle SMS guarantees your critical messages land in parents' pockets, every time.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8 mt-8">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl font-bold">9:00am</div>
              <div className="text-sm">Late mark alerts sent automatically</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl font-bold">9:30am</div>
              <div className="text-sm">Absence follow-up if no response</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl font-bold">10:00am</div>
              <div className="text-sm">Safeguarding reports generated</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl font-bold">100%</div>
              <div className="text-sm">Message delivery guaranteed</div>
            </div>
          </div>
          <div className="text-center">
            <Button className="bg-white text-orange-500 hover:bg-gray-100 text-lg px-8 py-3">
              GET STARTED — SEND YOUR FIRST MESSAGE FOR 1p
            </Button>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <MessageSquare className="h-6 w-6 text-orange-500 mr-2" />
              <h1 className="text-xl font-bold text-orange-600">SchoolGle SMS</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent" />
              </div>
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

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map(tab => {
            const Icon = tab.icon;
            return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${activeTab === tab.id ? "border-orange-500 text-orange-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}>
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>;
          })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {renderActiveTab()}
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
              You are about to send an emergency message to all active contacts. 
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
    </div>;
};

export default Index;
