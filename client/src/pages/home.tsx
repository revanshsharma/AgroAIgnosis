import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Sprout, Camera, MessageCircle, Mic, Settings, History, Upload, Images, Calendar, FlaskConical, Droplets, Bug, CalendarIcon, MapPin, CloudRain, TrendingUp, AlertTriangle, ChevronRight } from "lucide-react";
import type { AnalysisResult } from "@shared/schema";
import { useUserProfile } from "@/hooks/use-user-profile";

function Home() {
  const { profile } = useUserProfile();

  const { data: recentResults, isLoading } = useQuery<AnalysisResult[]>({
    queryKey: ["/api/analysis-results", "user-1"],
    enabled: true,
  });

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sprout className="text-2xl" data-testid="icon-logo" />
              <h1 className="text-xl font-bold" data-testid="text-app-title">KrishiMitra</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                size="icon"
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/20"
                data-testid="button-voice-toggle"
              >
                <Mic className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/20"
                data-testid="button-settings"
              >
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <Card className="mb-6" data-testid="card-welcome">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h2 className="text-2xl font-bold mb-1" data-testid="text-greeting">
                  {greeting()}, {profile?.name?.split(" ")[0] || "Farmer"}!
                </h2>
                <p className="text-muted-foreground" data-testid="text-welcome-message">
                  Ready to care for your crops today?
                </p>
              </div>
              <Link href="/profile">
                <div className="text-right cursor-pointer">
                  <p className="text-xs text-primary-foreground/70">Your Region</p>
                  <p className="font-semibold flex items-center gap-1" data-testid="text-user-region">
                    <MapPin className="h-3.5 w-3.5" />
                    {profile?.region || "Set region"}
                  </p>
                  {profile?.primaryCrop && (
                    <p className="text-xs text-primary-foreground/70 mt-0.5">{profile.primaryCrop}</p>
                  )}
                </div>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center bg-muted rounded-lg p-3" data-testid="stat-scanned-today">
                <Sprout className="text-2xl text-secondary mb-1 mx-auto" />
                <p className="text-sm font-medium">{Array.isArray(recentResults) ? recentResults.length : 0}</p>
                <p className="text-xs text-muted-foreground">Total Scans</p>
              </div>
              <div className="text-center bg-muted rounded-lg p-3" data-testid="stat-issues-found">
                <AlertTriangle className="text-2xl text-accent mb-1 mx-auto" />
                <p className="text-sm font-medium">{Array.isArray(recentResults) ? recentResults.filter((r: AnalysisResult) => r.status === "disease_detected").length : 0}</p>
                <p className="text-xs text-muted-foreground">Issues Found</p>
              </div>
              <div className="text-center bg-muted rounded-lg p-3" data-testid="stat-healthy-crops">
                <Sprout className="text-2xl text-secondary mb-1 mx-auto" />
                <p className="text-sm font-medium">{Array.isArray(recentResults) ? recentResults.filter((r: AnalysisResult) => r.status === "healthy").length : 0}</p>
                <p className="text-xs text-muted-foreground">Healthy Crops</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Image Analysis Card */}
          <Card data-testid="card-image-analysis">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Camera className="text-2xl text-primary mr-3" />
                <h3 className="text-xl font-semibold">Crop Analysis</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Take a photo of your crops or soil for instant AI-powered analysis and recommendations.
              </p>

              {/* Image Upload Area */}
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center mb-4 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer">
                <Upload className="text-4xl text-muted-foreground mb-3 mx-auto" />
                <p className="font-medium mb-1">Upload Crop Image</p>
                <p className="text-sm text-muted-foreground mb-4">Drag & drop or click to select</p>
                <Link href="/analysis">
                  <Button className="text-lg" data-testid="button-choose-photo">
                    <Upload className="mr-2 h-4 w-4" />
                    Choose Photo
                  </Button>
                </Link>
              </div>

              {/* Camera Options */}
              <div className="grid grid-cols-2 gap-3">
                <Link href="/analysis">
                  <Button variant="secondary" className="w-full" data-testid="button-camera">
                    <Camera className="mr-2 h-4 w-4" />
                    Camera
                  </Button>
                </Link>
                <Link href="/analysis">
                  <Button className="w-full bg-accent hover:bg-accent/90" data-testid="button-gallery">
                    <Images className="mr-2 h-4 w-4" />
                    Gallery
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* ChatBot Card */}
          <Card data-testid="card-chatbot">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <MessageCircle className="text-2xl text-secondary mr-3" />
                <h3 className="text-xl font-semibold">Ask KrishiMitra</h3>
              </div>
              <p className="text-muted-foreground mb-6">
                Get instant answers about farming, diseases, and crop care from our AI assistant.
              </p>

              {/* Recent Chat Preview */}
              <div className="bg-muted rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-primary text-primary-foreground rounded-full p-1 w-8 h-8 flex items-center justify-center text-sm font-bold">
                    A
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">How can I treat yellow spots on my tomato leaves?</p>
                    <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                  </div>
                </div>
              </div>

              {/* Voice and Text Input Options */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <Link href="/chat?voice=true">
                  <Button className="w-full" data-testid="button-voice-chat">
                    <Mic className="mr-2 h-4 w-4" />
                    Voice Chat
                  </Button>
                </Link>
                <Link href="/chat">
                  <Button variant="secondary" className="w-full" data-testid="button-text-chat">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Text Chat
                  </Button>
                </Link>
              </div>

              <Link href="/chat">
                <Button variant="outline" className="w-full" data-testid="button-open-full-chat">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Open Full Chat
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Analysis Results */}
        <Card className="mb-8" data-testid="card-recent-results">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <History className="text-primary mr-3" />
              Recent Analysis
            </h3>

            {isLoading ? (
              <div className="text-center text-muted-foreground py-8">
                Loading recent analysis...
              </div>
            ) : !recentResults || recentResults.length === 0 ? (
              <div className="text-center text-muted-foreground py-8" data-testid="text-no-analysis">
                No analysis results yet. Upload your first crop image to get started!
              </div>
            ) : (
              <div className="space-y-4">
                {recentResults.slice(0, 3).map((result: AnalysisResult) => (
                  <div key={result.id} className="flex items-start space-x-4 p-4 bg-muted rounded-lg" data-testid={`result-${result.id}`}>
                    <img 
                      src={result.imageUrl} 
                      alt={result.cropType || 'Analysis image'} 
                      className="w-16 h-16 rounded-lg object-cover" 
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{result.cropType || 'Soil Sample'}</h4>
                        <span className="text-xs text-muted-foreground">
                          {result.createdAt ? new Date(result.createdAt).toLocaleDateString() : 'Recent'}
                        </span>
                      </div>
                      <div className="flex items-center mb-2">
                        <Badge className={getStatusColor(result.status)}>
                          {getStatusText(result.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {result.diagnosis}
                      </p>
                    </div>
                    <Button size="icon" variant="ghost" data-testid={`button-view-details-${result.id}`}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Regional Recommendations */}
        <Card className="mb-8" data-testid="card-regional-recommendations">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <MapPin className="text-accent mr-3" />
              {profile?.region || "Regional"} Tips
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-accent/10 rounded-lg p-4 border border-accent/20" data-testid="alert-weather">
                <div className="flex items-center mb-3">
                  <CloudRain className="text-accent mr-2" />
                  <h4 className="font-semibold text-accent">Weather Alert</h4>
                </div>
                <p className="text-sm text-foreground">
                  Heavy rainfall expected this week. Ensure proper drainage for your crops and delay pesticide application.
                </p>
              </div>

              <div className="bg-secondary/10 rounded-lg p-4 border border-secondary/20" data-testid="advice-seasonal">
                <div className="flex items-center mb-3">
                  <Calendar className="text-secondary mr-2" />
                  <h4 className="font-semibold text-secondary">Seasonal Advice</h4>
                </div>
                <p className="text-sm text-foreground">
                  Perfect time for cotton sowing. Prepare fields with appropriate spacing and ensure good seed quality.
                </p>
              </div>

              <div className="bg-primary/10 rounded-lg p-4 border border-primary/20" data-testid="info-market">
                <div className="flex items-center mb-3">
                  <TrendingUp className="text-primary mr-2" />
                  <h4 className="font-semibold text-primary">Market Trends</h4>
                </div>
                <p className="text-sm text-foreground">
                  Onion prices are rising. Consider increasing onion cultivation area for next season.
                </p>
              </div>

              <div className="bg-destructive/10 rounded-lg p-4 border border-destructive/20" data-testid="alert-disease">
                <div className="flex items-center mb-3">
                  <AlertTriangle className="text-destructive mr-2" />
                  <h4 className="font-semibold text-destructive">Disease Alert</h4>
                </div>
                <p className="text-sm text-foreground">
                  Increased fungal activity reported in sugarcane crops. Monitor closely and apply preventive measures.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card data-testid="card-quick-actions">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-6">Quick Actions</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="flex flex-col items-center p-4 h-auto hover-elevate"
                data-testid="button-fertilization"
              >
                <FlaskConical className="text-2xl text-primary mb-2" />
                <span className="text-sm font-medium">Fertilization</span>
              </Button>
              
              <Button
                variant="outline"
                className="flex flex-col items-center p-4 h-auto hover-elevate"
                data-testid="button-irrigation"
              >
                <Droplets className="text-2xl text-secondary mb-2" />
                <span className="text-sm font-medium">Irrigation</span>
              </Button>
              
              <Button
                variant="outline"
                className="flex flex-col items-center p-4 h-auto hover-elevate"
                data-testid="button-pest-control"
              >
                <Bug className="text-2xl text-destructive mb-2" />
                <span className="text-sm font-medium">Pest Control</span>
              </Button>
              
              <Button
                variant="outline"
                className="flex flex-col items-center p-4 h-auto hover-elevate"
                data-testid="button-calendar"
              >
                <CalendarIcon className="text-2xl text-accent mb-2" />
                <span className="text-sm font-medium">Calendar</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default Home;
