import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Leaf, ShieldCheck, Phone, MapPin, UserRound, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import { apiRequest } from "@/lib/queryClient";
import type { UserProfile } from "@/hooks/use-user-profile";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir",
];

interface AuthPageProps {
  onSuccess: (profile: Pick<UserProfile, "name" | "region" | "phone">) => void;
  initialProfile?: UserProfile | null;
}

export default function AuthPage({ onSuccess, initialProfile }: AuthPageProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: initialProfile?.name || "",
    phone: initialProfile?.phone || "",
    region: initialProfile?.region || "",
    pin: "",
  });

  const handleAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone || !form.region || !form.pin) {
      toast({ title: "Almost there", description: "Please fill in your name, mobile number, state and PIN.", variant: "destructive" });
      return;
    }
    if (form.phone.length !== 10) {
      toast({ title: "Check your mobile number", description: "Please enter all 10 digits.", variant: "destructive" });
      return;
    }
    if (form.pin.length !== 4) {
      toast({ title: "Check your PIN", description: "Your PIN should have 4 digits.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const response = await apiRequest("POST", "/api/auth/access", form);
      const user = await response.json();
      toast({ title: `Welcome, ${user.name}!` });
      onSuccess(user);
    } catch (err: any) {
      toast({ title: "We couldn't open your account", description: err.message || "Please check your details and try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-background to-background flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="flex flex-col items-center mb-6 text-center">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-3 shadow-lg">
          <Leaf className="h-9 w-9 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">KrishiMitra</h1>
        <p className="text-muted-foreground text-sm mt-1">Your friendly farming companion</p>
      </div>

      <Card className="w-full max-w-sm shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Welcome, farmer</CardTitle>
          <p className="text-sm text-muted-foreground">
            Enter your details once to get farming advice made for you.
          </p>
        </CardHeader>
        <CardContent>
              <form onSubmit={handleAccess} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="farmer-name">
                    <UserRound className="h-3 w-3 inline mr-1" />
                    Your name
                  </Label>
                  <Input
                    id="farmer-name"
                    placeholder="e.g. Ramesh Patil"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmer-phone">
                    <Phone className="h-3 w-3 inline mr-1" />
                    Mobile number
                  </Label>
                  <Input
                    id="farmer-phone"
                    type="tel"
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    inputMode="numeric"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    <MapPin className="h-3 w-3 inline mr-1" />
                    Your state
                  </Label>
                  <Select value={form.region} onValueChange={(region) => setForm({ ...form, region })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDIAN_STATES.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmer-pin">4-digit PIN</Label>
                  <Input
                    id="farmer-pin"
                    type="password"
                    placeholder="Choose a PIN you can remember"
                    maxLength={4}
                    inputMode="numeric"
                    autoComplete="current-password"
                    value={form.pin}
                    onChange={(e) => setForm({ ...form, pin: e.target.value.replace(/\D/g, "") })}
                  />
                  <p className="text-xs text-muted-foreground">Use the same PIN when you come back.</p>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? t.common.loading : "Continue to KrishiMitra"}
                  {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </form>

          {/* Security note */}
          <div className="flex items-center gap-2 mt-4 p-3 bg-muted/50 rounded-md">
            <ShieldCheck className="h-4 w-4 text-muted-foreground shrink-0" />
            <p className="text-xs text-muted-foreground">Your details are kept private and used only to personalise your advice.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
