import { useState } from "react";
import { Sparkles, Loader2, RefreshCw, Dices } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterChip } from "./FilterChip";
import { IdeaCard, type IdeaCardProps } from "./IdeaCard";
import { useToast } from "@/hooks/use-toast";

const industries = [
  "Teknoloji",
  "Yiyecek & İçecek",
  "Moda",
  "Sağlık",
  "Eğitim",
  "Eğlence",
  "Finans",
  "Gayrimenkul",
  "Turizm & Seyahat",
  "Spor & Fitness",
  "Sanat & Tasarım",
  "Medya & İletişim",
  "E-ticaret",
  "Danışmanlık",
  "Çevre & Sürdürülebilirlik",
  "Oyun & Hobi",
  "Otomotiv",
  "Evcil Hayvan",
  "Kozmetik & Güzellik"
];

const budgets = [
  "0-5.000₺",
  "5.000-25.000₺",
  "25.000-100.000₺",
  "100.000-500.000₺",
  "500.000₺+"
];

const complexities = [
  "Çok Basit",
  "Basit",
  "Orta",
  "Karmaşık",
  "Çok Karmaşık"
];

const audiences = [
  "B2B",
  "B2C",
  "B2B2C",
  "Niş Pazar",
  "Gençler (18-25)",
  "Yetişkinler (25-45)",
  "Emekliler (45+)",
  "Aileler",
  "Profesyoneller",
  "Öğrenciler",
  "Girişimciler"
];

