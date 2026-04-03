import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Leaf, Shield, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import { apiRequest } from "@/lib/queryClient";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir",
];

interface AuthPageProps {
  onSuccess: () => void;
  onGuest: () => void;
}

export default function AuthPage({ onSuccess, onGuest }: AuthPageProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({ phone: "", pin: "" });
  const [registerForm, setRegisterForm] = useState({ phone: "", pin: "", name: "", region: "" });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.phone || !loginForm.pin) return;
    if (loginForm.pin.length !== 4) {
      toast({ title: "Invalid PIN", description: "PIN must be 4 digits", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await apiRequest("POST", "/api/auth/login", {
        phone: loginForm.phone,
        pin: loginForm.pin,
      });
      toast({ title: t.auth.welcome_back + "!" });
      onSuccess();
    } catch (err: any) {
      toast({ title: "Login failed", description: err.message || "Invalid phone or PIN", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.phone || !registerForm.pin || !registerForm.name || !registerForm.region) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    if (registerForm.pin.length !== 4) {
      toast({ title: "Invalid PIN", description: "PIN must be 4 digits", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await apiRequest("POST", "/api/auth/register", registerForm);
      toast({ title: t.auth.create_account, description: `Welcome, ${registerForm.name}!` });
      onSuccess();
    } catch (err: any) {
      toast({ title: "Registration failed", description: err.message || "Phone already registered", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-3 shadow-lg">
          <Leaf className="h-9 w-9 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">KrishiMitra</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {t.auth.secure_hint}
        </p>
      </div>

      <Card className="w-full max-w-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-center text-lg">{t.auth.create_account}</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login">
            <TabsList className="w-full mb-4">
              <TabsTrigger value="login" className="flex-1">{t.auth.login}</TabsTrigger>
              <TabsTrigger value="register" className="flex-1">{t.auth.register}</TabsTrigger>
            </TabsList>

            {/* Login */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-phone">
                    <Phone className="h-3 w-3 inline mr-1" />
                    {t.auth.phone}
                  </Label>
                  <Input
                    id="login-phone"
                    type="tel"
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    value={loginForm.phone}
                    onChange={(e) => setLoginForm({ ...loginForm, phone: e.target.value.replace(/\D/g, "") })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-pin">{t.auth.pin}</Label>
                  <Input
                    id="login-pin"
                    type="password"
                    placeholder="••••"
                    maxLength={4}
                    inputMode="numeric"
                    value={loginForm.pin}
                    onChange={(e) => setLoginForm({ ...loginForm, pin: e.target.value.replace(/\D/g, "") })}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? t.common.loading : t.auth.submit_login}
                </Button>
              </form>
            </TabsContent>

            {/* Register */}
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reg-name">{t.auth.name}</Label>
                  <Input
                    id="reg-name"
                    placeholder="Your name"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-phone">
                    <Phone className="h-3 w-3 inline mr-1" />
                    {t.auth.phone}
                  </Label>
                  <Input
                    id="reg-phone"
                    type="tel"
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    value={registerForm.phone}
                    onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value.replace(/\D/g, "") })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-pin">{t.auth.pin}</Label>
                  <Input
                    id="reg-pin"
                    type="password"
                    placeholder="••••"
                    maxLength={4}
                    inputMode="numeric"
                    value={registerForm.pin}
                    onChange={(e) => setRegisterForm({ ...registerForm, pin: e.target.value.replace(/\D/g, "") })}
                  />
                  <p className="text-xs text-muted-foreground">{t.auth.pin_hint}</p>
                </div>
                <div className="space-y-2">
                  <Label>{t.auth.region}</Label>
                  <Select value={registerForm.region} onValueChange={(v) => setRegisterForm({ ...registerForm, region: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent>
                      {INDIAN_STATES.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? t.common.loading : t.auth.submit_register}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Security note */}
          <div className="flex items-center gap-2 mt-4 p-3 bg-muted/50 rounded-md">
            <Shield className="h-4 w-4 text-muted-foreground shrink-0" />
            <p className="text-xs text-muted-foreground">{t.auth.secure_hint}</p>
          </div>

          {/* Guest option */}
          <div className="mt-4 text-center">
            <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={onGuest}>
              {t.auth.guest}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
