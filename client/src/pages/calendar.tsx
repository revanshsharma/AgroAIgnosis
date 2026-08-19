import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, CalendarDays, Sprout, Droplets, Wheat, Sun } from "lucide-react";
import { Link } from "wouter";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const CURRENT_MONTH = new Date().getMonth(); // 0-indexed

type Activity = "sowing" | "growing" | "harvesting" | "fertilizing" | "irrigation";

interface CropSchedule {
  season: "Kharif" | "Rabi" | "Zaid";
  sowing: number[];
  growing: number[];
  harvesting: number[];
  fertilizing: number[];
  irrigation: number[];
  tips: string;
  bestFor: string[];
}

const CROP_DATA: Record<string, CropSchedule> = {
  Wheat: {
    season: "Rabi",
    sowing: [10, 11],
    growing: [11, 0, 1, 2],
    harvesting: [2, 3],
    fertilizing: [10, 11, 1],
    irrigation: [11, 0, 1, 2],
    tips: "Sow in cool weather. Requires 4-6 irrigations. Apply DAP at sowing and urea at tillering.",
    bestFor: ["Punjab", "Haryana", "Uttar Pradesh", "Madhya Pradesh", "Rajasthan"],
  },
  Rice: {
    season: "Kharif",
    sowing: [5, 6],
    growing: [6, 7, 8, 9],
    harvesting: [10, 11],
    fertilizing: [6, 7, 8],
    irrigation: [6, 7, 8, 9, 10],
    tips: "Keep fields flooded during vegetative stage. Apply N-P-K in split doses.",
    bestFor: ["West Bengal", "Uttar Pradesh", "Andhra Pradesh", "Punjab", "Odisha"],
  },
  Maize: {
    season: "Kharif",
    sowing: [5, 6],
    growing: [6, 7, 8],
    harvesting: [9, 10],
    fertilizing: [6, 7],
    irrigation: [5, 6, 7, 8],
    tips: "Needs well-drained soil. Critical irrigation at tasseling and silking stages.",
    bestFor: ["Karnataka", "Andhra Pradesh", "Rajasthan", "Madhya Pradesh", "Bihar"],
  },
  Sugarcane: {
    season: "Rabi",
    sowing: [1, 2, 9, 10],
    growing: [3, 4, 5, 6, 7, 8, 9, 10, 11],
    harvesting: [0, 1, 2],
    fertilizing: [2, 5, 8],
    irrigation: [2, 3, 4, 5, 6, 7, 8, 9],
    tips: "Long duration crop (10-18 months). Ratoon crop gives good yield in second year.",
    bestFor: ["Uttar Pradesh", "Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat"],
  },
  Cotton: {
    season: "Kharif",
    sowing: [4, 5],
    growing: [5, 6, 7, 8, 9],
    harvesting: [10, 11, 0],
    fertilizing: [5, 6, 8],
    irrigation: [4, 5, 6, 7],
    tips: "Requires warm climate. Watch for bollworm. Avoid waterlogging.",
    bestFor: ["Gujarat", "Maharashtra", "Andhra Pradesh", "Telangana", "Rajasthan"],
  },
  Tomato: {
    season: "Rabi",
    sowing: [8, 9, 10],
    growing: [9, 10, 11, 0],
    harvesting: [11, 0, 1, 2],
    fertilizing: [9, 10, 11],
    irrigation: [9, 10, 11, 0, 1],
    tips: "Stake plants for support. Watch for early blight. Apply calcium spray to prevent blossom end rot.",
    bestFor: ["Maharashtra", "Karnataka", "Andhra Pradesh", "Gujarat", "West Bengal"],
  },
  Onion: {
    season: "Rabi",
    sowing: [9, 10],
    growing: [10, 11, 0, 1],
    harvesting: [1, 2, 3],
    fertilizing: [10, 11, 0],
    irrigation: [10, 11, 0, 1, 2],
    tips: "Avoid excess nitrogen near harvest. Cure bulbs before storage.",
    bestFor: ["Maharashtra", "Gujarat", "Rajasthan", "Karnataka", "Madhya Pradesh"],
  },
  Soybean: {
    season: "Kharif",
    sowing: [6, 7],
    growing: [7, 8, 9],
    harvesting: [10, 11],
    fertilizing: [6, 7],
    irrigation: [6, 7, 8],
    tips: "Inoculate seeds with Rhizobium. Avoid waterlogging. Good rotation with wheat.",
    bestFor: ["Madhya Pradesh", "Maharashtra", "Rajasthan", "Karnataka", "Gujarat"],
  },
  Groundnut: {
    season: "Kharif",
    sowing: [5, 6],
    growing: [6, 7, 8, 9],
    harvesting: [9, 10],
    fertilizing: [5, 6, 7],
    irrigation: [6, 7, 8],
    tips: "Apply gypsum at pegging stage. Harvest when lower leaves turn yellow.",
    bestFor: ["Gujarat", "Andhra Pradesh", "Tamil Nadu", "Karnataka", "Rajasthan"],
  },
  Turmeric: {
    season: "Kharif",
    sowing: [3, 4, 5],
    growing: [5, 6, 7, 8, 9, 10, 11],
    harvesting: [0, 1, 2],
    fertilizing: [4, 6, 8],
    irrigation: [4, 5, 6, 7, 8, 9],
    tips: "Needs well-drained loamy soil. Apply organic mulch to retain moisture.",
    bestFor: ["Andhra Pradesh", "Telangana", "Odisha", "Tamil Nadu", "Maharashtra"],
  },
  Potato: {
    season: "Rabi",
    sowing: [9, 10, 11],
    growing: [10, 11, 0, 1],
    harvesting: [1, 2, 3],
    fertilizing: [10, 11, 0],
    irrigation: [10, 11, 0, 1, 2],
    tips: "Hill earthing at 30 and 60 days. Late blight is the main threat.",
    bestFor: ["Uttar Pradesh", "West Bengal", "Bihar", "Gujarat", "Punjab"],
  },
  Mustard: {
    season: "Rabi",
    sowing: [9, 10],
    growing: [10, 11, 0],
    harvesting: [1, 2],
    fertilizing: [9, 10],
    irrigation: [10, 11, 0],
    tips: "Apply sulphur for good oil content. Monitor for aphids in winter.",
    bestFor: ["Rajasthan", "Uttar Pradesh", "Haryana", "Madhya Pradesh", "Gujarat"],
  },
};

