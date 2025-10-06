import { Lightbulb } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";

export function Header() {
  const scrollToGenerator = () => {
    const element = document.getElementById("generator");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-primary" />
          <span className="font-serif text-xl font-bold">Kramer Ideas Tool</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="default"
            onClick={scrollToGenerator}
            data-testid="button-generate-cta"
          >
            Fikir Üret
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
