import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, User, MapPin, Calendar, Settings } from "lucide-react";
import { Link } from "wouter";

// Mock user data
const mockUser = {
  id: "user-1",
  username: "Rajesh",
  region: "Maharashtra",
  joinedDate: "January 2024"
};

function Profile() {
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
            <h1 className="text-xl font-bold" data-testid="text-page-title">Profile</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Profile Info */}
        <Card data-testid="card-profile-info">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-3 text-primary" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-3xl font-bold">
                {mockUser.username.charAt(0)}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  value={mockUser.username} 
                  readOnly 
                  className="bg-muted"
                  data-testid="input-username"
                />
              </div>

              <div>
                <Label htmlFor="region">Region</Label>
                <Input 
                  id="region" 
                  value={mockUser.region} 
                  readOnly 
                  className="bg-muted"
                  data-testid="input-region"
                />
              </div>

              <div>
                <Label htmlFor="joined">Member Since</Label>
                <Input 
                  id="joined" 
                  value={mockUser.joinedDate} 
                  readOnly 
                  className="bg-muted"
                  data-testid="input-joined-date"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card data-testid="card-stats">
          <CardHeader>
            <CardTitle>Your KrishiMitra Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg" data-testid="stat-total-scans">
                <div className="text-2xl font-bold text-primary">15</div>
                <div className="text-sm text-muted-foreground">Total Scans</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg" data-testid="stat-healthy-crops">
                <div className="text-2xl font-bold text-secondary">12</div>
                <div className="text-sm text-muted-foreground">Healthy Crops</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg" data-testid="stat-issues-resolved">
                <div className="text-2xl font-bold text-accent">8</div>
                <div className="text-sm text-muted-foreground">Issues Resolved</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg" data-testid="stat-chat-sessions">
                <div className="text-2xl font-bold text-primary">25</div>
                <div className="text-sm text-muted-foreground">Chat Sessions</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card data-testid="card-settings">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="mr-3 text-primary" />
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start" data-testid="button-notification-settings">
              <Settings className="mr-2 h-4 w-4" />
              Notification Settings
            </Button>
            
            <Button variant="outline" className="w-full justify-start" data-testid="button-language-settings">
              <MapPin className="mr-2 h-4 w-4" />
              Language & Region
            </Button>
            
            <Button variant="outline" className="w-full justify-start" data-testid="button-data-export">
              <Calendar className="mr-2 h-4 w-4" />
              Export Data
            </Button>
          </CardContent>
        </Card>

        {/* About */}
        <Card data-testid="card-about">
          <CardHeader>
            <CardTitle>About KrishiMitra</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              KrishiMitra is your AI-powered farming companion, helping Indian farmers diagnose crop diseases, 
              analyze soil conditions, and get expert agricultural advice tailored to your region.
            </p>
            <div className="text-sm text-muted-foreground">
              <p>Version 1.0.0</p>
              <p>© 2024 KrishiMitra. All rights reserved.</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default Profile;
