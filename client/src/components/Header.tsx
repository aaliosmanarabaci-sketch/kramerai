import { Lightbulb, Zap } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

export function Header() {
  const scrollToGenerator = () => {
    const element = document.getElementById("generator");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b shadow-sm">
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
        
        <div className="flex items-center gap-3">
          <Button
            variant="default"
            onClick={scrollToGenerator}
            className="shadow-sm"
            data-testid="button-generate-cta"
          >
            <Lightbulb className="h-4 w-4 mr-2" />
            Fikir Üret
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
