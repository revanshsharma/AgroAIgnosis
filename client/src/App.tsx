import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Analysis from "@/pages/analysis";
import Chat from "@/pages/chat";
import History from "@/pages/history";
import Profile from "@/pages/profile";
import SchemesPage from "@/pages/schemes";
import SupportPage from "@/pages/support";
import MandiPage from "@/pages/mandi";
import CropCalendar from "@/pages/calendar";
import FertilizerCalculator from "@/pages/calculator";
import AuthPage from "@/pages/auth";
import WhyKrishiMitra from "@/pages/why-krishimitra";
import BottomNavigation from "@/components/bottom-navigation";
import VoiceNavigation from "@/components/voice-navigation";
import { UserProfileContext, useUserProfileState } from "@/hooks/use-user-profile";
import type { UserProfile } from "@/hooks/use-user-profile";
import { LanguageContext, useLanguageState } from "@/hooks/use-language";
import { ThemeContext, useThemeState } from "@/hooks/use-theme";
import { useEffect, useState } from "react";
import { Wifi } from "lucide-react";

// Offline caching is useful in production, but cache-first service workers
// make the Replit development preview show stale React modules.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    if (import.meta.env.DEV) {
      navigator.serviceWorker.getRegistrations()
        .then((registrations) => registrations.forEach((registration) => registration.unregister()))
        .catch(() => {});
      if ('caches' in window) {
        caches.keys().then((keys) => keys.forEach((key) => caches.delete(key))).catch(() => {});
      }
    } else {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    }
  });
}

function OfflineBanner({ t }: { t: any }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const on = () => setIsOnline(true);
    const off = () => setIsOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off); };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-destructive text-destructive-foreground flex items-center justify-center gap-2 py-2 text-sm font-medium">
      <Wifi className="h-4 w-4" />
      {t.common.offline_title} — {t.common.offline_message}
    </div>
  );
}

function AppShell() {
  const profileState = useUserProfileState();
  const { hasProfile, isLoading, profile } = profileState;
  const [location] = useLocation();
  const isPublicDemoPage = location === "/why-krishimitra";
  const langState = useLanguageState(profile?.region);
  const { t } = langState;
  const themeState = useThemeState();

  const AUTH_DECIDED_KEY = "krishimitra_auth_decided";
  const [authDecided, setAuthDecided] = useState(() => {
    return localStorage.getItem(AUTH_DECIDED_KEY) === "1";
  });

  const handleAuthDecision = () => {
    localStorage.setItem(AUTH_DECIDED_KEY, "1");
    setAuthDecided(true);
  };

  const handleAuthSuccess = (authProfile: Pick<UserProfile, "name" | "region" | "phone">) => {
    profileState.saveProfile({
      ...authProfile,
      joinedDate: profileState.profile?.joinedDate ||
        new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" }),
    });
    handleAuthDecision();
  };

  if (isLoading) {
    return (
      <ThemeContext.Provider value={themeState}>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-primary text-lg font-medium">{t.common.loading}</div>
        </div>
      </ThemeContext.Provider>
    );
  }

  if ((!authDecided || !hasProfile) && !isPublicDemoPage) {
    return (
      <ThemeContext.Provider value={themeState}>
        <LanguageContext.Provider value={langState}>
          <UserProfileContext.Provider value={profileState}>
            <AuthPage onSuccess={handleAuthSuccess} initialProfile={profile} />
          </UserProfileContext.Provider>
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={themeState}>
      <LanguageContext.Provider value={langState}>
        <UserProfileContext.Provider value={profileState}>
          <OfflineBanner t={t} />
            {hasProfile && authDecided && <VoiceNavigation />}
          <div className="min-h-screen bg-background text-foreground pb-16">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/analysis" component={Analysis} />
              <Route path="/chat" component={Chat} />
              <Route path="/history" component={History} />
              <Route path="/schemes" component={SchemesPage} />
              <Route path="/support" component={SupportPage} />
              <Route path="/mandi" component={MandiPage} />
              <Route path="/calendar" component={CropCalendar} />
              <Route path="/calculator" component={FertilizerCalculator} />
              <Route path="/why-krishimitra" component={WhyKrishiMitra} />
              <Route path="/profile" component={Profile} />
              <Route component={NotFound} />
            </Switch>
            <footer className="px-4 py-5 text-center text-xs text-muted-foreground" aria-label="Copyright">
              © 2025 ZeroTheory™. All rights reserved.
            </footer>
            {hasProfile && authDecided && <BottomNavigation />}
          </div>
        </UserProfileContext.Provider>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppShell />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
