
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, Code, Database, MapPin, Thermometer, Calendar, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NodeData {
  id: string;
  title: string;
  category: string;
  location: string;
  temperature: string;
  humidity: string;
  soilMoisture: string;
  status: 'pending' | 'verified' | 'rejected';
  submittedAt: Date;
  code: string;
}

interface NodeDataPageProps {
  submittedDataList: any[];
}

const NodeDataPage = ({ submittedDataList }: NodeDataPageProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const generateNodeCode = (data: any) => {
    return `{
  "nodeId": "${data.id}",
  "metadata": {
    "title": "${data.title}",
    "category": "${data.category}",
    "location": "${data.location || 'Not specified'}",
    "timestamp": "${data.submittedAt.toISOString()}"
  },
  "sensorData": {
    "temperature": ${data.temperature || 'null'},
    "humidity": ${data.humidity || 'null'},
    "soilMoisture": ${data.soilMoisture || 'null'}
  },
  "validation": {
    "status": "${data.status}",
    "score": ${data.status === 'verified' ? 95 : 0}
  },
  "blockchain": {
    "txHash": "0x${Math.random().toString(16).substring(2, 10)}...",
    "blockHeight": ${Math.floor(Math.random() * 1000000) + 5000000}
  }
}`;
  };

  const filteredData = submittedDataList.filter(data => {
    const matchesSearch = data.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         data.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "" || data.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied!",
      description: "Node code has been copied to clipboard.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-900/50 text-green-300 border-green-800';
      case 'rejected':
        return 'bg-red-900/50 text-red-300 border-red-800';
      default:
        return 'bg-yellow-900/50 text-yellow-300 border-yellow-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Label htmlFor="search" className="text-white">Search Nodes</Label>
          <Input
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or category..."
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="category" className="text-white">Filter by Category</Label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-md px-3 py-2"
          >
            <option value="">All Categories</option>
            <option value="environment">Environment</option>
            <option value="infrastructure">Infrastructure</option>
            <option value="agriculture">Agriculture</option>
            <option value="weather">Weather</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.length > 0 ? (
          filteredData.map((data) => (
            <Card key={data.id} className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white text-lg">{data.title}</CardTitle>
                  <Badge className={getStatusColor(data.status)}>
                    {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                  </Badge>
                </div>
                <CardDescription className="text-gray-400">
                  Node ID: {data.id}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Database className="h-4 w-4" />
                    <span>{data.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="h-4 w-4" />
                    <span>{data.submittedAt.toLocaleDateString()}</span>
                  </div>
                  {data.location && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">{data.location}</span>
                    </div>
                  )}
                  {data.temperature && (
                    <div className="flex items-center gap-2 text-gray-300">
                      <Thermometer className="h-4 w-4" />
                      <span>{data.temperature}°C</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-gray-800">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{data.title}</DialogTitle>
                        <DialogDescription className="text-gray-400">
                          Complete node information and metadata
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-gray-300">Category</Label>
                            <p className="text-white">{data.category}</p>
                          </div>
                          <div>
                            <Label className="text-gray-300">Status</Label>
                            <Badge className={getStatusColor(data.status)}>
                              {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <Label className="text-gray-300">Description</Label>
                          <p className="text-white">{data.description || 'No description provided'}</p>
                        </div>
                        <div>
                          <Label className="text-gray-300">Location</Label>
                          <p className="text-white">{data.location || 'Not specified'}</p>
                        </div>
                        {(data.temperature || data.humidity || data.soilMoisture) && (
                          <div>
                            <Label className="text-gray-300">Sensor Data</Label>
                            <div className="grid grid-cols-3 gap-2 mt-2">
                              {data.temperature && (
                                <div className="bg-gray-800 p-2 rounded">
                                  <p className="text-xs text-gray-400">Temperature</p>
                                  <p className="text-white">{data.temperature}°C</p>
                                </div>
                              )}
                              {data.humidity && (
                                <div className="bg-gray-800 p-2 rounded">
                                  <p className="text-xs text-gray-400">Humidity</p>
                                  <p className="text-white">{data.humidity}%</p>
                                </div>
                              )}
                              {data.soilMoisture && (
                                <div className="bg-gray-800 p-2 rounded">
                                  <p className="text-xs text-gray-400">Soil Moisture</p>
                                  <p className="text-white">{data.soilMoisture}%</p>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="border-gray-600 text-white hover:bg-gray-800">
                        <Code className="h-4 w-4 mr-2" />
                        View Code
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Node Code - {data.title}</DialogTitle>
                        <DialogDescription className="text-gray-400">
                          JSON representation of this data node
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="flex justify-end">
                          <Button
                            onClick={() => copyToClipboard(generateNodeCode(data))}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Code
                          </Button>
                        </div>
                        <pre className="bg-gray-800 p-4 rounded-lg text-sm overflow-auto max-h-96">
                          <code className="text-green-400">{generateNodeCode(data)}</code>
                        </pre>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-400 py-8">
            {submittedDataList.length === 0 
              ? "No data nodes available. Submit some data to see nodes here!"
              : "No nodes match your search criteria."
            }
          </div>
        )}
      </div>
    </div>
  );
};

export default NodeDataPage;
