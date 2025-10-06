import { Heart, Share2, Lightbulb, Eye, Copy, Mail } from "lucide-react";
import { SiWhatsapp, SiTelegram } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Idea } from "@shared/schema";
import { IdeaDetailModal } from "./IdeaDetailModal";
import { useSavedIdeas } from "@/contexts/SavedIdeasContext";
import { useToast } from "@/hooks/use-toast";

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
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const { addIdea, removeIdea, isIdeaSaved } = useSavedIdeas();
  const { toast } = useToast();
  const isSaved = isIdeaSaved(idea.title);

  const handleSave = () => {
    if (isSaved) {
      removeIdea(idea.title);
      toast({
        title: "Favorilerden Çıkarıldı",
        description: `"${idea.title}" favorilerden kaldırıldı.`,
      });
    } else {
      addIdea(idea);
      toast({
        title: "Favorilere Eklendi",
        description: `"${idea.title}" favorilere kaydedildi.`,
      });
    }
  };

  const getShareText = () => {
    return `🚀 ${idea.title}\n\n${idea.description}\n\n📊 Kategori: ${idea.category}\n💰 Bütçe: ${idea.budget}\n⚙️ Karmaşıklık: ${idea.complexity}\n\n✨ KramerAI ile üretildi!`;
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(getShareText());
    window.open(`https://wa.me/?text=${text}`, '_blank');
    setIsShareOpen(false);
    toast({
      title: "WhatsApp'ta Paylaş",
      description: "WhatsApp açılıyor...",
    });
  };

  const handleTelegramShare = () => {
    const text = encodeURIComponent(getShareText());
    window.open(`https://t.me/share/url?text=${text}`, '_blank');
    setIsShareOpen(false);
    toast({
      title: "Telegram'da Paylaş",
      description: "Telegram açılıyor...",
    });
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`💡 İş Fikri: ${idea.title}`);
    const body = encodeURIComponent(getShareText());
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
    setIsShareOpen(false);
    toast({
      title: "Email ile Gönder",
      description: "Email uygulamanız açılıyor...",
    });
  };

  const handleCopyLink = async () => {
    const text = getShareText();
    try {
      await navigator.clipboard.writeText(text);
      setIsShareOpen(false);
      toast({
        title: "Kopyalandı!",
        description: "Fikir panoya kopyalandı.",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Kopyalama başarısız oldu.",
        variant: "destructive",
      });
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `💡 ${idea.title}`,
          text: getShareText(),
        });
        setIsShareOpen(false);
      } catch (error) {
        console.log('Share cancelled or failed:', error);
      }
    }
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
            <Popover open={isShareOpen} onOpenChange={setIsShareOpen}>
              <PopoverTrigger asChild>
                <Button
                  size="sm"
                  variant="ghost"
                  data-testid="button-share-idea"
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Paylaş
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-2" align="start">
                <div className="flex flex-col gap-1">
                  {'share' in navigator && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleNativeShare}
                      className="justify-start hover-elevate"
                      data-testid="button-native-share"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Paylaş...
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleWhatsAppShare}
                    className="justify-start hover-elevate"
                    data-testid="button-share-whatsapp"
                  >
                    <SiWhatsapp className="h-4 w-4 mr-2 text-green-600" />
                    WhatsApp
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleTelegramShare}
                    className="justify-start hover-elevate"
                    data-testid="button-share-telegram"
                  >
                    <SiTelegram className="h-4 w-4 mr-2 text-blue-500" />
                    Telegram
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleEmailShare}
                    className="justify-start hover-elevate"
                    data-testid="button-share-email"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyLink}
                    className="justify-start hover-elevate"
                    data-testid="button-copy-text"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Metni Kopyala
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
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
