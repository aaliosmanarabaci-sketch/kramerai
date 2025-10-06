import { Lightbulb, Zap, Menu, X, Home, HelpCircle, Sparkles, Info } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
            <div className="relative bg-gradient-to-br from-primary to-destructive p-2 rounded-lg">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
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
          </nav>
        </div>
      )}
    </header>
  );
}
