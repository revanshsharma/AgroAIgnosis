import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import ImageUpload from "@/components/image-upload";
import { useLanguage } from "@/hooks/use-language";

function Analysis() {
  const { t } = useLanguage();

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
            <h1 className="text-xl font-bold" data-testid="text-page-title">{t.analysis.crop_analysis}</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Card data-testid="card-analysis-main">
          <CardHeader>
            <CardTitle className="text-center">{t.analysis.upload_image}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center mb-6">
              {t.analysis.upload_hint}
            </p>
            <ImageUpload />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default Analysis;
