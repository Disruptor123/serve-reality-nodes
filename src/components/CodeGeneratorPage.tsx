
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Copy, Code, Zap, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CodeGeneratorPageProps {
  submittedDataList: any[];
}

const CodeGeneratorPage = ({ submittedDataList }: CodeGeneratorPageProps) => {
  const { toast } = useToast();
  const [selectedData, setSelectedData] = useState<string[]>([]);
  const [codeType, setCodeType] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const verifiedData = submittedDataList.filter(data => data.status === 'verified');

  const generateTrainingCode = () => {
    if (selectedData.length === 0 || !codeType) {
      toast({
        title: "Missing Selection",
        description: "Please select data nodes and code type.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate code generation
    setTimeout(() => {
      const selectedNodes = verifiedData.filter(node => selectedData.includes(node.id));
      let code = "";

      switch (codeType) {
        case "python-tensorflow":
          code = generatePythonTensorFlowCode(selectedNodes);
          break;
        case "python-pytorch":
          code = generatePythonPyTorchCode(selectedNodes);
          break;
        case "javascript-ml":
          code = generateJavaScriptMLCode(selectedNodes);
          break;
        case "data-preprocessing":
          code = generateDataPreprocessingCode(selectedNodes);
          break;
        default:
          code = "# Please select a code type";
      }

      setGeneratedCode(code);
      setIsGenerating(false);
      
      toast({
        title: "Code Generated!",
        description: `Generated ${codeType} training code using ${selectedNodes.length} data nodes.`,
      });
    }, 2000);
  };

  const generatePythonTensorFlowCode = (nodes: any[]) => {
    return `import tensorflow as tf
import numpy as np
import pandas as pd
from datetime import datetime

# Serve Network Data Loader
class ServeDataLoader:
    def __init__(self):
        self.nodes = ${JSON.stringify(nodes.map(node => ({
          id: node.id,
          title: node.title,
          category: node.category,
          temperature: node.temperature,
          humidity: node.humidity,
          soilMoisture: node.soilMoisture,
          location: node.location
        })), null, 8)}
    
    def prepare_features(self):
        """Convert Serve network data to ML features"""
        features = []
        labels = []
        
        for node in self.nodes:
            feature_vector = [
                float(node.get('temperature', 0) or 0),
                float(node.get('humidity', 0) or 0),
                float(node.get('soilMoisture', 0) or 0),
                # Add more features based on your data
            ]
            features.append(feature_vector)
            labels.append(self.encode_category(node['category']))
        
        return np.array(features), np.array(labels)
    
    def encode_category(self, category):
        """Encode categories for training"""
        categories = {'environment': 0, 'agriculture': 1, 'weather': 2, 'infrastructure': 3, 'other': 4}
        return categories.get(category, 4)

# Initialize data loader
loader = ServeDataLoader()
X, y = loader.prepare_features()

# Build TensorFlow model
model = tf.keras.Sequential([
    tf.keras.layers.Dense(64, activation='relu', input_shape=(3,)),
    tf.keras.layers.Dropout(0.2),
    tf.keras.layers.Dense(32, activation='relu'),
    tf.keras.layers.Dense(5, activation='softmax')  # 5 categories
])

model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',
    metrics=['accuracy']
)

# Train the model
model.fit(X, y, epochs=100, validation_split=0.2, verbose=1)

print(f"Model trained on {len(nodes)} Serve network data nodes")
print("Model ready for predictions on real-world observations!")`;
  };

  const generatePythonPyTorchCode = (nodes: any[]) => {
    return `import torch
import torch.nn as nn
import torch.optim as optim
import numpy as np
from torch.utils.data import Dataset, DataLoader

# Serve Network Dataset
class ServeNetworkDataset(Dataset):
    def __init__(self):
        self.nodes = ${JSON.stringify(nodes.map(node => ({
          id: node.id,
          title: node.title,
          category: node.category,
          temperature: node.temperature,
          humidity: node.humidity,
          soilMoisture: node.soilMoisture
        })), null, 8)}
        self.features, self.labels = self.prepare_data()
    
    def __len__(self):
        return len(self.features)
    
    def __getitem__(self, idx):
        return torch.FloatTensor(self.features[idx]), torch.LongTensor([self.labels[idx]])
    
    def prepare_data(self):
        features, labels = [], []
        for node in self.nodes:
            feature_vector = [
                float(node.get('temperature', 0) or 0),
                float(node.get('humidity', 0) or 0),
                float(node.get('soilMoisture', 0) or 0)
            ]
            features.append(feature_vector)
            labels.append(self.encode_category(node['category']))
        return features, labels
    
    def encode_category(self, category):
        categories = {'environment': 0, 'agriculture': 1, 'weather': 2, 'infrastructure': 3, 'other': 4}
        return categories.get(category, 4)

# Neural Network Model
class ServeNet(nn.Module):
    def __init__(self, input_size=3, num_classes=5):
        super(ServeNet, self).__init__()
        self.fc1 = nn.Linear(input_size, 64)
        self.fc2 = nn.Linear(64, 32)
        self.fc3 = nn.Linear(32, num_classes)
        self.dropout = nn.Dropout(0.2)
        self.relu = nn.ReLU()
    
    def forward(self, x):
        x = self.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.relu(self.fc2(x))
        x = self.fc3(x)
        return x

# Initialize dataset and model
dataset = ServeNetworkDataset()
dataloader = DataLoader(dataset, batch_size=32, shuffle=True)
model = ServeNet()
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Training loop
model.train()
for epoch in range(100):
    for batch_features, batch_labels in dataloader:
        optimizer.zero_grad()
        outputs = model(batch_features)
        loss = criterion(outputs, batch_labels.squeeze())
        loss.backward()
        optimizer.step()
    
    if epoch % 20 == 0:
        print(f'Epoch [{epoch}/100], Loss: {loss.item():.4f}')

print(f"PyTorch model trained on {len(dataset)} Serve network data points")
print("Ready for inference on real-world observations!")`;
  };

  const generateJavaScriptMLCode = (nodes: any[]) => {
    return `// Serve Network ML.js Training Code
import * as tf from '@tensorflow/tfjs';

class ServeNetworkTrainer {
    constructor() {
        this.nodes = ${JSON.stringify(nodes.map(node => ({
          id: node.id,
          title: node.title,
          category: node.category,
          temperature: node.temperature,
          humidity: node.humidity,
          soilMoisture: node.soilMoisture
        })), null, 8)};
    }

    prepareData() {
        const features = [];
        const labels = [];
        
        this.nodes.forEach(node => {
            features.push([
                parseFloat(node.temperature) || 0,
                parseFloat(node.humidity) || 0,
                parseFloat(node.soilMoisture) || 0
            ]);
            labels.push(this.encodeCategory(node.category));
        });
        
        return {
            features: tf.tensor2d(features),
            labels: tf.tensor1d(labels, 'int32')
        };
    }

    encodeCategory(category) {
        const categories = {
            'environment': 0,
            'agriculture': 1,
            'weather': 2,
            'infrastructure': 3,
            'other': 4
        };
        return categories[category] || 4;
    }

    async createModel() {
        const model = tf.sequential({
            layers: [
                tf.layers.dense({
                    inputShape: [3],
                    units: 64,
                    activation: 'relu'
                }),
                tf.layers.dropout({ rate: 0.2 }),
                tf.layers.dense({
                    units: 32,
                    activation: 'relu'
                }),
                tf.layers.dense({
                    units: 5,
                    activation: 'softmax'
                })
            ]
        });

        model.compile({
            optimizer: 'adam',
            loss: 'sparseCategoricalCrossentropy',
            metrics: ['accuracy']
        });

        return model;
    }

    async train() {
        console.log('Training model with Serve Network data...');
        
        const { features, labels } = this.prepareData();
        const model = await this.createModel();
        
        await model.fit(features, labels, {
            epochs: 100,
            validationSplit: 0.2,
            callbacks: {
                onEpochEnd: (epoch, log) => {
                    if (epoch % 20 === 0) {
                        console.log(\`Epoch \${epoch}: loss = \${log.loss.toFixed(4)}\`);
                    }
                }
            }
        });

        console.log(\`Model trained on \${this.nodes.length} Serve network data nodes\`);
        return model;
    }
}

// Usage
const trainer = new ServeNetworkTrainer();
trainer.train().then(model => {
    console.log('Training complete! Model ready for predictions.');
    // Save model for later use
    model.save('localstorage://serve-network-model');
});`;
  };

  const generateDataPreprocessingCode = (nodes: any[]) => {
    return `import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.model_selection import train_test_split
import json

# Serve Network Data Preprocessing Pipeline
class ServeDataPreprocessor:
    def __init__(self):
        self.nodes = ${JSON.stringify(nodes, null, 8)}
        self.scaler = StandardScaler()
        self.label_encoder = LabelEncoder()
    
    def load_data(self):
        """Convert Serve network nodes to DataFrame"""
        data = []
        for node in self.nodes:
            data.append({
                'node_id': node['id'],
                'title': node['title'],
                'category': node['category'],
                'temperature': float(node.get('temperature', 0) or 0),
                'humidity': float(node.get('humidity', 0) or 0),
                'soil_moisture': float(node.get('soilMoisture', 0) or 0),
                'location': node.get('location', 'unknown'),
                'submission_date': node['submittedAt']
            })
        
        return pd.DataFrame(data)
    
    def clean_data(self, df):
        """Clean and validate data"""
        # Remove outliers using IQR method
        numeric_columns = ['temperature', 'humidity', 'soil_moisture']
        
        for col in numeric_columns:
            Q1 = df[col].quantile(0.25)
            Q3 = df[col].quantile(0.75)
            IQR = Q3 - Q1
            lower_bound = Q1 - 1.5 * IQR
            upper_bound = Q3 + 1.5 * IQR
            
            df[col] = df[col].clip(lower=lower_bound, upper=upper_bound)
        
        return df
    
    def feature_engineering(self, df):
        """Create additional features"""
        # Temperature categories
        df['temp_category'] = pd.cut(df['temperature'], 
                                   bins=[-np.inf, 10, 25, 35, np.inf],
                                   labels=['cold', 'mild', 'warm', 'hot'])
        
        # Humidity levels
        df['humidity_level'] = pd.cut(df['humidity'],
                                    bins=[0, 30, 60, 80, 100],
                                    labels=['dry', 'moderate', 'humid', 'very_humid'])
        
        # Soil moisture status
        df['soil_status'] = pd.cut(df['soil_moisture'],
                                 bins=[0, 25, 50, 75, 100],
                                 labels=['dry', 'low', 'medium', 'high'])
        
        return df
    
    def preprocess(self):
        """Complete preprocessing pipeline"""
        print("Loading Serve Network data...")
        df = self.load_data()
        
        print(f"Initial data shape: {df.shape}")
        print(f"Categories: {df['category'].value_counts().to_dict()}")
        
        print("Cleaning data...")
        df = self.clean_data(df)
        
        print("Engineering features...")
        df = self.feature_engineering(df)
        
        # Encode categorical variables
        categorical_cols = ['category', 'temp_category', 'humidity_level', 'soil_status']
        for col in categorical_cols:
            df[f'{col}_encoded'] = self.label_encoder.fit_transform(df[col].astype(str))
        
        # Scale numerical features
        numerical_cols = ['temperature', 'humidity', 'soil_moisture']
        df[numerical_cols] = self.scaler.fit_transform(df[numerical_cols])
        
        print("Preprocessing complete!")
        print(f"Final data shape: {df.shape}")
        
        return df
    
    def prepare_for_training(self, df, target_col='category_encoded'):
        """Prepare data for ML training"""
        feature_cols = [
            'temperature', 'humidity', 'soil_moisture',
            'temp_category_encoded', 'humidity_level_encoded', 'soil_status_encoded'
        ]
        
        X = df[feature_cols].values
        y = df[target_col].values
        
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        
        return X_train, X_test, y_train, y_test

# Usage
preprocessor = ServeDataPreprocessor()
processed_df = preprocessor.preprocess()
X_train, X_test, y_train, y_test = preprocessor.prepare_for_training(processed_df)

print(f"Training set: {X_train.shape}")
print(f"Test set: {X_test.shape}")
print("Data ready for machine learning!")

# Save processed data
processed_df.to_csv('serve_network_processed_data.csv', index=False)
print("Processed data saved to serve_network_processed_data.csv")`;
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied!",
      description: "Generated code has been copied to clipboard.",
    });
  };

  const downloadCode = (code: string, filename: string) => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Code downloaded!",
      description: `Code saved as ${filename}`,
    });
  };

  const toggleDataSelection = (nodeId: string) => {
    setSelectedData(prev => 
      prev.includes(nodeId) 
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    );
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Code className="h-5 w-5" />
            AI Training Code Generator
          </CardTitle>
          <CardDescription className="text-gray-400">
            Generate machine learning training code using your verified Serve Network data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Label className="text-white">Select Data Nodes ({selectedData.length} selected)</Label>
              <div className="max-h-48 overflow-y-auto space-y-2 border border-gray-700 rounded-lg p-3">
                {verifiedData.length > 0 ? (
                  verifiedData.map((node) => (
                    <div key={node.id} 
                         className={`p-3 rounded border cursor-pointer transition-colors ${
                           selectedData.includes(node.id) 
                             ? 'border-blue-500 bg-blue-900/20' 
                             : 'border-gray-700 bg-gray-800/50 hover:bg-gray-800'
                         }`}
                         onClick={() => toggleDataSelection(node.id)}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white font-medium">{node.title}</p>
                          <p className="text-gray-400 text-sm">{node.category} • {node.id}</p>
                        </div>
                        <Badge className="bg-green-900/50 text-green-300 border-green-800">
                          Verified
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center py-4">
                    No verified data available. Submit and verify data first.
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-white">Code Type</Label>
              <Select value={codeType} onValueChange={setCodeType}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select code type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="python-tensorflow">Python + TensorFlow</SelectItem>
                  <SelectItem value="python-pytorch">Python + PyTorch</SelectItem>
                  <SelectItem value="javascript-ml">JavaScript + ML.js</SelectItem>
                  <SelectItem value="data-preprocessing">Data Preprocessing</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                onClick={generateTrainingCode}
                disabled={isGenerating || selectedData.length === 0 || !codeType}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isGenerating ? (
                  <>
                    <Zap className="h-4 w-4 mr-2 animate-spin" />
                    Generating Code...
                  </>
                ) : (
                  <>
                    <Code className="h-4 w-4 mr-2" />
                    Generate Training Code
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {generatedCode && (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Generated Code</CardTitle>
              <div className="flex gap-2">
                <Button
                  onClick={() => copyToClipboard(generatedCode)}
                  size="sm"
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-800"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button
                  onClick={() => {
                    const extension = codeType.includes('javascript') ? 'js' : 'py';
                    downloadCode(generatedCode, `serve_network_training.${extension}`);
                  }}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            <CardDescription className="text-gray-400">
              Ready-to-use {codeType} training code using {selectedData.length} data nodes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-800 p-4 rounded-lg text-sm overflow-auto max-h-96">
              <code className="text-green-400">{generatedCode}</code>
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CodeGeneratorPage;
