import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BrainCircuit,
  Camera,
  CheckCircle2,
  CloudSun,
  Languages,
  Landmark,
  Leaf,
  Mic,
  MapPin,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
  Sprout,
  Upload,
  Volume2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const comparisonPoints = [
  {
    icon: Languages,
    title: "Speaks the farmer’s language",
    text: "Start in a familiar Indian language, then use voice or simple text. No English fluency is required.",
  },
  {
    icon: Camera,
    title: "Understands the farm, not just the question",
    text: "A crop photo, state, weather and crop stage help turn a generic answer into a useful next step.",
  },
  {
    icon: Sprout,
    title: "Advice that leads to action",
    text: "Farmers can move from diagnosis to treatment, mandi prices, schemes or a helpline without searching elsewhere.",
  },
  {
    icon: ShieldCheck,
    title: "Built around trust and access",
    text: "Clear explanations, saved history, official support links and a human helpline keep AI advice grounded.",
  },
];

const flowSteps = [
  { icon: Mic, number: "1", title: "Farmer asks", text: "Speak, type a question or take a crop photo.", color: "bg-primary" },
  { icon: Languages, number: "2", title: "KrishiMitra understands", text: "Language, crop, region and local context are combined.", color: "bg-secondary" },
  { icon: BrainCircuit, number: "3", title: "AI checks the situation", text: "Crop and soil analysis connect with weather and farming knowledge.", color: "bg-accent" },
  { icon: CheckCircle2, number: "4", title: "Simple answer", text: "Get clear steps, precautions and confidence—not a wall of jargon.", color: "bg-primary" },
  { icon: ArrowRight, number: "5", title: "Take action", text: "Treat the crop, check prices, find a scheme or call for help.", color: "bg-secondary" },
  { icon: PhoneCall, number: "6", title: "Keep learning", text: "Save the result and return with a follow-up question.", color: "bg-accent" },
];

function WhyKrishiMitra() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-primary-foreground" aria-label="Back home">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <p className="text-xs uppercase tracking-wider text-primary-foreground/75">SIH internal hackathon</p>
            <h1 className="text-xl font-bold">Why KrishiMitra?</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <section className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-2 text-sm font-semibold mb-4">
            <Leaf className="h-4 w-4" />
            Technology that meets farmers where they are
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Why KrishiMitra for farmers—not just another AI chatbot?
          </h2>
          <p className="text-lg text-muted-foreground">
            ChatGPT, Claude and Gemini are powerful general assistants. KrishiMitra turns that power into a focused, voice-first tool for the daily realities of Indian farming.
          </p>
        </section>

        <Card className="mb-10 border-primary/30 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <CardContent className="p-6 md:p-8">
            <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
              <div className="rounded-xl bg-muted p-5">
                <p className="text-sm font-semibold text-muted-foreground mb-2">General AI tools</p>
                <h3 className="text-xl font-semibold mb-3">Powerful, but generic</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Mostly text-first conversations</li>
                  <li>• The farmer must explain the context</li>
                  <li>• Answers do not automatically connect to local services</li>
                </ul>
              </div>
              <div className="mx-auto rounded-full bg-primary text-primary-foreground p-3 shadow-md">
                <ArrowRight className="h-6 w-6" />
              </div>
              <div className="rounded-xl bg-primary text-primary-foreground p-5">
                <p className="text-sm font-semibold text-primary-foreground/80 mb-2">KrishiMitra</p>
                <h3 className="text-xl font-semibold mb-3">Focused, local and actionable</h3>
                <ul className="space-y-2 text-sm text-primary-foreground/90">
                  <li>• Voice and 11 Indian language options</li>
                  <li>• Crop photo + region + weather context</li>
                  <li>• One path to advice, prices, schemes and help</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <section className="mb-12">
          <div className="flex items-center gap-3 mb-5">
            <div className="rounded-lg bg-primary text-primary-foreground p-2"><BadgeCheck className="h-5 w-5" /></div>
            <div>
              <h2 className="text-2xl font-bold">Designed for real farmer needs</h2>
              <p className="text-muted-foreground">Every feature removes one barrier between a farmer and a better decision.</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {comparisonPoints.map(({ icon: Icon, title, text }) => (
              <Card key={title} className="h-full">
                <CardContent className="p-5">
                  <Icon className="h-7 w-7 text-primary mb-3" />
                  <h3 className="font-semibold text-lg mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="text-center mb-7">
            <div className="inline-flex items-center gap-2 text-primary font-semibold mb-2">
              <MapPin className="h-5 w-5" />
              From question to action
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">How KrishiMitra works</h2>
            <p className="text-muted-foreground mt-2">A simple flow a farmer can understand and a judge can remember.</p>
          </div>

          <div className="relative grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {flowSteps.map(({ icon: Icon, number, title, text, color }, index) => (
              <div key={title} className="relative">
                <Card className="h-full border-border/80">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className={`${color} text-white rounded-full w-10 h-10 flex items-center justify-center shrink-0 font-bold`}>
                        {number}
                      </div>
                      <div>
                        <Icon className="h-5 w-5 text-primary mb-2" />
                        <h3 className="font-semibold mb-1">{title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {index < flowSteps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-primary bg-background rounded-full" />
                )}
              </div>
            ))}
          </div>
        </section>

        <Card className="border-accent/40 bg-accent/10">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-5">
              <div className="rounded-xl bg-accent text-accent-foreground p-4">
                <Volume2 className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold mb-1">Demo this in 30 seconds</h2>
                <p className="text-muted-foreground">
                  Tap the floating microphone and say “scan my crop”, “show mandi prices”, or “government schemes”. KrishiMitra navigates for the farmer.
                </p>
              </div>
              <Link href="/">
                <Button className="shrink-0">
                  Try the app
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

export default WhyKrishiMitra;