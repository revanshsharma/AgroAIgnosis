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
import Onboarding from "@/pages/onboarding";
import BottomNavigation from "@/components/bottom-navigation";
import { useUserProfile } from "@/hooks/use-user-profile";

function AppShell() {
  const { hasProfile, isLoading } = useUserProfile();
  const [location] = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-primary text-lg font-medium">Loading...</div>
      </div>
    );
  }

  if (!hasProfile && location !== "/onboarding") {
    return <Onboarding />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-16">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/analysis" component={Analysis} />
        <Route path="/chat" component={Chat} />
        <Route path="/history" component={History} />
        <Route path="/profile" component={Profile} />
        <Route path="/onboarding" component={Onboarding} />
        <Route component={NotFound} />
      </Switch>
      <BottomNavigation />
    </div>
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
