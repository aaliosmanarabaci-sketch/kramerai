import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterChip } from "./FilterChip";
import { IdeaCard, type IdeaCardProps } from "./IdeaCard";

const industries = ["Teknoloji", "Yiyecek & İçecek", "Moda", "Sağlık", "Eğitim", "Eğlence"];
const budgets = ["Düşük Bütçe", "Orta Bütçe", "Yüksek Bütçe"];
const complexities = ["Basit", "Orta", "Karmaşık"];
const audiences = ["B2B", "B2C", "Niş Pazar"];

export function IdeaGenerator() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [selectedComplexity, setSelectedComplexity] = useState<string | null>(null);
  const [selectedAudience, setSelectedAudience] = useState<string | null>(null);
  const [ideas, setIdeas] = useState<IdeaCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const clearFilters = () => {
    setSelectedIndustry(null);
    setSelectedBudget(null);
    setSelectedComplexity(null);
    setSelectedAudience(null);
    console.log("Filters cleared");
  };

  const generateIdeas = () => {
    setIsLoading(true);
    console.log("Generating ideas with filters:", {
      industry: selectedIndustry,
      budget: selectedBudget,
      complexity: selectedComplexity,
      audience: selectedAudience,
    });

    setTimeout(() => {
      const mockIdeas: IdeaCardProps[] = [
        {
          title: "Kahve Masası Kitabı 2.0",
          description: "QR kod ile dijital içerik sunan, kendisi de kahve masasına dönüşebilen interaktif bir kitap. Her sayfa farklı bir kahve masası tasarımını anlatıyor.",
          category: selectedIndustry || "Eğlence",
          budget: selectedBudget || "Orta Bütçe",
          complexity: selectedComplexity || "Orta",
          uniqueness: 5,
        },
        {
          title: "Akıllı Sütyen Platformu",
          description: "Erkekler için özel olarak tasarlanmış, postür düzeltici sensörler içeren akıllı sütyen. Mobil uygulama ile sağlık takibi yapılabiliyor.",
          category: selectedIndustry || "Sağlık",
          budget: selectedBudget || "Yüksek Bütçe",
          complexity: selectedComplexity || "Karmaşık",
          uniqueness: 4,
        },
        {
          title: "Sanal Plaj Ofis",
          description: "VR gözlüğü ile ofiste çalışırken kendinizi sahilde hissedebileceğiniz bir platform. Dalga sesleri ve kumsal atmosferi gerçek zamanlı.",
          category: selectedIndustry || "Teknoloji",
          budget: selectedBudget || "Orta Bütçe",
          complexity: selectedComplexity || "Orta",
          uniqueness: 5,
        },
        {
          title: "Yenilebilir Giysi Serisi",
          description: "Tamamen organik malzemelerden üretilen, aç kaldığınızda yiyebileceğiniz moda koleksiyonu. Sürdürülebilir ve sıfır atık.",
          category: selectedIndustry || "Moda",
          budget: selectedBudget || "Düşük Bütçe",
          complexity: selectedComplexity || "Basit",
          uniqueness: 5,
        },
        {
          title: "Son Lokma Ödemez Uygulaması",
          description: "Restoranlarda grup hesabını bölerken, pizzadan son lokmayı yiyen kişinin ödeme yapmamasını sağlayan gamification uygulaması.",
          category: selectedIndustry || "Yiyecek & İçecek",
          budget: selectedBudget || "Düşük Bütçe",
          complexity: selectedComplexity || "Basit",
          uniqueness: 4,
        },
        {
          title: "Periskop Araç Aksesuarı",
          description: "Trafikte önü görmek için araca takılabilen, katlanabilir periskop sistemi. Kamera ile canlı görüntü aktarımı yapıyor.",
          category: selectedIndustry || "Teknoloji",
          budget: selectedBudget || "Orta Bütçe",
          complexity: selectedComplexity || "Orta",
          uniqueness: 4,
        },
      ];

      setIdeas(mockIdeas);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <section id="generator" className="py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Fikirlerini Filtrele
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            İhtiyaçlarına göre filtreleri seç ve yapay zeka Kramer tarzı yaratıcı fikirler üretsin
          </p>
        </div>

        <div className="bg-card border rounded-lg p-6 md:p-8 mb-8 space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Sektör</h3>
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

            <div>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Bütçe</h3>
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

            <div>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Karmaşıklık</h3>
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

            <div>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground">Hedef Kitle</h3>
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

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t">
            <Button
              size="lg"
              onClick={generateIdeas}
              disabled={isLoading}
              className="w-full sm:w-auto text-lg px-8"
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
              variant="ghost"
              onClick={clearFilters}
              disabled={isLoading}
              data-testid="button-clear-filters"
            >
              Filtreleri Temizle
            </Button>
          </div>
        </div>

        {ideas.length > 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="font-serif text-2xl font-bold mb-2">Senin İçin Üretildi</h3>
              <p className="text-muted-foreground">{ideas.length} yaratıcı fikir bulundu</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ideas.map((idea, index) => (
                <IdeaCard key={index} {...idea} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
