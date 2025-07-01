import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, FileText, Edit, Trash2, Copy, Send, Workflow } from "lucide-react";
import FlowBuilder from "./FlowBuilder";

const Templates = () => {
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: "Parent Evening Reminder",
      category: "General",
      content: "Dear {ParentName}, this is a reminder that {PupilName}'s parent evening is scheduled for {Date} at {Time}. Please confirm attendance.",
      lastUsed: "2 days ago",
      timesUsed: 45,
      type: "simple"
    },
    {
      id: 2,
      name: "Absence Notice",
      category: "Attendance",
      content: "Dear {ParentName}, {PupilName} was marked absent today. Please contact the school office if this is an error.",
      lastUsed: "1 week ago",
      timesUsed: 127,
      type: "simple"
    },
    {
      id: 3,
      name: "Emergency Closure",
      category: "Emergency",
      content: "URGENT: Due to unforeseen circumstances, the school will be closed today. All after-school activities are cancelled.",
      lastUsed: "Never",
      timesUsed: 0,
      type: "simple"
    },
    {
      id: 4,
      name: "Late Student Auto-Flow",
      category: "Attendance",
      content: "Automated flow for late students",
      lastUsed: "Never",
      timesUsed: 0,
      type: "flow",
      flowData: {
        nodes: [],
        edges: []
      }
    }
  ]);

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newTemplate, setNewTemplate] = useState({ 
    name: "", 
    category: "General", 
    content: "", 
    type: "simple",
    flowData: { nodes: [], edges: [] }
  });
  const [templateType, setTemplateType] = useState("simple");

  const categories = ["General", "Attendance", "Emergency", "Events", "Academic"];

  const handleCreateTemplate = () => {
    if (newTemplate.name && (newTemplate.content || newTemplate.type === "flow")) {
      setTemplates([...templates, {
        id: Date.now(),
        ...newTemplate,
        lastUsed: "Never",
        timesUsed: 0
      }]);
      setNewTemplate({ 
        name: "", 
        category: "General", 
        content: "", 
        type: "simple",
        flowData: { nodes: [], edges: [] }
      });
      setShowCreateDialog(false);
    }
  };

  const handleFlowChange = (nodes: any[], edges: any[]) => {
    setNewTemplate({
      ...newTemplate,
      flowData: { nodes, edges }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Message Templates</h2>
          <p className="text-gray-600">Create and manage reusable message templates and automation flows</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="mr-2 h-4 w-4" />
              New Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
              <DialogDescription>
                Create a simple message template or build an automation flow
              </DialogDescription>
            </DialogHeader>
            
            <Tabs value={templateType} onValueChange={(value) => {
              setTemplateType(value);
              setNewTemplate({ ...newTemplate, type: value });
            }}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="simple">Simple Message</TabsTrigger>
                <TabsTrigger value="flow">Automation Flow</TabsTrigger>
              </TabsList>
              
              <TabsContent value="simple" className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Template Name</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                    placeholder="e.g., Parent Evening Reminder"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <select
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                    value={newTemplate.category}
                    onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Message Content</label>
                  <Textarea
                    className="mt-1"
                    value={newTemplate.content}
                    onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                    placeholder="Dear {ParentName}, your message here..."
                    rows={4}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="flow" className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Flow Name</label>
                  <input
                    type="text"
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                    placeholder="e.g., Late Student Auto-Response"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <select
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
                    value={newTemplate.category}
                    onChange={(e) => setNewTemplate({...newTemplate, category: e.target.value})}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Design Your Flow</label>
                  <p className="text-xs text-gray-500 mb-2">
                    Add nodes and connect them to create your automation flow. Start with the trigger and add SMS, email, and delay nodes.
                  </p>
                  <FlowBuilder onFlowChange={handleFlowChange} />
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTemplate}>
                Create Template
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {template.category}
                    </span>
                    {template.type === "flow" && (
                      <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full flex items-center">
                        <Workflow className="h-3 w-3 mr-1" />
                        Flow
                      </span>
                    )}
                  </div>
                </div>
                {template.type === "flow" ? (
                  <Workflow className="h-5 w-5 text-purple-400" />
                ) : (
                  <FileText className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-700 line-clamp-3">
                  {template.type === "flow" ? "Automated flow with multiple steps" : template.content}
                </p>
              </div>
              
              <div className="flex justify-between text-xs text-gray-500">
                <span>Used {template.timesUsed} times</span>
                <span>Last used: {template.lastUsed}</span>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Send className="mr-1 h-3 w-3" />
                  Use
                </Button>
                <Button size="sm" variant="outline">
                  <Edit className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline">
                  <Copy className="h-3 w-3" />
                </Button>
                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Templates;
