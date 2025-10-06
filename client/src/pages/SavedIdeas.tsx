import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { IdeaCard } from "@/components/IdeaCard";
import { useSavedIdeas } from "@/contexts/SavedIdeasContext";
import { Button } from "@/components/ui/button";
import { Trash2, Heart, Sparkles } from "lucide-react";
import { useLocation } from "wouter";

export default function SavedIdeas() {
  const { savedIdeas, clearAll } = useSavedIdeas();
  const [, setLocation] = useLocation();

  const handleClearAll = () => {
    if (confirm("Tüm kayıtlı fikirleri silmek istediğinizden emin misiniz?")) {
      clearAll();
    }
  };

  const navigateToGenerator = () => {
    setLocation("/");
    setTimeout(() => {
      const element = document.getElementById("generator");
      element?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-24 bg-gradient-to-b from-background via-muted/20 to-background relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-primary blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-destructive blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
          </div>

          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-destructive/20 to-primary/20 rounded-full mb-8 border-2 border-destructive/30 shadow-xl backdrop-blur-sm">
                <Heart className="h-5 w-5 text-destructive fill-destructive" />
                <span className="text-base font-bold bg-gradient-to-r from-destructive to-primary bg-clip-text text-transparent">
                  Favori Fikirlerim
                </span>
              </div>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-destructive via-primary to-destructive bg-clip-text text-transparent animate-gradient leading-tight">
                Kayıtlı Fikirler
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Beğendiğiniz ve <span className="text-foreground font-bold">favorilere eklediğiniz</span> tüm fikirler burada
              </p>
            </div>

            {savedIdeas.length === 0 ? (
              <div className="max-w-2xl mx-auto text-center py-20">
                <div className="bg-card/50 backdrop-blur-sm border-2 border-primary/20 rounded-3xl p-12 shadow-xl">
                  <Heart className="h-24 w-24 text-muted-foreground/30 mx-auto mb-6" />
                  <h2 className="font-serif text-3xl font-bold mb-4">
                    Henüz Kayıtlı Fikir Yok
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    Beğendiğiniz fikirleri kalp ikonuna tıklayarak favorilere ekleyebilirsiniz.
                  </p>
                  <Button
                    size="lg"
                    onClick={navigateToGenerator}
                    className="text-lg px-10 py-6 shadow-xl"
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Fikir Üretmeye Başla
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                  <p className="text-lg text-muted-foreground">
                    Toplam <span className="font-bold text-primary">{savedIdeas.length}</span> kayıtlı fikir
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleClearAll}
                    className="hover-elevate"
                    data-testid="button-clear-all"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Tümünü Temizle
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {savedIdeas.map((idea, index) => (
                    <IdeaCard key={index} {...idea} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
