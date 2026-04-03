import { Button } from "@/components/ui/button";
import { Home, Search, MessageCircle, HandHeart, IndianRupee, User } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useLanguage } from "@/hooks/use-language";

function BottomNavigation() {
  const [location] = useLocation();
  const { t } = useLanguage();

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { href: "/", icon: Home, label: t.nav.home, testId: "nav-home" },
    { href: "/analysis", icon: Search, label: t.nav.scan, testId: "nav-analyze" },
    { href: "/chat", icon: MessageCircle, label: t.nav.chat, testId: "nav-chat" },
    { href: "/support", icon: HandHeart, label: t.nav.support, testId: "nav-support" },
    { href: "/schemes", icon: IndianRupee, label: t.nav.schemes, testId: "nav-schemes" },
    { href: "/profile", icon: User, label: t.nav.profile, testId: "nav-profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-40" data-testid="bottom-navigation">
      <div className="flex justify-around items-center py-1">
        {navItems.map(({ href, icon: Icon, label, testId }) => (
          <Link key={href} href={href}>
            <Button
              variant="ghost"
              size="sm"
              className={`flex flex-col items-center gap-0.5 px-1 h-auto py-1.5 min-w-0 ${
                isActive(href) ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
              data-testid={testId}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="text-[10px] font-medium leading-none truncate max-w-[52px] text-center">{label}</span>
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default BottomNavigation;