export function IdeaGenerator() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [selectedComplexity, setSelectedComplexity] = useState<string | null>(null);
  const [selectedAudience, setSelectedAudience] = useState<string | null>(null);
  const [ideas, setIdeas] = useState<IdeaCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const clearFilters = () => {
    setSelectedIndustry(null);
    setSelectedBudget(null);
    setSelectedComplexity(null);
    setSelectedAudience(null);
    console.log("Filters cleared");
  };

  const generateRandomIdea = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/generate-ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          industry: null,
          budget: null,
          complexity: null,
          audience: null,
          creativityLevel: "wild",
          ideaCount: 4,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Fikirler üretilirken bir hata oluştu");
      }

      const data = await response.json();
      
      if (data.error) {
        toast({
          title: "Hata",
          description: data.error,
          variant: "destructive",
        });
        setIdeas([]);
      } else if (data.ideas && data.ideas.length > 0) {
        setIdeas(data.ideas);
        toast({
          title: "🎲 Şansın Yaver Gitti!",
          description: `Tamamen rastgele ${data.ideas.length} yaratıcı fikir üretildi`,
        });
      } else {
        toast({
          title: "Uyarı",
          description: "Fikir üretilemedi, lütfen tekrar deneyin",
          variant: "destructive",
        });
        setIdeas([]);
      }
    } catch (error) {
      console.error("Error generating random ideas:", error);
      toast({
        title: "Hata",
        description: error instanceof Error ? error.message : "Fikirler üretilirken bir hata oluştu",
        variant: "destructive",
      });
      setIdeas([]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateIdeas = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch("/api/generate-ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          industry: selectedIndustry,
          budget: selectedBudget,
          complexity: selectedComplexity,
          audience: selectedAudience,
          creativityLevel: "creative",
          ideaCount: 4,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Fikirler üretilirken bir hata oluştu");
      }

      const data = await response.json();
      
      if (data.error) {
        toast({
          title: "Hata",
          description: data.error,
          variant: "destructive",
        });
        setIdeas([]);
      } else if (data.ideas && data.ideas.length > 0) {
        setIdeas(data.ideas);
        toast({
          title: "Başarılı!",
          description: `${data.ideas.length} yaratıcı fikir üretildi`,
        });
      } else {
        toast({
          title: "Uyarı",
          description: "Fikir üretilemedi, lütfen tekrar deneyin",
          variant: "destructive",
        });
        setIdeas([]);
      }
    } catch (error) {
      console.error("Error generating ideas:", error);
      toast({
        title: "Hata",
        description: error instanceof Error ? error.message : "Fikirler üretilirken bir hata oluştu",
        variant: "destructive",
      });
      setIdeas([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="generator" className="py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-primary blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-destructive blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>
      
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary/20 to-destructive/20 rounded-full mb-8 border-2 border-primary/30 shadow-xl backdrop-blur-sm animate-pulse">
            <Sparkles className="h-5 w-5 text-primary animate-spin" style={{ animationDuration: '3s' }} />
            <span className="text-base font-bold bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent">
              🎯 Fikir Üretim Merkezi
            </span>
          </div>
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-primary via-destructive to-primary bg-clip-text text-transparent animate-gradient leading-tight">
            Fikirlerini Filtrele
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            İhtiyaçlarına göre <span className="text-foreground font-bold">filtreleri seç</span> ve yapay zeka <span className="text-primary font-bold">Kramer tarzı yaratıcı fikirler</span> üretsin
          </p>
        </div>

        <div className="bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-md border-2 border-primary/20 rounded-3xl p-8 md:p-12 mb-16 space-y-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border-2 border-primary/20 hover-elevate transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary/20 p-3 rounded-xl">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  Sektör
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {industries.map((industry) => (
                  <FilterChip
                    key={industry}
                    label={industry}
                    isActive={selectedIndustry === industry}
                    onClick={() => setSelectedIndustry(selectedIndustry === industry ? null : industry)}
                  />
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-chart-2/5 to-chart-2/10 rounded-2xl p-6 border-2 border-chart-2/20 hover-elevate transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-chart-2/20 p-3 rounded-xl">
                  <Sparkles className="h-6 w-6 text-chart-2" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  Bütçe
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {budgets.map((budget) => (
                  <FilterChip
                    key={budget}
                    label={budget}
                    isActive={selectedBudget === budget}
                    onClick={() => setSelectedBudget(selectedBudget === budget ? null : budget)}
                  />
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-chart-3/5 to-chart-3/10 rounded-2xl p-6 border-2 border-chart-3/20 hover-elevate transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-chart-3/20 p-3 rounded-xl">
                  <Sparkles className="h-6 w-6 text-chart-3" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  Karmaşıklık
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {complexities.map((complexity) => (
                  <FilterChip
                    key={complexity}
                    label={complexity}
                    isActive={selectedComplexity === complexity}
                    onClick={() => setSelectedComplexity(selectedComplexity === complexity ? null : complexity)}
                  />
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-chart-4/5 to-chart-4/10 rounded-2xl p-6 border-2 border-chart-4/20 hover-elevate transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-chart-4/20 p-3 rounded-xl">
                  <Sparkles className="h-6 w-6 text-chart-4" />
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  Hedef Kitle
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {audiences.map((audience) => (
                  <FilterChip
                    key={audience}
                    label={audience}
                    isActive={selectedAudience === audience}
                    onClick={() => setSelectedAudience(selectedAudience === audience ? null : audience)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10 border-t-2 border-primary/20">
            <Button
              size="lg"
              onClick={generateIdeas}
              disabled={isLoading}
              className="w-full sm:w-auto px-8"
              data-testid="button-generate-ideas"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Kramer Gibi Düşünüyor...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 mr-2" />
                  Fikirler Üret
                </>
              )}
            </Button>
            <Button
              size="lg"
              variant="secondary"
              onClick={generateRandomIdea}
              disabled={isLoading}
              className="w-full sm:w-auto px-8"
              data-testid="button-random-idea"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Şansını Deniyorum...
                </>
              ) : (
                <>
                  <Dices className="h-5 w-5 mr-2" />
                  Şansımı Dene
                </>
              )}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={clearFilters}
              disabled={isLoading}
              className="w-full sm:w-auto px-8"
              data-testid="button-clear-filters"
            >
              Filtreleri Temizle
            </Button>
          </div>
        </div>

        {ideas.length > 0 && (
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4 border border-primary/20">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">Başarılı!</span>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Senin İçin Üretildi
              </h3>
              <p className="text-lg text-muted-foreground">
                <span className="font-bold text-primary">{ideas.length}</span> yaratıcı fikir bulundu
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ideas.map((idea, index) => (
                <IdeaCard key={index} {...idea} />
              ))}
            </div>

            <div className="flex justify-center pt-8">
              <Button
                size="lg"
                variant="outline"
                onClick={generateIdeas}
                disabled={isLoading}
                className="text-base px-8 shadow-md hover:shadow-lg transition-all backdrop-blur-sm"
                data-testid="button-regenerate-ideas"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Yeni Fikirler Üretiliyor...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-5 w-5 mr-2" />
                    Yeni Fikirler Üret
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
