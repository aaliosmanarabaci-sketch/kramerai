import { Heart, Share2, Lightbulb, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Idea } from "@shared/schema";
import { IdeaDetailModal } from "./IdeaDetailModal";

export type IdeaCardProps = Idea;

const categoryColors: Record<string, string> = {
  "Teknoloji": "border-l-chart-1 shadow-md",
  "Yiyecek & İçecek": "border-l-chart-2 shadow-md",
  "Moda": "border-l-chart-3 shadow-md",
  "Sağlık": "border-l-chart-4 shadow-md",
  "Eğitim": "border-l-chart-5 shadow-md",
  "Eğlence": "border-l-primary shadow-md",
  "Finans": "border-l-chart-1 shadow-md",
  "Gayrimenkul": "border-l-chart-4 shadow-md",
  "Turizm & Seyahat": "border-l-chart-3 shadow-md",
  "Spor & Fitness": "border-l-chart-5 shadow-md",
  "Sanat & Tasarım": "border-l-chart-3 shadow-md",
  "Medya & İletişim": "border-l-chart-2 shadow-md",
  "E-ticaret": "border-l-chart-1 shadow-md",
  "Danışmanlık": "border-l-chart-5 shadow-md",
  "Çevre & Sürdürülebilirlik": "border-l-chart-4 shadow-md",
  "Oyun & Hobi": "border-l-primary shadow-md",
  "Otomotiv": "border-l-chart-1 shadow-md",
  "Evcil Hayvan": "border-l-chart-2 shadow-md",
  "Kozmetik & Güzellik": "border-l-chart-3 shadow-md",
  "default": "border-l-muted shadow-md",
};

export function IdeaCard(idea: IdeaCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleSave = () => {
    setIsSaved(!isSaved);
    console.log(`Idea ${isSaved ? "unsaved" : "saved"}: ${idea.title}`);
  };

  const handleShare = () => {
    console.log(`Sharing idea: ${idea.title}`);
  };

  const borderColor = categoryColors[idea.category] || categoryColors["default"];

  return (
    <>
      <Card className={cn("hover-elevate transition-all duration-200 border-l-4", borderColor)} data-testid={`card-idea-${idea.title.toLowerCase().replace(/\s+/g, "-")}`}>
        <CardHeader className="space-y-3">
          <CardTitle className="text-xl font-semibold leading-tight">{idea.title}</CardTitle>
          <CardDescription className="text-base leading-relaxed">{idea.description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" data-testid="badge-category">{idea.category}</Badge>
            <Badge variant="outline" data-testid="badge-budget">{idea.budget}</Badge>
            <Badge variant="outline" data-testid="badge-complexity">{idea.complexity}</Badge>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground mr-2">Özgünlük:</span>
            {Array.from({ length: 5 }).map((_, i) => (
              <Lightbulb
                key={i}
                className={cn(
                  "h-4 w-4",
                  i < idea.uniqueness ? "text-primary fill-primary" : "text-muted-foreground/30"
                )}
              />
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex gap-2">
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
          </div>
          <Button
            size="sm"
            variant="default"
            onClick={() => setIsDetailOpen(true)}
            data-testid="button-view-detail"
          >
            <Eye className="h-4 w-4 mr-1" />
            Detaylar
          </Button>
        </CardFooter>
      </Card>

      <IdeaDetailModal
        idea={idea}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </>
  );
}
