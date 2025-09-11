import { Button } from "@/components/ui/button";
import { Home, Search, MessageCircle, History, User } from "lucide-react";
import { Link, useLocation } from "wouter";

function BottomNavigation() {
  const [location] = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-40" data-testid="bottom-navigation">
      <div className="flex justify-around items-center py-2">
        <Link href="/">
          <Button
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center p-2 h-auto ${
              isActive("/") ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
            data-testid="nav-home"
          >
            <Home className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Home</span>
          </Button>
        </Link>

        <Link href="/analysis">
          <Button
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center p-2 h-auto ${
              isActive("/analysis") ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
            data-testid="nav-analyze"
          >
            <Search className="h-5 w-5 mb-1" />
            <span className="text-xs">Analyze</span>
          </Button>
        </Link>

        <Link href="/chat">
          <Button
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center p-2 h-auto ${
              isActive("/chat") ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
            data-testid="nav-chat"
          >
            <MessageCircle className="h-5 w-5 mb-1" />
            <span className="text-xs">Chat</span>
          </Button>
        </Link>

        <Link href="/history">
          <Button
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center p-2 h-auto ${
              isActive("/history") ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
            data-testid="nav-history"
          >
            <History className="h-5 w-5 mb-1" />
            <span className="text-xs">History</span>
          </Button>
        </Link>

        <Link href="/profile">
          <Button
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center p-2 h-auto ${
              isActive("/profile") ? "text-primary" : "text-muted-foreground hover:text-primary"
            }`}
            data-testid="nav-profile"
          >
            <User className="h-5 w-5 mb-1" />
            <span className="text-xs">Profile</span>
          </Button>
        </Link>
      </div>
    </nav>
  );
}

export default BottomNavigation;
