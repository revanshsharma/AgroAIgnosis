import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, RefreshCw, TrendingUp, TrendingDown, Minus, IndianRupee, Store } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useUserProfile, INDIAN_REGIONS } from "@/hooks/use-user-profile";
import { useLanguage } from "@/hooks/use-language";

interface MandiPrice {
  crop: string;
  market: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string;
  trend: "up" | "down" | "stable";
  changePercent: number;
}

interface MandiData {
  region: string;
  date: string;
  prices: MandiPrice[];
}

const CROP_CATEGORIES = [
  "All Crops",
  "Cereals",
  "Pulses",
  "Vegetables",
  "Fruits",
  "Oilseeds",
  "Spices",
];

function TrendIcon({ trend, change }: { trend: string; change: number }) {
  if (trend === "up") return (
    <span className="flex items-center gap-0.5 text-secondary text-xs font-semibold">
      <TrendingUp className="h-3.5 w-3.5" />+{change}%
    </span>
  );
  if (trend === "down") return (
    <span className="flex items-center gap-0.5 text-destructive text-xs font-semibold">
      <TrendingDown className="h-3.5 w-3.5" />-{Math.abs(change)}%
    </span>
  );
  return (
    <span className="flex items-center gap-0.5 text-muted-foreground text-xs">
      <Minus className="h-3.5 w-3.5" />0%
    </span>
  );
}

export default function MandiPage() {
  const { profile } = useUserProfile();
  const { t } = useLanguage();
  const [selectedRegion, setSelectedRegion] = useState(profile?.region || "Maharashtra");
  const [category, setCategory] = useState("All Crops");
  const [refreshKey, setRefreshKey] = useState(0);

  const { data, isLoading, error } = useQuery<MandiData>({
    queryKey: [`/api/mandi-prices?region=${encodeURIComponent(selectedRegion)}`, refreshKey],
    enabled: !!selectedRegion,
  });

  const prices = data?.prices ?? [];
  const filtered = category === "All Crops" ? prices : prices.filter(p => {
    const cereals = ["Wheat","Rice","Maize","Jowar","Bajra","Barley"];
    const pulses = ["Gram","Tur","Moong","Urad","Lentil","Soybean"];
    const veg = ["Tomato","Onion","Potato","Brinjal","Cabbage","Cauliflower","Carrot"];
    const fruits = ["Mango","Banana","Pomegranate","Grapes","Orange","Guava"];
    const oils = ["Groundnut","Sunflower","Mustard","Cotton","Safflower"];
    const spices = ["Turmeric","Chilli","Coriander","Cumin","Garlic","Ginger"];
    if (category === "Cereals") return cereals.includes(p.crop);
    if (category === "Pulses") return pulses.includes(p.crop);
    if (category === "Vegetables") return veg.includes(p.crop);
    if (category === "Fruits") return fruits.includes(p.crop);
    if (category === "Oilseeds") return oils.includes(p.crop);
    if (category === "Spices") return spices.includes(p.crop);
    return true;
  });

  const upCount = prices.filter(p => p.trend === "up").length;
  const downCount = prices.filter(p => p.trend === "down").length;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button size="icon" variant="ghost" className="text-primary-foreground">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold flex items-center gap-2">
                  <Store className="h-5 w-5" />
                  Mandi Prices
                </h1>
                {data?.date && (
                  <p className="text-xs text-primary-foreground/70">{data.date}</p>
                )}
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="text-primary-foreground"
              onClick={() => setRefreshKey(k => k + 1)}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 max-w-2xl pb-24 space-y-4">
        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="flex-1 min-w-[140px]">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              {INDIAN_REGIONS.map(r => (
                <SelectItem key={r} value={r}>{r}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="flex-1 min-w-[130px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {CROP_CATEGORIES.map(c => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Market Summary */}
        {!isLoading && prices.length > 0 && (
          <div className="grid grid-cols-3 gap-3">
            <Card>
              <CardContent className="p-3 text-center">
                <p className="text-xl font-bold">{prices.length}</p>
                <p className="text-xs text-muted-foreground">Commodities</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <p className="text-xl font-bold text-secondary">{upCount}</p>
                <p className="text-xs text-muted-foreground">Prices Up</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-3 text-center">
                <p className="text-xl font-bold text-destructive">{downCount}</p>
                <p className="text-xs text-muted-foreground">Prices Down</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Price Cards */}
        {isLoading ? (
          <div className="space-y-3">
            {[1,2,3,4,5].map(i => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="animate-pulse space-y-2">
                    <div className="h-4 bg-muted rounded w-1/3" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                    <div className="h-6 bg-muted rounded w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground">
              <IndianRupee className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">Could not load prices</p>
              <p className="text-sm mt-1">Check your connection and try again.</p>
              <Button className="mt-4" onClick={() => setRefreshKey(k => k + 1)}>Retry</Button>
            </CardContent>
          </Card>
        ) : filtered.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center text-muted-foreground">
              <p>No prices available for this category.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filtered.map((price, i) => (
              <Card key={i} className="hover-elevate">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-semibold text-base">{price.crop}</h3>
                      <p className="text-xs text-muted-foreground">{price.market}</p>
                    </div>
                    <div className="text-right">
                      <TrendIcon trend={price.trend} change={price.changePercent} />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-muted rounded-md p-2">
                      <p className="text-xs text-muted-foreground">Min</p>
                      <p className="text-sm font-semibold">₹{price.minPrice}</p>
                    </div>
                    <div className="bg-primary/10 rounded-md p-2 border border-primary/20">
                      <p className="text-xs text-muted-foreground">Modal</p>
                      <p className="text-sm font-bold text-primary">₹{price.modalPrice}</p>
                    </div>
                    <div className="bg-muted rounded-md p-2">
                      <p className="text-xs text-muted-foreground">Max</p>
                      <p className="text-sm font-semibold">₹{price.maxPrice}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-right">per {price.unit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <p className="text-xs text-muted-foreground text-center pb-2">
          Prices are AI-estimated based on seasonal trends. Verify with your local APMC mandi.
        </p>
      </main>
    </div>
  );
}
