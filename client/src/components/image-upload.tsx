import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Camera, X, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import AnalysisResult from "./analysis-result";

// Mock user data
const mockUser = {
  id: "user-1",
  region: "Maharashtra"
};

interface AnalysisResponse {
  id: string;
  diagnosis: string;
  recommendations: string;
  status: string;
  confidence: string;
  cropType?: string;
  metadata?: any;
}

const ANALYSIS_LANGUAGES = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "mr", label: "Marathi" },
  { value: "ta", label: "Tamil" },
  { value: "te", label: "Telugu" },
  { value: "kn", label: "Kannada" },
  { value: "bn", label: "Bengali" },
  { value: "gu", label: "Gujarati" },
  { value: "pa", label: "Punjabi" },
] as const;

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysisType, setAnalysisType] = useState<'crop' | 'soil'>('crop');
  const [analysisLanguage, setAnalysisLanguage] = useState<string>('en');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const analyzeImageMutation = useMutation({
    mutationFn: async (data: { file: File; analysisType: string; language: string }) => {
      const formData = new FormData();
      formData.append('image', data.file);
      formData.append('analysisType', data.analysisType);
      formData.append('language', data.language);
      formData.append('userId', mockUser.id);

      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to analyze image');
      }

      return await response.json();
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
      queryClient.invalidateQueries({ queryKey: ["/api/analysis-results", mockUser.id] });
      toast({
        title: "Analysis Complete",
        description: "Your image has been successfully analyzed!",
      });
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: `Failed to analyze image: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysisResult(null);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysisResult(null);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setAnalysisResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const startAnalysis = () => {
    if (selectedFile) {
      analyzeImageMutation.mutate({ file: selectedFile, analysisType, language: analysisLanguage });
    }
  };

  const openCamera = () => {
    // In a real app, this would open the device camera
    toast({
      title: "Camera Feature",
      description: "Camera functionality would be implemented here using the device's camera API.",
    });
  };

  if (analysisResult) {
    return <AnalysisResult result={analysisResult} onNewAnalysis={clearSelection} />;
  }

  return (
    <div className="space-y-6">
      {/* Analysis Type Selection */}
      <div className="flex justify-center space-x-4" data-testid="analysis-type-selection">
        <Button
          variant={analysisType === 'crop' ? 'default' : 'outline'}
          onClick={() => setAnalysisType('crop')}
          data-testid="button-crop-analysis"
        >
          Crop Analysis
        </Button>
        <Button
          variant={analysisType === 'soil' ? 'default' : 'outline'}
          onClick={() => setAnalysisType('soil')}
          data-testid="button-soil-analysis"
        >
          Soil Analysis
        </Button>
      </div>

      <div className="space-y-2 max-w-xs mx-auto" data-testid="analysis-language-selection">
        <label className="text-sm font-medium" htmlFor="analysis-language">Report Language</label>
        <select
          id="analysis-language"
          value={analysisLanguage}
          onChange={(event) => setAnalysisLanguage(event.target.value)}
          className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
          data-testid="select-analysis-language"
        >
          {ANALYSIS_LANGUAGES.map((language) => (
            <option key={language.value} value={language.value}>{language.label}</option>
          ))}
        </select>
      </div>

      {/* Upload Area */}
      <Card>
        <CardContent className="p-6">
          {!selectedFile ? (
            <div
              className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
              data-testid="upload-area"
            >
              <Upload className="text-4xl text-muted-foreground mb-3 mx-auto" />
              <p className="font-medium mb-1">
                Upload {analysisType === 'crop' ? 'Crop' : 'Soil'} Image
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Drag & drop or click to select
              </p>
              <Badge variant="secondary" className="mb-4">
                {analysisType === 'crop' ? 'Crop Disease Detection' : 'Soil Quality Analysis'}
              </Badge>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Image Preview */}
              <div className="relative" data-testid="image-preview">
                <img
                  src={previewUrl!}
                  alt="Selected image"
                  className="w-full max-w-md mx-auto rounded-lg shadow-md"
                />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2"
                  onClick={clearSelection}
                  data-testid="button-clear-image"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* File Info */}
              <div className="text-center text-sm text-muted-foreground">
                <p>{selectedFile.name}</p>
                <p>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>

              {/* Analysis Button */}
              <div className="flex justify-center">
                <Button
                  onClick={startAnalysis}
                  disabled={analyzeImageMutation.isPending}
                  size="lg"
                  data-testid="button-analyze"
                >
                  {analyzeImageMutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Analyze {analysisType === 'crop' ? 'Crop' : 'Soil'}
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            data-testid="file-input"
          />
        </CardContent>
      </Card>

      {/* Camera and Gallery Options */}
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="secondary"
          onClick={openCamera}
          className="w-full"
          data-testid="button-open-camera"
        >
          <Camera className="mr-2 h-4 w-4" />
          Open Camera
        </Button>
        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="w-full"
          data-testid="button-select-from-gallery"
        >
          <Upload className="mr-2 h-4 w-4" />
          Select from Gallery
        </Button>
      </div>
    </div>
  );
}

export default ImageUpload;
