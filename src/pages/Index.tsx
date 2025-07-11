
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
      {/* Animated Planet Orbit Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* Orbit rings */}
          <div className="absolute w-96 h-96 border border-gray-800/30 rounded-full animate-spin" style={{ animationDuration: '20s' }}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full"></div>
          </div>
          <div className="absolute w-80 h-80 border border-gray-700/20 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
          </div>
          <div className="absolute w-64 h-64 border border-gray-600/10 rounded-full animate-spin" style={{ animationDuration: '10s' }}>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-green-400 rounded-full"></div>
          </div>
        </div>
      </div>

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

      {/* Hero Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto text-center">
          <Badge className="mb-6 bg-blue-900/50 text-blue-300 border-blue-800">
            Built for Fairness
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
            Get Started <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-gray-900/50 relative z-10">
        <div className="container mx-auto">
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
      <section className="py-20 px-4 relative" 
        style={{
          backgroundImage: `url('/lovable-uploads/e0b6db89-da20-4b85-925a-ef8085720516.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="container mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
            Core Features
          </h2>
          
          <div className="relative">
            {/* Left side image */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/4 opacity-20 z-0">
              <img 
                src="/lovable-uploads/376a6358-956c-4b5b-a800-9ca3955bcd89.png" 
                alt="AI Agent" 
                className="w-64 h-64 object-contain"
              />
            </div>
            
            {/* Right side image */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/4 opacity-20 z-0">
              <img 
                src="/lovable-uploads/abef8a05-7feb-4751-9fe5-9768a68f81b4.png" 
                alt="Decentralized Network" 
                className="w-64 h-64 object-contain"
              />
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 relative z-10">
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
            Connect Wallet & Start
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
