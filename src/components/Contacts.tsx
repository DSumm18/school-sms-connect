
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCw, Download, Upload, Filter, Search, Users, Database } from "lucide-react";

const Contacts = () => {
  const [contacts, setContacts] = useState([
    { id: 1, pupil: "Emma Thompson", parent: "Sarah Thompson", mobile: "+44 7123 456789", year: "Year 7", consent: true, lastMessage: "2 days ago" },
    { id: 2, pupil: "James Wilson", parent: "Michael Wilson", mobile: "+44 7234 567890", year: "Year 8", consent: true, lastMessage: "1 week ago" },
    { id: 3, pupil: "Lily Chen", parent: "Wei Chen", mobile: "+44 7345 678901", year: "Year 7", consent: false, lastMessage: "Never" },
    { id: 4, pupil: "Oliver Davis", parent: "Emma Davis", mobile: "+44 7456 789012", year: "Year 9", consent: true, lastMessage: "3 days ago" },
    { id: 5, pupil: "Sophie Brown", parent: "David Brown", mobile: "+44 7567 890123", year: "Year 8", consent: true, lastMessage: "1 day ago" }
  ]);

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleArborSync = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Synced with Arbor");
    }, 2000);
  };

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = searchTerm === "" || 
      contact.pupil.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.parent.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === "all" ||
      (filter === "consented" && contact.consent) ||
      (filter === "no-consent" && !contact.consent) ||
      (filter === contact.year.toLowerCase().replace(" ", ""));
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: contacts.length,
    consented: contacts.filter(c => c.consent).length,
    year7: contacts.filter(c => c.year === "Year 7").length,
    year8: contacts.filter(c => c.year === "Year 8").length,
    year9: contacts.filter(c => c.year === "Year 9").length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Contacts</h2>
          <p className="text-gray-600">Manage your school contacts and sync with Arbor</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleArborSync} disabled={isLoading}>
            {isLoading ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Database className="mr-2 h-4 w-4" />
            )}
            Sync Arbor
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import CSV
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-gray-600">Total Contacts</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{stats.consented}</div>
            <p className="text-xs text-gray-600">Consented</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.year7}</div>
            <p className="text-xs text-gray-600">Year 7</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.year8}</div>
            <p className="text-xs text-gray-600">Year 8</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{stats.year9}</div>
            <p className="text-xs text-gray-600">Year 9</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search pupils or parents..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="px-3 py-2 border border-gray-300 rounded-md"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Contacts</option>
          <option value="consented">Consented Only</option>
          <option value="no-consent">No Consent</option>
          <option value="year7">Year 7</option>
          <option value="year8">Year 8</option>
          <option value="year9">Year 9</option>
        </select>
      </div>

      {/* Contacts Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Contact List ({filteredContacts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pupil</TableHead>
                  <TableHead>Parent/Guardian</TableHead>
                  <TableHead>Mobile</TableHead>
                  <TableHead>Year</TableHead>
                  <TableHead>Consent</TableHead>
                  <TableHead>Last Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">{contact.pupil}</TableCell>
                    <TableCell>{contact.parent}</TableCell>
                    <TableCell>{contact.mobile}</TableCell>
                    <TableCell>{contact.year}</TableCell>
                    <TableCell>
                      <Badge variant={contact.consent ? "default" : "secondary"}>
                        {contact.consent ? "Yes" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500">{contact.lastMessage}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Contacts;
