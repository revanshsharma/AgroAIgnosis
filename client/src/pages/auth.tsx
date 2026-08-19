import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Leaf, ShieldCheck, Phone, MapPin, UserRound, ArrowRight, Globe2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import { apiRequest } from "@/lib/queryClient";
import type { UserProfile } from "@/hooks/use-user-profile";
import { LANGUAGE_NAMES, type Language } from "@/i18n/translations";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir",
];

const LANGUAGE_OPTIONS: Language[] = ["en", "hi", "mr", "pa", "gu", "ta", "te", "kn", "bn", "ml", "or"];

interface AuthPageProps {
  onSuccess: (profile: Pick<UserProfile, "name" | "region" | "phone">) => void;
  initialProfile?: UserProfile | null;
}

export default function AuthPage({ onSuccess, initialProfile }: AuthPageProps) {
  const { t, language, setLanguage } = useLanguage();
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
        <div className="px-6 pt-5">
          <label htmlFor="language-choice" className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
            <Globe2 className="h-4 w-4 text-primary" />
            भाषा / Language
          </label>
          <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
            <SelectTrigger id="language-choice" className="h-12 text-base bg-primary/5 border-primary/30">
              <SelectValue placeholder="Choose your language" />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGE_OPTIONS.map((option) => (
                <SelectItem key={option} value={option} className="text-base py-3">
                  {LANGUAGE_NAMES[option]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">{t.auth.create_account}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {t.auth.secure_hint}
          </p>
        </CardHeader>
        <CardContent>
              <form onSubmit={handleAccess} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="farmer-name">
                    <UserRound className="h-3 w-3 inline mr-1" />
                    {t.auth.name}
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
                    {t.auth.phone}
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
                    {t.auth.region}
                  </Label>
                  <Select value={form.region} onValueChange={(region) => setForm({ ...form, region })}>
                    <SelectTrigger>
                      <SelectValue placeholder={t.auth.region} />
                    </SelectTrigger>
                    <SelectContent>
                      {INDIAN_STATES.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="farmer-pin">{t.auth.pin}</Label>
                  <Input
                    id="farmer-pin"
                    type="password"
                    placeholder={t.auth.pin_hint}
                    maxLength={4}
                    inputMode="numeric"
                    autoComplete="current-password"
                    value={form.pin}
                    onChange={(e) => setForm({ ...form, pin: e.target.value.replace(/\D/g, "") })}
                  />
                  <p className="text-xs text-muted-foreground">{t.auth.pin_hint}</p>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? t.common.loading : t.auth.submit_register}
                  {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </form>

          {/* Security note */}
          <div className="flex items-center gap-2 mt-4 p-3 bg-muted/50 rounded-md">
            <ShieldCheck className="h-4 w-4 text-muted-foreground shrink-0" />
            <p className="text-xs text-muted-foreground">{t.auth.secure_hint}</p>
          </div>
        </CardContent>
      </Card>
      <Link href="/why-krishimitra">
        <Button variant="ghost" className="mt-3 text-primary font-medium">
          Why KrishiMitra for farmers?
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
