import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Sprout, Camera, MessageCircle, Mic, Settings, History, Upload, Images, Calendar, FlaskConical, Droplets, Bug, CalendarIcon, MapPin, CloudRain, TrendingUp, AlertTriangle, ChevronRight, Phone, ExternalLink, ShieldCheck, Sun, Cloud, CloudSun, CloudDrizzle, CloudSnow, CloudLightning, Wind, Thermometer, Droplets as DropIcon, Eye } from "lucide-react";
import type { AnalysisResult } from "@shared/schema";
import { useUserProfile } from "@/hooks/use-user-profile";

interface WeatherData {
  region: string;
  current: {
    temperature: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    description: string;
    icon: string;
    isRaining: boolean;
  };
  forecast: Array<{
    date: string;
    day: string;
    maxTemp: number;
    minTemp: number;
    precipitation: number;
    description: string;
    icon: string;
  }>;
  farmingAlert: string | null;
}

function WeatherIcon({ icon, className }: { icon: string; className?: string }) {
  const cls = className || "h-5 w-5";
  switch (icon) {
    case "sunny": return <Sun className={cls} />;
    case "partly_cloudy": return <CloudSun className={cls} />;
    case "cloudy": return <Cloud className={cls} />;
    case "foggy": return <Eye className={cls} />;
    case "drizzle": return <CloudDrizzle className={cls} />;
    case "rainy": return <CloudRain className={cls} />;
    case "snowy": return <CloudSnow className={cls} />;
    case "stormy": return <CloudLightning className={cls} />;
    default: return <Cloud className={cls} />;
  }
}

function Home() {
  const { profile } = useUserProfile();

  const { data: recentResults, isLoading } = useQuery<AnalysisResult[]>({
    queryKey: ["/api/analysis-results", "user-1"],
    enabled: true,
  });

  const weatherRegion = profile?.region || "";
  const { data: weather, isLoading: weatherLoading } = useQuery<WeatherData>({
    queryKey: [`/api/weather?region=${encodeURIComponent(weatherRegion)}`],
    enabled: !!weatherRegion,
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

        {/* Live Weather */}
        <Card className="mb-8" data-testid="card-weather">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <CloudRain className="text-accent h-5 w-5" />
              Live Weather — {profile?.region || "Your Region"}
            </h3>

            {weatherLoading ? (
              <div className="text-center text-muted-foreground py-8">Fetching live weather...</div>
            ) : !weather ? (
              <div className="text-center text-muted-foreground py-6">Weather data unavailable. Check your connection.</div>
            ) : (
              <div className="space-y-4">
                {/* Farming alert banner */}
                {weather.farmingAlert && (
                  <div className="flex items-start gap-3 bg-accent/10 border border-accent/25 rounded-md p-3">
                    <AlertTriangle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground">{weather.farmingAlert}</p>
                  </div>
                )}

                {/* Current conditions */}
                <div className="bg-primary/10 border border-primary/20 rounded-md p-4">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary text-primary-foreground rounded-md p-3">
                        <WeatherIcon icon={weather.current.icon} className="h-7 w-7" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold">{weather.current.temperature}°C</p>
                        <p className="text-sm text-muted-foreground">{weather.current.description}</p>
                        <p className="text-xs text-muted-foreground">{weather.region}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Thermometer className="h-3.5 w-3.5" />
                        <span>Feels {weather.current.feelsLike}°C</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <DropIcon className="h-3.5 w-3.5" />
                        <span>Humidity {weather.current.humidity}%</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Wind className="h-3.5 w-3.5" />
                        <span>Wind {weather.current.windSpeed} km/h</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <CloudRain className="h-3.5 w-3.5" />
                        <span>Rain {weather.current.precipitation} mm</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5-day forecast */}
                <div className="grid grid-cols-5 gap-2">
                  {weather.forecast.map((day) => (
                    <div key={day.date} className="flex flex-col items-center bg-muted rounded-md p-2 text-center">
                      <p className="text-xs font-medium text-muted-foreground">{day.day}</p>
                      <WeatherIcon icon={day.icon} className="h-4 w-4 my-1 text-primary" />
                      <p className="text-xs font-semibold">{day.maxTemp}°</p>
                      <p className="text-xs text-muted-foreground">{day.minTemp}°</p>
                      {day.precipitation > 0 && (
                        <p className="text-xs text-blue-500 mt-0.5">{day.precipitation}mm</p>
                      )}
                    </div>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground text-right">Source: Open-Meteo · Updated live</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Government Support */}
        <Card className="mb-8 border-primary/30" data-testid="card-govt-support">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ShieldCheck className="text-primary h-5 w-5" />
              Government Support
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Kisan Suvidha Portal */}
              <a
                href="https://kisansuvidha.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="bg-primary/10 border border-primary/20 rounded-md p-4 hover-elevate cursor-pointer h-full">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-md p-2 flex-shrink-0">
                      <ExternalLink className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm">Kisan Suvidha Portal</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Official government portal for weather, market prices, plant protection, agri-inputs and more.
                      </p>
                      <p className="text-xs text-primary font-medium mt-2 flex items-center gap-1">
                        kisansuvidha.gov.in
                        <ExternalLink className="h-3 w-3" />
                      </p>
                    </div>
                  </div>
                </div>
              </a>

              {/* Helpline */}
              <a href="tel:18001801551" className="block">
                <div className="bg-secondary/10 border border-secondary/20 rounded-md p-4 hover-elevate cursor-pointer h-full">
                  <div className="flex items-start gap-3">
                    <div className="bg-secondary text-secondary-foreground rounded-md p-2 flex-shrink-0">
                      <Phone className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm">Kisan Helpline</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Free helpline for farmers — crop advice, soil testing, subsidies and government schemes.
                      </p>
                      <p className="text-lg font-bold text-secondary mt-2">1800-180-1551</p>
                      <p className="text-xs text-muted-foreground">Toll-free · 24×7</p>
                    </div>
                  </div>
                </div>
              </a>
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
