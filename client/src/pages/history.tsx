import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye, Sprout, AlertTriangle, CheckCircle2, Clock, Camera } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import type { AnalysisResult } from "@shared/schema";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { useLanguage } from "@/hooks/use-language";

type StatusFilter = "all" | "healthy" | "disease_detected" | "needs_attention";

const STATUS_META = {
  healthy:          { label: "Healthy",         color: "bg-secondary text-secondary-foreground",     icon: CheckCircle2, pieColor: "hsl(122, 39%, 49%)" },
  disease_detected: { label: "Disease Found",   color: "bg-destructive text-destructive-foreground", icon: AlertTriangle, pieColor: "hsl(4, 90%, 58%)" },
  needs_attention:  { label: "Needs Attention", color: "bg-accent text-accent-foreground",           icon: Clock, pieColor: "hsl(36, 100%, 50%)" },
};

function StatCard({ icon: Icon, count, label, colorClass }: { icon: any; count: number; label: string; colorClass: string }) {
  return (
    <Card>
      <CardContent className="p-3 text-center">
        <Icon className={`h-5 w-5 mx-auto mb-1 ${colorClass}`} />
        <p className="text-xl font-bold">{count}</p>
        <p className="text-xs text-muted-foreground leading-tight">{label}</p>
      </CardContent>
    </Card>
  );
}

export default function History() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const { data: analysisHistory, isLoading } = useQuery<AnalysisResult[]>({
    queryKey: ["/api/analysis-results", "user-1"],
    enabled: true,
  });

  const history = Array.isArray(analysisHistory) ? analysisHistory : [];

  const healthyCount   = history.filter(r => r.status === "healthy").length;
  const diseaseCount   = history.filter(r => r.status === "disease_detected").length;
  const attentionCount = history.filter(r => r.status === "needs_attention").length;

  const filtered = filter === "all" ? history : history.filter(r => r.status === filter);

  const pieData = [
    { name: "Healthy",         value: healthyCount,   color: "hsl(122, 39%, 49%)" },
    { name: "Disease Found",   value: diseaseCount,   color: "hsl(4, 90%, 58%)"   },
    { name: "Needs Attention", value: attentionCount, color: "hsl(36, 100%, 50%)" },
  ].filter(d => d.value > 0);

  // Last 7 days bar chart
  const dayLabels = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toLocaleDateString("en-IN", { weekday: "short" });
  });
  const barData = dayLabels.map((day, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toDateString();
    const count = history.filter(r => r.createdAt && new Date(r.createdAt).toDateString() === dateStr).length;
    return { day, count };
  });

  const toggleExpand = (id: string) => setExpanded(prev => prev === id ? null : id);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-3">
            <Link href="/">
              <Button size="icon" variant="ghost" className="text-primary-foreground">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">{t.home.recent_analysis}</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-4 max-w-2xl pb-24 space-y-4">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="animate-pulse space-y-2">
                    <div className="h-4 bg-muted rounded w-1/3" />
                    <div className="h-3 bg-muted rounded w-2/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : history.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground/40" />
              <p className="font-medium text-muted-foreground mb-2">{t.home.no_analysis}</p>
              <p className="text-sm text-muted-foreground mb-4">{t.home.start_first_scan}</p>
              <Link href="/analysis">
                <Button>
                  <Camera className="mr-2 h-4 w-4" />
                  {t.analysis.crop_analysis}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Summary Stats */}
            <div className="grid grid-cols-4 gap-2">
              <StatCard icon={Sprout}        count={history.length} label="Total"         colorClass="text-primary" />
              <StatCard icon={CheckCircle2}  count={healthyCount}   label="Healthy"       colorClass="text-secondary" />
              <StatCard icon={AlertTriangle} count={diseaseCount}   label="Disease"       colorClass="text-destructive" />
              <StatCard icon={Clock}         count={attentionCount} label="Attention"     colorClass="text-accent" />
            </div>

            {/* Charts */}
            {history.length >= 2 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Pie Chart */}
                <Card>
                  <CardHeader className="pb-0 pt-3">
                    <CardTitle className="text-sm">Status Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent className="p-2">
                    <ResponsiveContainer width="100%" height={160}>
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={3} dataKey="value">
                          {pieData.map((entry, i) => (
                            <Cell key={i} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value, name) => [`${value} scans`, name]} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 pb-1">
                      {pieData.map(d => (
                        <div key={d.name} className="flex items-center gap-1">
                          <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                          <span className="text-xs text-muted-foreground">{d.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Bar Chart — last 7 days */}
                <Card>
                  <CardHeader className="pb-0 pt-3">
                    <CardTitle className="text-sm">Last 7 Days</CardTitle>
                  </CardHeader>
                  <CardContent className="p-2">
                    <ResponsiveContainer width="100%" height={160}>
                      <BarChart data={barData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                        <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                        <Tooltip
                          contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 6, fontSize: 12 }}
                          formatter={(v) => [`${v} scan${Number(v) !== 1 ? "s" : ""}`, "Scans"]}
                        />
                        <Bar dataKey="count" fill="hsl(var(--primary))" radius={[3, 3, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {(["all", "healthy", "disease_detected", "needs_attention"] as StatusFilter[]).map(f => (
                <Button
                  key={f}
                  size="sm"
                  variant={filter === f ? "default" : "outline"}
                  onClick={() => setFilter(f)}
                  className="flex-shrink-0"
                >
                  {f === "all" ? `All (${history.length})`
                    : f === "healthy" ? `Healthy (${healthyCount})`
                    : f === "disease_detected" ? `Disease (${diseaseCount})`
                    : `Attention (${attentionCount})`}
                </Button>
              ))}
            </div>

            {/* History List */}
            {filtered.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground text-sm">
                  No results with this filter.
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {filtered.map((result: AnalysisResult) => {
                  const meta = STATUS_META[result.status as keyof typeof STATUS_META] || STATUS_META.needs_attention;
                  const isOpen = expanded === String(result.id);
                  return (
                    <Card key={result.id} className="overflow-hidden">
                      <CardContent className="p-0">
                        <button
                          className="w-full text-left p-4 hover-elevate"
                          onClick={() => toggleExpand(String(result.id))}
                        >
                          <div className="flex items-start gap-3">
                            <img
                              src={result.imageUrl}
                              alt={result.cropType || "Analysis"}
                              className="w-14 h-14 rounded-md object-cover flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <h3 className="font-semibold text-sm truncate">{result.cropType || "Soil Sample"}</h3>
                                <Badge className={`${meta.color} flex-shrink-0 text-xs`}>{meta.label}</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground capitalize">{result.analysisType} analysis</p>
                              {result.confidence && (
                                <p className="text-xs text-muted-foreground">Confidence: {result.confidence}</p>
                              )}
                              <p className="text-xs text-muted-foreground mt-1">
                                {result.createdAt ? new Date(result.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                              </p>
                            </div>
                          </div>
                        </button>

                        {/* Expandable Details */}
                        {isOpen && (
                          <div className="border-t border-border px-4 py-3 bg-muted/20 space-y-2">
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">Diagnosis</p>
                              <p className="text-sm">{result.diagnosis}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">Recommendations</p>
                              <p className="text-sm">{result.recommendations}</p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
