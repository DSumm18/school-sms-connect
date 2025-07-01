
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Send, Calendar, Users, MessageSquare, Clock, CheckCircle, XCircle, Eye, Filter, Download } from "lucide-react";

const Messages = () => {
  const [message, setMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [recipients, setRecipients] = useState("all-consented");
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");

  const templates = [
    { id: 1, name: "Parent Evening Reminder", content: "Dear {ParentName}, this is a reminder that {PupilName}'s parent evening is scheduled for {Date} at {Time}." },
    { id: 2, name: "Absence Notice", content: "Dear {ParentName}, {PupilName} was marked absent today. Please contact the school office if this is an error." },
    { id: 3, name: "Homework Reminder", content: "Dear {ParentName}, {PupilName} has homework due tomorrow in {Subject}. Please ensure it's completed." }
  ];

  const recipientOptions = [
    { value: "all-consented", label: "All Consented Parents", count: 847 },
    { value: "year7", label: "Year 7 Parents", count: 156 },
    { value: "year8", label: "Year 8 Parents", count: 142 },
    { value: "year9", label: "Year 9 Parents", count: 138 },
    { value: "custom", label: "Custom Selection", count: 0 }
  ];

  const messageHistory = [
    {
      id: 1,
      content: "Uniform Policy Update - Please ensure all pupils wear the correct uniform as outlined in our policy.",
      sent: "2024-01-15 14:30",
      recipients: 425,
      delivered: 423,
      failed: 2,
      status: "delivered",
      type: "scheduled"
    },
    {
      id: 2,
      content: "Year 7 Trip Reminder - Don't forget the permission slip for tomorrow's educational visit.",
      sent: "2024-01-14 09:15",
      recipients: 156,
      delivered: 156,
      failed: 0,
      status: "delivered",
      type: "immediate"
    },
    {
      id: 3,
      content: "Parent Evening appointments are now available to book online through our portal.",
      sent: "2024-01-13 16:45",
      recipients: 300,
      delivered: 298,
      failed: 2,
      status: "delivered",
      type: "scheduled"
    }
  ];

  const handleTemplateSelect = (templateId) => {
    const template = templates.find(t => t.id === parseInt(templateId));
    if (template) {
      setMessage(template.content);
      setSelectedTemplate(templateId);
    }
  };

  const getRecipientCount = () => {
    const option = recipientOptions.find(opt => opt.value === recipients);
    return option ? option.count : 0;
  };

  const estimatedCost = (getRecipientCount() * 0.023).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SMS Messaging</h1>
          <p className="text-gray-600">Send messages to parents and guardians</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Message Composer */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Compose Message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Template Selection */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Template</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedTemplate}
                onChange={(e) => handleTemplateSelect(e.target.value)}
              >
                <option value="">Choose a template...</option>
                {templates.map(template => (
                  <option key={template.id} value={template.id}>{template.name}</option>
                ))}
              </select>
            </div>

            {/* Message Content */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Message</label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                rows={4}
                className="resize-none"
              />
              <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                <span>Variables: {"{ParentName}"}, {"{PupilName}"}, {"{Date}"}, {"{Time}"}</span>
                <span className={message.length > 160 ? "text-red-500" : ""}>{message.length}/160</span>
              </div>
            </div>

            {/* Recipients */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">Recipients</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
              >
                {recipientOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label} ({option.count})
                  </option>
                ))}
              </select>
            </div>

            {/* Scheduling */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Time</label>
                <input
                  type="time"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                />
              </div>
            </div>

            {/* Cost Preview */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-blue-700">Estimated cost:</span>
                <span className="font-medium text-blue-900">£{estimatedCost}</span>
              </div>
              <div className="text-xs text-blue-600 mt-1">
                {getRecipientCount()} recipients × £0.023 per SMS
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                {scheduleDate ? (
                  <>
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Now
                  </>
                )}
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Message Preview</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
                      <div><strong>To:</strong> {recipientOptions.find(opt => opt.value === recipients)?.label}</div>
                      <div><strong>Recipients:</strong> {getRecipientCount()}</div>
                      <div><strong>Cost:</strong> £{estimatedCost}</div>
                      {scheduleDate && <div><strong>Scheduled:</strong> {scheduleDate} at {scheduleTime}</div>}
                    </div>
                    <div className="border rounded-lg p-3 bg-white">
                      <div className="text-sm text-gray-500 mb-2">Message content:</div>
                      <div className="text-sm">{message || "No message content"}</div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Message History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Message History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {messageHistory.map((msg) => (
                <div key={msg.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2 flex-1 mr-2">
                      {msg.content}
                    </p>
                    <Badge variant={msg.type === "immediate" ? "default" : "secondary"} className="text-xs">
                      {msg.type}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{msg.sent}</span>
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center text-green-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {msg.delivered}
                      </span>
                      {msg.failed > 0 && (
                        <span className="flex items-center text-red-600">
                          <XCircle className="w-3 h-3 mr-1" />
                          {msg.failed}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Messages;
