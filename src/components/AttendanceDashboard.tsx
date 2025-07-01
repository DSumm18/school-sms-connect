
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, CheckCircle, XCircle, Phone, Mail, FileText, Users } from "lucide-react";

const AttendanceDashboard = () => {
  const [currentTime] = useState(new Date().toLocaleTimeString());

  const stats = {
    totalStudents: 847,
    lateMarks: 12,
    absentees: 8,
    messagesSent: 20,
    delivered: 18,
    failed: 2,
    safeguardingAlerts: 3
  };

  const attendanceData = [
    {
      id: 1,
      studentName: "James Wilson",
      className: "7A",
      status: "late",
      timeMarked: "9:05am",
      parentContact: "+44 7911 123456",
      message1Status: "delivered",
      message1Time: "9:00am",
      message2Status: "pending",
      message2Time: "9:30am",
      needsFollowUp: false
    },
    {
      id: 2,
      studentName: "Emma Thompson",
      className: "8B",
      status: "absent",
      timeMarked: "9:00am",
      parentContact: "+44 7922 234567",
      message1Status: "delivered",
      message1Time: "9:00am",
      message2Status: "delivered",
      message2Time: "9:30am",
      needsFollowUp: true
    },
    {
      id: 3,
      studentName: "Oliver Davis",
      className: "9C",
      status: "absent",
      timeMarked: "9:10am",
      parentContact: "+44 7933 345678",
      message1Status: "failed",
      message1Time: "9:00am",
      message2Status: "not-sent",
      message2Time: "-",
      needsFollowUp: true
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-green-100 text-green-800";
      case "failed": return "bg-red-100 text-red-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Dashboard</h1>
          <p className="text-gray-600">Real-time attendance monitoring and safeguarding alerts</p>
          <p className="text-sm text-gray-500">Last updated: {currentTime}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Mail className="mr-2 h-4 w-4" />
            Email Summary
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Students</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">{stats.totalStudents}</div>
            <p className="text-xs text-blue-600 mt-1">Registered today</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-800">Late/Absent</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-900">{stats.lateMarks + stats.absentees}</div>
            <p className="text-xs text-yellow-600 mt-1">{stats.lateMarks} late, {stats.absentees} absent</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-800">Messages Sent</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900">{stats.messagesSent}</div>
            <p className="text-xs text-green-600 mt-1">{stats.delivered} delivered, {stats.failed} failed</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-800">Safeguarding Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-900">{stats.safeguardingAlerts}</div>
            <p className="text-xs text-red-600 mt-1">Require immediate attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="mr-2 h-5 w-5 text-orange-600" />
            Today's Attendance Issues
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2">Student</th>
                  <th className="text-left py-3 px-2">Class</th>
                  <th className="text-left py-3 px-2">Status</th>
                  <th className="text-left py-3 px-2">First Message</th>
                  <th className="text-left py-3 px-2">Follow-up</th>
                  <th className="text-left py-3 px-2">Action Required</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((student) => (
                  <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-2">
                      <div className="font-medium">{student.studentName}</div>
                      <div className="text-xs text-gray-500">{student.parentContact}</div>
                    </td>
                    <td className="py-3 px-2">{student.className}</td>
                    <td className="py-3 px-2">
                      <Badge variant={student.status === "late" ? "secondary" : "destructive"}>
                        {student.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center space-x-1">
                        <Badge variant="outline" className={getStatusColor(student.message1Status)}>
                          {student.message1Status}
                        </Badge>
                        <span className="text-xs text-gray-500">{student.message1Time}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center space-x-1">
                        <Badge variant="outline" className={getStatusColor(student.message2Status)}>
                          {student.message2Status}
                        </Badge>
                        <span className="text-xs text-gray-500">{student.message2Time}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      {student.needsFollowUp ? (
                        <Button size="sm" variant="outline" className="text-red-600 border-red-300">
                          <Phone className="mr-1 h-3 w-3" />
                          Call Required
                        </Button>
                      ) : (
                        <span className="text-green-600 text-sm">✓ Complete</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Automated Workflow Status */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Workflow Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">9:00am Messages</span>
              </div>
              <p className="text-sm text-green-700">Completed - 12 late mark alerts sent</p>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-5 w-5 text-yellow-600" />
                <span className="font-medium text-yellow-800">9:30am Follow-ups</span>
              </div>
              <p className="text-sm text-yellow-700">In Progress - 8 absence alerts queued</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Mail className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">10:00am Report</span>
              </div>
              <p className="text-sm text-blue-700">Scheduled - Auto-email to head teacher</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceDashboard;
