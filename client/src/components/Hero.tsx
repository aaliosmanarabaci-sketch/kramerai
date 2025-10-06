import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToGenerator = () => {
    const element = document.getElementById("generator");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-destructive/5" />
      
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 rounded-full bg-destructive blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-chart-3 blur-2xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Cosmo Kramer'dan İlham Al</span>
          </div>

          <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight">
            Kramer Seviyesinde
            <br />
            <span className="text-primary">Yaratıcı Fikirler</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Yapay zeka ile sınırsız sayıda özgün girişim fikri üretin. 
            Filtreleri ayarlayın, ilham alın ve bir sonraki büyük projenizi keşfedin.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              onClick={scrollToGenerator}
              className="text-lg px-8"
              data-testid="button-hero-cta"
            >
              İlk Fikrimi Üret
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const element = document.getElementById("how-it-works");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-lg px-8"
              data-testid="button-learn-more"
            >
              Nasıl Çalışır?
            </Button>
          </div>

          <div className="pt-8">
            <p className="font-righteous text-2xl text-primary/80">
              "Giddy up!"
            </p>
            <p className="text-sm text-muted-foreground mt-1">- Cosmo Kramer</p>
          </div>
        </div>
      </div>
    </section>
  );
}
