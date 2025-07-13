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
import { Upload, MapPin, Thermometer, Eye, CheckCircle, Clock, Award, LogOut, FileText, DollarSign, Database, Code2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import NodeDataPage from "@/components/NodeDataPage";
import CodeGeneratorPage from "@/components/CodeGeneratorPage";
import { Copy } from "lucide-react";
import { useEffect } from "react";

interface SubmittedData {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  temperature: string;
  humidity: string;
  soilMoisture: string;
  mediaFile: File | null;
  status: 'pending' | 'verified' | 'rejected';
  submittedAt: Date;
  reward?: number;
}

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
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
  const [submittedDataList, setSubmittedDataList] = useState<SubmittedData[]>([]);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("solflarePublicKey");
    if (stored) {
      setWalletAddress(stored);
    }
  }, []);
  const handleLogout = () => {
    // Clear any stored data and redirect to home
    setFormData({
      category: "",
      title: "",
      description: "",
      location: "",
      temperature: "",
      humidity: "",
      soilMoisture: "",
      mediaFile: null
    });
    setSubmittedDataList([]);
    setIsSubmitted(false);
    navigate("/");
  };

  const handleWithdraw = () => {
    const totalEarnings = submittedDataList.reduce((sum, data) => sum + (data.reward || 0), 0);
    if (totalEarnings > 0) {
      toast({
        title: "Withdrawal Successful!",
        description: `${totalEarnings} SERVE tokens have been withdrawn to your wallet.`,
      });
      // Reset rewards after withdrawal
      setSubmittedDataList(prev => 
        prev.map(item => ({ ...item, reward: 0 }))
      );
    } else {
      toast({
        title: "No rewards to withdraw",
        description: "You need to have verified data to earn rewards.",
        variant: "destructive"
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, mediaFile: file }));
      toast({
        title: "File uploaded successfully!",
        description: `${file.name} has been uploaded.`,
      });
    }
  };

  const handleSubmit = () => {
    const newNodeId = `serve_0x${Math.random().toString(16).substring(2, 8)}`;
    setNodeId(newNodeId);
    
    const newSubmittedData: SubmittedData = {
      id: newNodeId,
      title: formData.title || "Untitled Observation",
      category: formData.category || "Other",
      description: formData.description,
      location: formData.location,
      temperature: formData.temperature,
      humidity: formData.humidity,
      soilMoisture: formData.soilMoisture,
      mediaFile: formData.mediaFile,
      status: 'pending',
      submittedAt: new Date(),
    };

    setSubmittedDataList(prev => [...prev, newSubmittedData]);
    setIsSubmitted(true);
    setShowPreview(false);
    
    // Simulate verification after 5 seconds - status changes from pending to verified
    setTimeout(() => {
      setSubmittedDataList(prev => 
        prev.map(item => 
          item.id === newNodeId 
            ? { ...item, status: 'verified' as const, reward: Math.floor(Math.random() * 200) + 50 }
            : item
        )
      );
      toast({
        title: "Data Verified!",
        description: `Your submission ${newNodeId} has been verified and rewards are available.`,
      });
    }, 5000);
    
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
    media: formData.mediaFile ? `ipfs://Qm${formData.mediaFile.name}...` : "ipfs://Qm123...",
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <Badge className="bg-green-900/50 text-green-300 border-green-800">Verified</Badge>;
      case 'rejected':
        return <Badge className="bg-red-900/50 text-red-300 border-red-800">Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-900/50 text-yellow-300 border-yellow-800">Pending</Badge>;
    }
  };

  const getDetailedView = (data: SubmittedData) => (
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
            Complete submission details and metadata
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300">Node ID</Label>
              <p className="text-blue-400 font-mono text-sm">{data.id}</p>
            </div>
            <div>
              <Label className="text-gray-300">Status</Label>
              {getStatusBadge(data.status)}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300">Category</Label>
              <p className="text-white">{data.category}</p>
            </div>
            <div>
              <Label className="text-gray-300">Submitted</Label>
              <p className="text-white">{data.submittedAt.toLocaleString()}</p>
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
          {data.mediaFile && (
            <div>
              <Label className="text-gray-300">Attached File</Label>
              <div className="flex items-center gap-2 mt-1">
                <FileText className="h-4 w-4 text-gray-400" />
                <span className="text-white text-sm">{data.mediaFile.name}</span>
              </div>
            </div>
          )}
          {data.status === 'verified' && data.reward && (
            <div className="bg-green-900/20 border border-green-800 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-400" />
                <span className="text-green-400 font-medium">Reward Earned: {data.reward} SERVE tokens</span>
              </div>
            </div>
          )}
          {data.status === 'rejected' && (
            <div className="bg-red-900/20 border border-red-800 rounded-lg p-3">
              <span className="text-red-400">Status: Data validation failed</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">Serve Network</span>
          </div>
          <div className="flex items-center space-x-4">
            {/* <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button> */}
             <span className="truncate max-w-[150px]">{walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(walletAddress);
                toast({ title: "Wallet address copied!" });
              }}
            >
              <Copy className="w-4 h-4" />
            </button>
            <Button
              className="border"
              onClick={() => {
                localStorage.removeItem("solflarePublicKey");
                navigate("/");
              }}
              variant="ghost"
              size="sm"
            >
              Disconnect
            </Button>

          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="submit" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-gray-900 mb-8">
            <TabsTrigger value="submit" className="data-[state=active]:bg-blue-600">Submit Data</TabsTrigger>
            <TabsTrigger value="mydata" className="data-[state=active]:bg-blue-600">My Data</TabsTrigger>
            <TabsTrigger value="validated" className="data-[state=active]:bg-blue-600">Validated Data</TabsTrigger>
            <TabsTrigger value="rewards" className="data-[state=active]:bg-blue-600">Rewards</TabsTrigger>
            <TabsTrigger value="nodedata" className="data-[state=active]:bg-blue-600">Node Data</TabsTrigger>
            <TabsTrigger value="codegen" className="data-[state=active]:bg-blue-600">Code Generator</TabsTrigger>
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
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center relative">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-400 mb-2">Choose file or drag and drop</p>
                      {formData.mediaFile && (
                        <p className="text-green-400 text-sm">Uploaded: {formData.mediaFile.name}</p>
                      )}
                      <input 
                        type="file" 
                        onChange={handleFileUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        accept="image/*,video/*"
                      />
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
                    <Button 
                      variant="outline" 
                      className="border-gray-600 text-white hover:bg-gray-800"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Submit Another
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
                  {submittedDataList.length > 0 ? (
                    submittedDataList.map((data) => (
                      <div key={data.id} className="border border-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-white font-medium">{data.title}</h3>
                          {getStatusBadge(data.status)}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-3">
                          <p className="text-gray-400">Node ID: <span className="text-blue-400 font-mono">{data.id}</span></p>
                          <p className="text-gray-300">Category: {data.category}</p>
                          <p className="text-gray-400">Location: {data.location || 'Not specified'}</p>
                          <p className="text-gray-400">Submitted: {data.submittedAt.toLocaleDateString()}</p>
                        </div>
                        <p className="text-gray-300 text-sm mb-3">Description: {data.description || 'No description'}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {data.mediaFile && (
                              <div className="flex items-center gap-1 text-gray-400 text-sm">
                                <FileText className="h-4 w-4" />
                                <span>{data.mediaFile.name}</span>
                              </div>
                            )}
                            {data.status === 'verified' && data.reward && (
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4 text-green-400" />
                                <span className="text-green-400 text-sm">{data.reward} SERVE</span>
                              </div>
                            )}
                          </div>
                          {getDetailedView(data)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center text-gray-400 py-8">
                      No data submitted yet. Submit your first observation above!
                    </div>
                  )}
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
                <div className="space-y-4">
                  {submittedDataList.filter(data => data.status === 'verified').length > 0 ? (
                    submittedDataList
                      .filter(data => data.status === 'verified')
                      .map((data) => (
                        <div key={data.id} className="border border-green-800 rounded-lg p-4 bg-green-900/10">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-white font-medium">{data.title}</h3>
                            <Badge className="bg-green-900/50 text-green-300 border-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-3">
                            <p className="text-gray-400">Node ID: <span className="text-blue-400 font-mono">{data.id}</span></p>
                            <p className="text-gray-300">Category: {data.category}</p>
                            <p className="text-gray-400">Location: {data.location || 'Not specified'}</p>
                            <p className="text-gray-400">Verified: {data.submittedAt.toLocaleDateString()}</p>
                          </div>
                          <p className="text-gray-300 text-sm mb-3">Description: {data.description || 'No description'}</p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <DollarSign className="h-4 w-4 text-green-400" />
                                <span className="text-green-400 text-sm">Reward: {data.reward} SERVE</span>
                              </div>
                            </div>
                            {getDetailedView(data)}
                          </div>
                        </div>
                      ))
                  ) : (
                    <div className="text-center text-gray-400 py-8">
                      No validated data yet. Submit observations to see them here once verified.
                    </div>
                  )}
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
                    <p className="text-2xl font-bold text-green-400">
                      {submittedDataList.reduce((sum, data) => sum + (data.reward || 0), 0)} SERVE
                    </p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                    <p className="text-gray-400 text-sm">Pending Rewards</p>
                    <p className="text-2xl font-bold text-yellow-400">
                      {submittedDataList.filter(data => data.status === 'pending').length * 50} SERVE
                    </p>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4 text-center">
                    <p className="text-gray-400 text-sm">Validated Nodes</p>
                    <p className="text-2xl font-bold text-blue-400">
                      {submittedDataList.filter(data => data.status === 'verified').length}
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-center mb-6">
                  <Button
                    onClick={handleWithdraw}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-2"
                    disabled={submittedDataList.reduce((sum, data) => sum + (data.reward || 0), 0) === 0}
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    Withdraw Tokens
                  </Button>
                </div>

                {submittedDataList.length === 0 && (
                  <div className="text-center text-gray-400 py-8">
                    Submit and get your data validated to start earning SERVE tokens!
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nodedata">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Node Data Viewer
                </CardTitle>
                <CardDescription className="text-gray-400">
                  View your data as structured nodes with blockchain representation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <NodeDataPage submittedDataList={submittedDataList} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="codegen">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Code2 className="h-5 w-5" />
                  AI Training Code Generator
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Generate machine learning training code from your verified data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CodeGeneratorPage submittedDataList={submittedDataList} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
