
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Globe, Upload, MapPin, Thermometer, Droplets, Leaf, Eye, CheckCircle, Clock, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    location: "",
    temperature: "",
    humidity: "",
    soilMoisture: "",
    mediaFile: null as File | null
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [nodeId, setNodeId] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = () => {
    const newNodeId = `serve_0x${Math.random().toString(16).substring(2, 8)}`;
    setNodeId(newNodeId);
    setIsSubmitted(true);
    setShowPreview(false);
    
    toast({
      title: "Data Submitted Successfully!",
      description: `Node ID: ${newNodeId} - Awaiting validation`,
    });
  };

  const previewData = {
    nodeId: `serve_0x${Math.random().toString(16).substring(2, 8)}`,
    creator: "0xabc...123",
    title: formData.title || "Rising Water Level in Kaduna",
    category: formData.category || "Environment",
    description: formData.description || "Water overflow observed near riverbank...",
    media: "ipfs://Qm123...",
    location: { lat: "10.21", lon: "7.43" },
    sensorData: {
      temperature: formData.temperature ? parseInt(formData.temperature) : 28,
      humidity: formData.humidity ? parseInt(formData.humidity) : 93,
      waterLevel: 86
    },
    timestamp: new Date().toISOString().slice(0, -5) + "Z",
    status: "pending",
    reputation: 0
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold">Serve Network</span>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-green-900/50 text-green-300 border-green-800">
              Wallet Connected
            </Badge>
            <span className="text-sm text-gray-400">0xabc...123</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="submit" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900 mb-8">
            <TabsTrigger value="submit" className="data-[state=active]:bg-blue-600">Submit Data</TabsTrigger>
            <TabsTrigger value="mydata" className="data-[state=active]:bg-blue-600">My Data</TabsTrigger>
            <TabsTrigger value="validated" className="data-[state=active]:bg-blue-600">Validated Data</TabsTrigger>
            <TabsTrigger value="rewards" className="data-[state=active]:bg-blue-600">Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="submit">
            {!isSubmitted ? (
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Submit a Real-World Observation
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Transform your real-world observations into verifiable on-chain data nodes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-white">Category</Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="environment">Environment</SelectItem>
                          <SelectItem value="infrastructure">Infrastructure</SelectItem>
                          <SelectItem value="agriculture">Agriculture</SelectItem>
                          <SelectItem value="weather">Weather</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-white">Observation Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Brief title of your observation"
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-white">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Detailed notes of the observation"
                      className="bg-gray-800 border-gray-700 text-white min-h-24"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-white flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="Enter location manually"
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Media Upload (Optional)</Label>
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400">Choose file or drag and drop</p>
                      <input type="file" className="hidden" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-white flex items-center gap-2">
                      <Thermometer className="h-4 w-4" />
                      Sensor Data (Optional)
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="temperature" className="text-sm text-gray-300">Temperature (°C)</Label>
                        <Input
                          id="temperature"
                          type="number"
                          value={formData.temperature}
                          onChange={(e) => handleInputChange('temperature', e.target.value)}
                          placeholder="25"
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="humidity" className="text-sm text-gray-300">Humidity (%)</Label>
                        <Input
                          id="humidity"
                          type="number"
                          value={formData.humidity}
                          onChange={(e) => handleInputChange('humidity', e.target.value)}
                          placeholder="60"
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="soilMoisture" className="text-sm text-gray-300">Soil Moisture (%)</Label>
                        <Input
                          id="soilMoisture"
                          type="number"
                          value={formData.soilMoisture}
                          onChange={(e) => handleInputChange('soilMoisture', e.target.value)}
                          placeholder="45"
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Dialog open={showPreview} onOpenChange={setShowPreview}>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                          <Eye className="h-4 w-4 mr-2" />
                          Preview Data
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Data Preview</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            Preview of your data node before submission
                          </DialogDescription>
                        </DialogHeader>
                        <pre className="bg-gray-800 p-4 rounded-lg text-sm overflow-auto">
                          {JSON.stringify(previewData, null, 2)}
                        </pre>
                        <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                          Confirm & Submit to Network
                        </Button>
                      </DialogContent>
                    </Dialog>

                    <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700">
                      Submit Data Node
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Submitted — Awaiting Validation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-white">Your data has been successfully submitted!</p>
                  <div className="space-y-2">
                    <p className="text-gray-300">Node ID: <span className="text-blue-400 font-mono">{nodeId}</span></p>
                    <p className="text-gray-300 flex items-center gap-2">
                      Status: <Clock className="h-4 w-4 text-yellow-400" /> <span className="text-yellow-400">Pending Validation</span>
                    </p>
                    <p className="text-gray-300">You will be notified once it's verified by the network.</p>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                      Track Node Status
                    </Button>
                    <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                      View My Rewards
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="mydata">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">My Submitted Data</CardTitle>
                <CardDescription className="text-gray-400">
                  Track your submitted observations and their validation status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {isSubmitted && (
                    <div className="border border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-medium">{formData.title || "Recent Observation"}</h3>
                        <Badge className="bg-yellow-900/50 text-yellow-300 border-yellow-800">
                          Pending
                        </Badge>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">Node ID: {nodeId}</p>
                      <p className="text-gray-300 text-sm">Category: {formData.category || "Environment"}</p>
                    </div>
                  )}
                  <div className="text-center text-gray-400 py-8">
                    {!isSubmitted && "No data submitted yet. Submit your first observation above!"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="validated">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Validated Data</CardTitle>
                <CardDescription className="text-gray-400">
                  Your verified data nodes and their blockchain status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center text-gray-400 py-8">
                  No validated data yet. Submit observations to see them here once verified.
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rewards">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Rewards Dashboard
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Track your earnings from validated data contributions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                    <p className="text-gray-400 text-sm">Total Earned</p>
                    <p className="text-2xl font-bold text-green-400">0 SERVE</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                    <p className="text-gray-400 text-sm">Pending Rewards</p>
                    <p className="text-2xl font-bold text-yellow-400">0 SERVE</p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                    <p className="text-gray-400 text-sm">Validated Nodes</p>
                    <p className="text-2xl font-bold text-blue-400">0</p>
                  </div>
                </div>
                <div className="text-center text-gray-400 py-8">
                  Submit and get your data validated to start earning SERVE tokens!
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
