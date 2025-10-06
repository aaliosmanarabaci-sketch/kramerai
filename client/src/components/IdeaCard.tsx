import { Heart, Share2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface IdeaCardProps {
  title: string;
  description: string;
  category: string;
  budget: string;
  complexity: string;
  uniqueness: number;
}

const categoryColors: Record<string, string> = {
  "Teknoloji": "border-l-chart-1",
  "Yiyecek & İçecek": "border-l-chart-2",
  "Moda": "border-l-chart-3",
  "Sağlık": "border-l-chart-4",
  "Eğitim": "border-l-chart-5",
  "Eğlence": "border-l-primary",
  "default": "border-l-muted",
};

export function IdeaCard({ title, description, category, budget, complexity, uniqueness }: IdeaCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    console.log(`Idea ${isSaved ? "unsaved" : "saved"}: ${title}`);
  };

  const handleShare = () => {
    console.log(`Sharing idea: ${title}`);
  };

  const borderColor = categoryColors[category] || categoryColors["default"];

  return (
    <Card className={cn("hover-elevate transition-all duration-200 border-l-4", borderColor)} data-testid={`card-idea-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <CardHeader className="space-y-3">
        <CardTitle className="text-xl font-semibold leading-tight">{title}</CardTitle>
        <CardDescription className="text-base leading-relaxed">{description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" data-testid="badge-category">{category}</Badge>
          <Badge variant="outline" data-testid="badge-budget">{budget}</Badge>
          <Badge variant="outline" data-testid="badge-complexity">{complexity}</Badge>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground mr-2">Özgünlük:</span>
          {Array.from({ length: 5 }).map((_, i) => (
            <Lightbulb
              key={i}
              className={cn(
                "h-4 w-4",
                i < uniqueness ? "text-primary fill-primary" : "text-muted-foreground/30"
              )}
            />
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={handleSave}
          className={cn(isSaved && "text-destructive")}
          data-testid="button-save-idea"
        >
          <Heart className={cn("h-4 w-4 mr-1", isSaved && "fill-current")} />
          {isSaved ? "Kaydedildi" : "Kaydet"}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleShare}
          data-testid="button-share-idea"
        >
          <Share2 className="h-4 w-4 mr-1" />
          Paylaş
        </Button>
      </CardFooter>
    </Card>
  );
}
