
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const navigate = useNavigate();

  const handleConnectWallet = () => {
    // Simulate wallet connection
    setIsWalletConnected(true);
    // Redirect to dashboard
    navigate("/dashboard");
  };

  const features = [
    {
      title: "Human-to-Node Engine",
      description: "Transform human observations, reports, or structured data into standardized on-chain sensor nodes — each timestamped, wallet-signed, and ready for validation or automation."
    },
    {
      title: "Autonomous Agent Interface", 
      description: "AI agents can read, rate, and learn from Serve nodes — forming evolving knowledge graphs and decision-making models based on real-world truth."
    },
    {
      title: "Decentralized AI Training",
      description: "Nodes fuel decentralized AI training, agents vote, validate, or trigger smart contract logic. Serve becomes a live knowledge stream for autonomous systems."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/50 backdrop-blur-sm sticky top-0 z-50 relative">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">Serve Network</span>
          </div>
          <Button 
            onClick={handleConnectWallet}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Connect Wallet
          </Button>
        </div>
      </header>

      {/* Hero Section with Background Animation */}
      <section className="py-20 px-4 relative">
        {/* Static Background Image */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <img 
            src="/lovable-uploads/e505d322-5e34-48b1-a722-63ca2b0e9b43.png" 
            alt="Digital Pattern" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        {/* Multiple Animated Planet Orbit Background */}
        <div className="absolute inset-0 overflow-hidden z-1">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {/* Orbit ring 1 */}
            <div className="absolute w-96 h-96 border border-gray-800/50 rounded-full animate-spin" style={{ animationDuration: '20s' }}>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
            </div>
            
            {/* Orbit ring 2 */}
            <div className="absolute w-80 h-80 border border-gray-700/40 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"></div>
            </div>
            
            {/* Orbit ring 3 */}
            <div className="absolute w-64 h-64 border border-gray-600/30 rounded-full animate-spin" style={{ animationDuration: '10s' }}>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></div>
            </div>
            
            {/* Orbit ring 4 */}
            <div className="absolute w-48 h-48 border border-gray-500/25 rounded-full animate-spin" style={{ animationDuration: '8s', animationDirection: 'reverse' }}>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-red-400 rounded-full shadow-lg shadow-red-400/50"></div>
            </div>
            
            {/* Orbit ring 5 */}
            <div className="absolute w-32 h-32 border border-gray-400/20 rounded-full animate-spin" style={{ animationDuration: '12s' }}>
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-0.5 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"></div>
            </div>
          </div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-blue-900/50 text-blue-300 border-blue-800">
            Built For Fairness
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
            Serve Network
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            The Human-Powered Data Infrastructure For Decentralized AI
          </p>
          
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
            Serve is a decentralized network where real-world human insights, reports, and device readings are transformed into on-chain sensor nodes — structured, traceable, and interoperable. These nodes fuel smart contracts, train AI models, and bridge real-world data across multiple blockchains.
          </p>
          
          <Button 
            onClick={handleConnectWallet}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
          >
            Become A Data Contributor <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* About Section with Image 2 Background */}
      <section className="py-16 px-4 bg-gray-900/50 relative">
        {/* Large Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="/lovable-uploads/ef2f4f70-8c2f-4c79-990e-24e8a11ae4d7.png" 
            alt="Grid Pattern" 
            className="w-full h-full object-cover opacity-30 z-0"
          />
          <div className="absolute inset-0 bg-black/60 z-1"></div>
        </div>
        
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
              Bridging Real-World Data With Decentralized AI
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Serve is a decentralized network where humans, sensors, and AI agents transform real world observations into verifiable on-chain knowledge nodes — powering smart contracts, decentralized science, and AI models.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
            Core Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-900/80 border-gray-800 hover:border-gray-700 transition-all duration-300 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 relative z-10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">
            Ready To Join The Network?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Start contributing real-world data and earn rewards while powering the future of decentralized AI.
          </p>
          <Button 
            onClick={handleConnectWallet}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
          >
            Become A Data Contributor
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4 relative z-10">
        <div className="container mx-auto text-center text-gray-400">
          <p>&copy; 2025 Serve Network. Built for a decentralized future.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
