import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle, Camera, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

interface AnalysisResultProps {
  result: {
    id: string;
    diagnosis: string;
    recommendations: string;
    status: string;
    confidence: string;
    cropType?: string;
    metadata?: any;
  };
  onNewAnalysis: () => void;
}

function AnalysisResult({ result, onNewAnalysis }: AnalysisResultProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-6 w-6 text-secondary" />;
      case 'disease_detected':
        return <XCircle className="h-6 w-6 text-destructive" />;
      case 'needs_attention':
        return <AlertTriangle className="h-6 w-6 text-accent" />;
      default:
        return <AlertTriangle className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-secondary text-secondary-foreground';
      case 'disease_detected':
        return 'bg-destructive text-destructive-foreground';
      case 'needs_attention':
        return 'bg-accent text-accent-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'Healthy';
      case 'disease_detected':
        return 'Disease Detected';
      case 'needs_attention':
        return 'Needs Attention';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" size="sm" data-testid="button-back-to-home">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <Button onClick={onNewAnalysis} variant="outline" data-testid="button-new-analysis">
          <Camera className="mr-2 h-4 w-4" />
          New Analysis
        </Button>
      </div>

      {/* Main Result Card */}
      <Card data-testid="card-analysis-result">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getStatusIcon(result.status)}
              <span>Analysis Complete</span>
            </div>
            <Badge className={getStatusColor(result.status)}>
              {getStatusText(result.status)}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Crop/Soil Type */}
          {result.cropType && (
            <div>
              <h3 className="font-semibold mb-2">Identified Crop</h3>
              <p className="text-lg text-primary font-medium">{result.cropType}</p>
            </div>
          )}

          {result.metadata?.soilType && (
            <div>
              <h3 className="font-semibold mb-2">Soil Type</h3>
              <p className="text-lg text-primary font-medium">{result.metadata.soilType}</p>
            </div>
          )}

          {/* Confidence */}
          <div>
            <h3 className="font-semibold mb-2">Analysis Confidence</h3>
            <Badge variant="outline" className="text-sm">
              {result.confidence} confidence
            </Badge>
          </div>

          {/* Diagnosis */}
          <div>
            <h3 className="font-semibold mb-2">Diagnosis</h3>
            <p className="text-muted-foreground leading-relaxed">{result.diagnosis}</p>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="font-semibold mb-2">Recommendations</h3>
            <p className="text-muted-foreground leading-relaxed">{result.recommendations}</p>
          </div>

          {/* Treatment Steps (for crops) */}
          {result.metadata?.treatmentSteps && result.metadata.treatmentSteps.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Treatment Steps</h3>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                {result.metadata.treatmentSteps.map((step: string, index: number) => (
                  <li key={index} className="leading-relaxed">{step}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Preventive Measures (for crops) */}
          {result.metadata?.preventiveMeasures && result.metadata.preventiveMeasures.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Preventive Measures</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {result.metadata.preventiveMeasures.map((measure: string, index: number) => (
                  <li key={index} className="leading-relaxed">{measure}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Soil Improvements (for soil) */}
          {result.metadata?.improvements && result.metadata.improvements.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Soil Improvements</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {result.metadata.improvements.map((improvement: string, index: number) => (
                  <li key={index} className="leading-relaxed">{improvement}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Additional Soil Info */}
          {result.metadata?.phLevel && (
            <div>
              <h3 className="font-semibold mb-2">pH Level</h3>
              <p className="text-muted-foreground">{result.metadata.phLevel}</p>
            </div>
          )}

          {result.metadata?.fertility && (
            <div>
              <h3 className="font-semibold mb-2">Fertility Assessment</h3>
              <p className="text-muted-foreground">{result.metadata.fertility}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/chat">
          <Button variant="outline" className="w-full" data-testid="button-ask-questions">
            Ask More Questions
          </Button>
        </Link>
        <Link href="/history">
          <Button variant="outline" className="w-full" data-testid="button-view-history">
            View History
          </Button>
        </Link>
        <Button onClick={onNewAnalysis} className="w-full" data-testid="button-analyze-another">
          Analyze Another Image
        </Button>
      </div>
    </div>
  );
}

export default AnalysisResult;
