import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function FilterChip({ label, isActive, onClick }: FilterChipProps) {
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      size="sm"
      onClick={onClick}
      className={cn(
        "rounded-full font-semibold transition-all",
        isActive 
          ? "shadow-lg scale-105" 
          : "hover-elevate hover:scale-105 hover:border-primary/50"
      )}
      data-testid={`filter-chip-${label.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {label}
    </Button>
  );
}
