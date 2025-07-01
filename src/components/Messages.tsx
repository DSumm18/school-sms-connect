
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Send, Calendar, Users, MessageSquare, Clock, CheckCircle, XCircle, Eye } from "lucide-react";

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

  const recentMessages = [
    {
      id: 1,
      content: "Uniform Policy Update - Please ensure all pupils wear...",
      sent: "2 hours ago",
      recipients: 425,
      delivered: 423,
      failed: 2,
      status: "delivered"
    },
    {
      id: 2,
      content: "Year 7 Trip Reminder - Don't forget the permission slip...",
      sent: "Yesterday",
      recipients: 156,
      delivered: 156,
      failed: 0,
      status: "delivered"
    },
    {
      id: 3,
      content: "Parent Evening appointments are now available...",
      sent: "2 days ago",
      recipients: 300,
      delivered: 298,
      failed: 2,
      status: "delivered"
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
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Send Message</h2>
        <p className="text-gray-600">Compose and send SMS messages to parents</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message Composer */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Compose Message
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Template Selection */}
              <div>
                <label className="text-sm font-medium">Use Template (Optional)</label>
                <select
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                  value={selectedTemplate}
                  onChange={(e) => handleTemplateSelect(e.target.value)}
                >
                  <option value="">Select a template...</option>
                  {templates.map(template => (
                    <option key={template.id} value={template.id}>{template.name}</option>
                  ))}
                </select>
              </div>

              {/* Message Content */}
              <div>
                <label className="text-sm font-medium">Message Content</label>
                <Textarea
                  className="mt-1"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message here..."
                  rows={6}
                />
                <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                  <span>Use placeholders: {"{ParentName}"}, {"{PupilName}"}, {"{Date}"}, {"{Time}"}</span>
                  <span>{message.length}/160 characters</span>
                </div>
              </div>

              {/* Recipients */}
              <div>
                <label className="text-sm font-medium">Recipients</label>
                <select
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Schedule Date (Optional)</label>
                  <input
                    type="date"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Schedule Time</label>
                  <input
                    type="time"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                  />
                </div>
              </div>

              {/* Preview & Send */}
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Message Preview:</span>
                  <span className="text-sm text-gray-600">
                    {getRecipientCount()} recipients • £{estimatedCost} estimated cost
                  </span>
                </div>
                <div className="bg-white p-3 rounded border text-sm">
                  {message || "Your message will appear here..."}
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  {scheduleDate ? (
                    <>
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Message
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
                      <div className="bg-gray-50 p-4 rounded">
                        <p><strong>To:</strong> {recipientOptions.find(opt => opt.value === recipients)?.label}</p>
                        <p><strong>Recipients:</strong> {getRecipientCount()}</p>
                        <p><strong>Cost:</strong> £{estimatedCost}</p>
                        {scheduleDate && <p><strong>Scheduled:</strong> {scheduleDate} at {scheduleTime}</p>}
                      </div>
                      <div className="border p-3 rounded">
                        {message}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Messages */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Recent Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentMessages.map((msg) => (
                  <div key={msg.id} className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium line-clamp-2">{msg.content}</p>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                      <span>{msg.sent}</span>
                      <div className="flex items-center space-x-2">
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
    </div>
  );
};

export default Messages;
