import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import ImageUpload from "@/components/image-upload";

function Analysis() {
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
            <h1 className="text-xl font-bold" data-testid="text-page-title">Image Analysis</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Card data-testid="card-analysis-main">
          <CardHeader>
            <CardTitle className="text-center">Analyze Your Crops or Soil</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center mb-6">
              Upload a photo of your crops or soil sample to get instant AI-powered analysis and recommendations.
            </p>
            <ImageUpload />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default Analysis;
