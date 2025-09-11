import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { AnalysisResult } from "@shared/schema";

// Mock user data
const mockUser = {
  id: "user-1",
  username: "Rajesh",
  region: "Maharashtra"
};

function History() {
  const { data: analysisHistory, isLoading } = useQuery({
    queryKey: ["/api/analysis-results", mockUser.id],
    enabled: !!mockUser.id,
  });

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Button size="icon" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20" data-testid="button-back">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold" data-testid="text-page-title">Analysis History</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Card data-testid="card-history">
          <CardHeader>
            <CardTitle>Your Analysis History</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center text-muted-foreground py-8">
                Loading analysis history...
              </div>
            ) : !analysisHistory || analysisHistory.length === 0 ? (
              <div className="text-center text-muted-foreground py-8" data-testid="text-no-history">
                <p className="mb-4">No analysis history yet.</p>
                <Link href="/analysis">
                  <Button data-testid="button-start-analyzing">
                    Start Analyzing Your Crops
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {analysisHistory.map((result: AnalysisResult) => (
                  <Card key={result.id} className="hover-elevate" data-testid={`history-item-${result.id}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <img 
                          src={result.imageUrl} 
                          alt={result.cropType || 'Analysis image'} 
                          className="w-20 h-20 rounded-lg object-cover flex-shrink-0" 
                        />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-lg">
                              {result.cropType || 'Soil Sample'}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <Badge className={getStatusColor(result.status)}>
                                {getStatusText(result.status)}
                              </Badge>
                              <Button size="icon" variant="ghost" data-testid={`button-view-${result.id}`}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div className="mb-2">
                            <span className="text-sm text-muted-foreground capitalize">
                              {result.analysisType} Analysis
                            </span>
                            {result.confidence && (
                              <span className="ml-2 text-sm text-muted-foreground">
                                • Confidence: {result.confidence}
                              </span>
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            <strong>Diagnosis:</strong> {result.diagnosis}
                          </p>
                          
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            <strong>Recommendations:</strong> {result.recommendations}
                          </p>
                          
                          <div className="mt-3 pt-3 border-t border-border">
                            <span className="text-xs text-muted-foreground">
                              {result.createdAt ? new Date(result.createdAt).toLocaleString() : 'Date unknown'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default History;
