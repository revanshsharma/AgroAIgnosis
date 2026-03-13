import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sprout, MapPin, User, ChevronRight } from "lucide-react";
import { useUserProfile, INDIAN_REGIONS, PRIMARY_CROPS } from "@/hooks/use-user-profile";
import { useLocation } from "wouter";

function Onboarding() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [farmSize, setFarmSize] = useState("");
  const [primaryCrop, setPrimaryCrop] = useState("");
  const [phone, setPhone] = useState("");
  const { saveProfile } = useUserProfile();
  const [, setLocation] = useLocation();

  const handleFinish = () => {
    saveProfile({
      name: name.trim(),
      region,
      farmSize,
      primaryCrop,
      phone: phone.trim(),
      joinedDate: new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" }),
    });
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary text-primary-foreground rounded-full p-4 mb-3">
            <Sprout className="h-10 w-10" />
          </div>
          <h1 className="text-2xl font-bold text-primary">KrishiMitra</h1>
          <p className="text-muted-foreground text-sm mt-1">Your AI farming companion</p>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${s === step ? "w-8 bg-primary" : s < step ? "w-4 bg-primary/50" : "w-4 bg-muted"}`}
            />
          ))}
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Tell us about yourself
              </CardTitle>
              <p className="text-sm text-muted-foreground">Help us personalise your experience</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g. Ramesh Patil"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number (optional)</Label>
                <Input
                  id="phone"
                  placeholder="e.g. 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1"
                  type="tel"
                />
              </div>

              <Button
                className="w-full"
                onClick={() => setStep(2)}
                disabled={!name.trim()}
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Your farm details
              </CardTitle>
              <p className="text-sm text-muted-foreground">We'll tailor advice to your region and crops</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>State / Region *</Label>
                <Select onValueChange={setRegion} value={region}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select your state" />
                  </SelectTrigger>
                  <SelectContent>
                    {INDIAN_REGIONS.map((r) => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Primary Crop (optional)</Label>
                <Select onValueChange={setPrimaryCrop} value={primaryCrop}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="What do you mainly grow?" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIMARY_CROPS.map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="farmSize">Farm Size (optional)</Label>
                <Input
                  id="farmSize"
                  placeholder="e.g. 2 acres, 5 bigha"
                  value={farmSize}
                  onChange={(e) => setFarmSize(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleFinish}
                  disabled={!region}
                >
                  Get Started
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default Onboarding;
