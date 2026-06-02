import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, FlaskConical, Sprout, Calculator, Leaf, AlertCircle, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { useUserProfile, PRIMARY_CROPS } from "@/hooks/use-user-profile";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const SOIL_TYPES = ["Sandy", "Loamy", "Clay", "Sandy Loam", "Clay Loam", "Black Cotton Soil", "Red Soil", "Alluvial"];
const GROWTH_STAGES = ["Pre-sowing / Land Preparation", "Sowing / Transplanting", "Vegetative / Early Growth", "Flowering / Budding", "Fruiting / Pod Formation", "Maturity / Pre-harvest"];
const WATER_SOURCES = ["Rain-fed", "Canal irrigation", "Borewell / Drip irrigation", "Sprinkler", "Flood irrigation"];

interface FertilizerAdvice {
  cropName: string;
  summary: string;
  npkRecommendation: {
    nitrogen: string;
    phosphorus: string;
    potassium: string;
    timing: string;
  };
  organicOptions: string[];
  chemicalFertilizers: { name: string; dose: string; timing: string }[];
  pesticides: { name: string; dose: string; purpose: string }[];
  applicationSchedule: string[];
  cautions: string[];
}

function NPKBar({ label, value, color }: { label: string; value: string; color: string }) {
  const num = parseInt(value) || 0;
  const pct = Math.min(100, (num / 150) * 100);
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <span className="text-xs font-bold">{value}</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function FertilizerCalculator() {
  const { profile } = useUserProfile();
  const { toast } = useToast();

  const [crop, setCrop] = useState(profile?.primaryCrop || "");
  const [farmSize, setFarmSize] = useState(profile?.farmSize?.replace(/[^0-9.]/g, "") || "1");
  const [soilType, setSoilType] = useState("Loamy");
  const [growthStage, setGrowthStage] = useState(GROWTH_STAGES[0]);
  const [waterSource, setWaterSource] = useState(WATER_SOURCES[0]);
  const [result, setResult] = useState<FertilizerAdvice | null>(null);

  const mutation = useMutation({
    mutationFn: (data: object) => apiRequest("/api/fertilizer-advice", { method: "POST", body: JSON.stringify(data) }),
    onSuccess: async (res) => {
      const data = await res.json();
      setResult(data);
    },
    onError: () => {
      toast({ title: "Error", description: "Could not get fertilizer advice. Try again.", variant: "destructive" });
    },
  });

  const handleCalculate = () => {
    if (!crop) {
      toast({ title: "Select a crop", description: "Please choose which crop you're growing.", variant: "destructive" });
      return;
    }
    mutation.mutate({ crop, farmSize: parseFloat(farmSize) || 1, soilType, growthStage, waterSource, region: profile?.region || "Maharashtra" });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button size="icon" variant="ghost" className="text-primary-foreground">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2">
                <FlaskConical className="h-5 w-5" />
                Fertilizer Calculator
              </h1>
              <p className="text-xs text-primary-foreground/70">AI-powered nutrient recommendations</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 max-w-lg pb-24 space-y-4">
        {/* Input Form */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Sprout className="h-4 w-4 text-primary" />
              Crop Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Crop Type *</Label>
              <Select value={crop} onValueChange={setCrop}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select your crop" />
                </SelectTrigger>
                <SelectContent>
                  {PRIMARY_CROPS.map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Farm Size (acres)</Label>
              <Input
                type="number"
                value={farmSize}
                onChange={e => setFarmSize(e.target.value)}
                placeholder="e.g. 2"
                min="0.1"
                step="0.5"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Soil Type</Label>
              <Select value={soilType} onValueChange={setSoilType}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SOIL_TYPES.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Current Growth Stage</Label>
              <Select value={growthStage} onValueChange={setGrowthStage}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {GROWTH_STAGES.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Water Source</Label>
              <Select value={waterSource} onValueChange={setWaterSource}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {WATER_SOURCES.map(s => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full"
              onClick={handleCalculate}
              disabled={mutation.isPending || !crop}
            >
              <Calculator className="mr-2 h-4 w-4" />
              {mutation.isPending ? "Calculating..." : "Get Recommendations"}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        {mutation.isPending && (
          <Card>
            <CardContent className="py-10 text-center">
              <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">Analysing your crop and soil conditions...</p>
            </CardContent>
          </Card>
        )}

        {result && !mutation.isPending && (
          <>
            {/* Summary */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">{result.cropName} — {farmSize} acres</p>
                    <p className="text-sm text-muted-foreground mt-1">{result.summary}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* NPK Recommendation */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">NPK Recommendation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pb-4">
                <NPKBar label={`Nitrogen (N) — ${result.npkRecommendation.nitrogen}`} value={result.npkRecommendation.nitrogen.replace(/[^0-9]/g, "")} color="bg-secondary" />
                <NPKBar label={`Phosphorus (P) — ${result.npkRecommendation.phosphorus}`} value={result.npkRecommendation.phosphorus.replace(/[^0-9]/g, "")} color="bg-accent" />
                <NPKBar label={`Potassium (K) — ${result.npkRecommendation.potassium}`} value={result.npkRecommendation.potassium.replace(/[^0-9]/g, "")} color="bg-primary" />
                <p className="text-xs text-muted-foreground bg-muted/50 rounded-md p-2">{result.npkRecommendation.timing}</p>
              </CardContent>
            </Card>

            {/* Chemical Fertilizers */}
            {result.chemicalFertilizers?.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FlaskConical className="h-4 w-4 text-primary" />
                    Recommended Fertilizers
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="space-y-2">
                    {result.chemicalFertilizers.map((f, i) => (
                      <div key={i} className="flex items-start justify-between gap-2 p-3 bg-muted/40 rounded-md">
                        <div className="flex-1">
                          <p className="text-sm font-semibold">{f.name}</p>
                          <p className="text-xs text-muted-foreground">{f.timing}</p>
                        </div>
                        <Badge variant="outline" className="text-xs flex-shrink-0">{f.dose}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Organic Options */}
            {result.organicOptions?.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Leaf className="h-4 w-4 text-secondary" />
                    Organic Alternatives
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <ul className="space-y-1.5">
                    {result.organicOptions.map((opt, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Leaf className="h-3.5 w-3.5 text-secondary flex-shrink-0 mt-0.5" />
                        <span>{opt}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Pest Control */}
            {result.pesticides?.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Pest & Disease Management</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="space-y-2">
                    {result.pesticides.map((p, i) => (
                      <div key={i} className="p-3 bg-muted/40 rounded-md">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <p className="text-sm font-semibold">{p.name}</p>
                          <Badge variant="outline" className="text-xs">{p.dose}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{p.purpose}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Application Schedule */}
            {result.applicationSchedule?.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Application Schedule</CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <ol className="space-y-2">
                    {result.applicationSchedule.map((step, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm">
                        <span className="flex-shrink-0 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                        <span className="mt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            )}

            {/* Cautions */}
            {result.cautions?.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-accent" />
                    Important Cautions
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-4">
                  <ul className="space-y-1.5">
                    {result.cautions.map((c, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <AlertCircle className="h-3.5 w-3.5 text-accent flex-shrink-0 mt-0.5" />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </>
        )}

        <p className="text-xs text-muted-foreground text-center pb-2">
          Recommendations are AI-generated. Consult your local Krishi Vigyan Kendra for soil testing.
        </p>
      </main>
    </div>
  );
}