const ACTIVITY_COLORS: Record<Activity, { bg: string; text: string; label: string }> = {
  sowing:      { bg: "bg-secondary/20", text: "text-secondary",    label: "Sowing" },
  growing:     { bg: "bg-primary/15",   text: "text-primary",      label: "Growing" },
  harvesting:  { bg: "bg-accent/20",    text: "text-accent",       label: "Harvesting" },
  fertilizing: { bg: "bg-blue-500/15",  text: "text-blue-600 dark:text-blue-400", label: "Fertilizing" },
  irrigation:  { bg: "bg-cyan-500/15",  text: "text-cyan-700 dark:text-cyan-400", label: "Irrigation" },
};

function getCellActivities(crop: CropSchedule, monthIdx: number): Activity[] {
  const acts: Activity[] = [];
  if (crop.sowing.includes(monthIdx)) acts.push("sowing");
  if (crop.growing.includes(monthIdx)) acts.push("growing");
  if (crop.harvesting.includes(monthIdx)) acts.push("harvesting");
  if (crop.fertilizing.includes(monthIdx)) acts.push("fertilizing");
  if (crop.irrigation.includes(monthIdx)) acts.push("irrigation");
  return acts;
}

export default function CropCalendar() {
  const [selectedCrop, setSelectedCrop] = useState("Wheat");
  const cropData = CROP_DATA[selectedCrop];

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
                <CalendarDays className="h-5 w-5" />
                Crop Calendar
              </h1>
              <p className="text-xs text-primary-foreground/70">Planting & harvest schedule</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 max-w-2xl pb-24 space-y-4">
        {/* Crop Selector */}
        <Select value={selectedCrop} onValueChange={setSelectedCrop}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a crop" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(CROP_DATA).map(crop => (
              <SelectItem key={crop} value={crop}>{crop}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Crop Info */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between gap-2 flex-wrap">
              <div>
                <h2 className="text-lg font-bold">{selectedCrop}</h2>
                <p className="text-sm text-muted-foreground mt-0.5">{cropData.tips}</p>
              </div>
              <Badge className={cropData.season === "Kharif" ? "bg-secondary text-secondary-foreground" : cropData.season === "Rabi" ? "bg-primary/80 text-primary-foreground" : "bg-accent text-accent-foreground"}>
                {cropData.season}
              </Badge>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {cropData.bestFor.map(region => (
                <Badge key={region} variant="outline" className="text-xs">{region}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Calendar Grid */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Monthly Schedule</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {MONTHS.map((month, idx) => {
                const acts = getCellActivities(cropData, idx);
                const isCurrentMonth = idx === CURRENT_MONTH;
                const primaryAct = acts[0];
                const colorConfig = primaryAct ? ACTIVITY_COLORS[primaryAct] : null;

                return (
                  <div
                    key={month}
                    className={`rounded-md p-2 border text-center transition-colors ${
                      isCurrentMonth ? "border-primary border-2" : "border-border"
                    } ${colorConfig ? colorConfig.bg : "bg-muted/30"}`}
                  >
                    <p className={`text-xs font-bold mb-1 ${isCurrentMonth ? "text-primary" : "text-muted-foreground"}`}>
                      {month}
                    </p>
                    {acts.length > 0 ? (
                      <div className="space-y-0.5">
                        {acts.slice(0, 2).map(act => (
                          <p key={act} className={`text-[10px] font-medium leading-tight ${ACTIVITY_COLORS[act].text}`}>
                            {ACTIVITY_COLORS[act].label}
                          </p>
                        ))}
                        {acts.length > 2 && (
                          <p className="text-[10px] text-muted-foreground">+{acts.length - 2} more</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-[10px] text-muted-foreground/50">—</p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Current Month Highlight */}
            <div className="mt-4 p-3 bg-primary/10 rounded-md border border-primary/20">
              <p className="text-sm font-semibold text-primary mb-1">
                This Month: {MONTHS[CURRENT_MONTH]}
              </p>
              {(() => {
                const thisMonthActs = getCellActivities(cropData, CURRENT_MONTH);
                if (thisMonthActs.length === 0) return (
                  <p className="text-sm text-muted-foreground">No major activity for {selectedCrop} this month.</p>
                );
                return (
                  <div className="flex flex-wrap gap-1">
                    {thisMonthActs.map(act => (
                      <Badge key={act} className={`${ACTIVITY_COLORS[act].bg} ${ACTIVITY_COLORS[act].text} border-0`}>
                        {ACTIVITY_COLORS[act].label}
                      </Badge>
                    ))}
                  </div>
                );
              })()}
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Legend</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="grid grid-cols-2 gap-2">
              {(Object.entries(ACTIVITY_COLORS) as [Activity, typeof ACTIVITY_COLORS[Activity]][]).map(([act, cfg]) => (
                <div key={act} className={`flex items-center gap-2 rounded-md px-3 py-2 ${cfg.bg}`}>
                  <div className={`w-2.5 h-2.5 rounded-full ${cfg.bg.replace("/20","/70").replace("/15","/70")}`} />
                  <span className={`text-sm font-medium ${cfg.text}`}>{cfg.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* All Crops Quick View */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">All Crops — Season Guide</CardTitle>
          </CardHeader>
          <CardContent className="p-3">
            <div className="space-y-2">
              {Object.entries(CROP_DATA).map(([name, data]) => (
                <button
                  key={name}
                  onClick={() => setSelectedCrop(name)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-left hover-elevate transition-colors ${selectedCrop === name ? "bg-primary/10 border border-primary/30" : "bg-muted/40"}`}
                >
                  <span className="text-sm font-medium">{name}</span>
                  <Badge variant="outline" className="text-xs">{data.season}</Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
