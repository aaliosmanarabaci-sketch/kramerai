import { Lightbulb, Zap, Menu, X, Home, HelpCircle, Sparkles, Info, Heart } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useLocation } from "wouter";
import { useSavedIdeas } from "@/contexts/SavedIdeasContext";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { savedIdeas } = useSavedIdeas();

  const scrollToSection = (id: string) => {
    if (location !== "/") {
      setLocation("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    if (location !== "/") {
      setLocation("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const navigateToSaved = () => {
    setLocation("/saved");
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: "Ana Sayfa", icon: Home, action: () => scrollToTop() },
    { label: "Nasıl Çalışır", icon: HelpCircle, action: () => scrollToSection("how-it-works") },
    { label: "Kramer Hakkında", icon: Info, action: () => scrollToSection("kramer-inspiration") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/90 backdrop-blur-xl border-b shadow-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <button 
          onClick={scrollToTop}
          className="flex items-center gap-3 hover-elevate rounded-lg px-3 py-2 transition-all"
          data-testid="button-logo"
        >
          <div className="relative flex-shrink-0">
            <img src="/kramer-logo.png" alt="Kramer" className="h-10 w-10 rounded-lg object-cover ring-2 ring-primary/30" />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-serif text-lg font-bold leading-none">KramerAI</span>
            <span className="text-[10px] text-muted-foreground font-medium leading-none">Idea Generator</span>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.label}
                variant="ghost"
                onClick={item.action}
                className="hover-elevate gap-2"
                data-testid={`nav-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{item.label}</span>
              </Button>
            );
          })}
          <Button
            variant="ghost"
            onClick={navigateToSaved}
            className="hover-elevate gap-2 relative"
            data-testid="nav-link-saved"
          >
            <Heart className="h-4 w-4" />
            <span className="font-medium">Favoriler</span>
            {savedIdeas.length > 0 && (
              <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {savedIdeas.length}
              </Badge>
            )}
          </Button>
        </nav>
        
        <div className="flex items-center gap-3">
          <Button
            variant="default"
            onClick={() => scrollToSection("generator")}
            className="hidden sm:flex shadow-md"
            data-testid="button-generate-cta"
          >
            <Lightbulb className="h-4 w-4 mr-2" />
            Fikir Üret
          </Button>
          <ThemeToggle />
          
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden hover-elevate"
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur-xl">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.label}
                  variant="ghost"
                  onClick={item.action}
                  className="justify-start hover-elevate gap-3 h-12"
                  data-testid={`mobile-nav-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium text-base">{item.label}</span>
                </Button>
              );
            })}
            <Button
              variant="ghost"
              onClick={navigateToSaved}
              className="justify-start hover-elevate gap-3 h-12 relative"
              data-testid="mobile-nav-link-saved"
            >
              <Heart className="h-5 w-5" />
              <span className="font-medium text-base">Favoriler</span>
              {savedIdeas.length > 0 && (
                <Badge variant="destructive" className="ml-auto">
                  {savedIdeas.length}
                </Badge>
              )}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
