import { Sparkles, Zap, TrendingUp, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  const scrollToGenerator = () => {
    const element = document.getElementById("generator");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-destructive/10" />
      
      <div className="absolute inset-0 opacity-[0.07]">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-10 w-80 h-80 rounded-full bg-destructive blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/3 right-1/3 w-48 h-48 rounded-full bg-chart-3 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary/15 to-destructive/15 rounded-full border border-primary/25 shadow-lg backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm font-semibold bg-gradient-to-r from-primary to-destructive bg-clip-text text-transparent">
              AI destekli • Cosmo Kramer ruhlu
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight">
              <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Kramer Seviyesinde
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-destructive to-primary bg-clip-text text-transparent animate-gradient">
                Yaratıcı Fikirler
              </span>
            </h1>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Badge variant="secondary" className="text-sm">
                <Zap className="h-3 w-3 mr-1" />
                Anında Üretim
              </Badge>
              <Badge variant="secondary" className="text-sm">
                <TrendingUp className="h-3 w-3 mr-1" />
                Detaylı Analiz
              </Badge>
              <Badge variant="secondary" className="text-sm">
                <Rocket className="h-3 w-3 mr-1" />
                Yol Haritası
              </Badge>
            </div>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Yapay zeka ile sınırsız sayıda <span className="font-semibold text-foreground">özgün girişim fikri</span> üretin. 
            Filtreleri ayarlayın, detaylı yol haritaları alın ve bir sonraki büyük projenizi keşfedin.
          </p>

          <div className="flex justify-center pt-6">
            <Button
              size="lg"
              onClick={scrollToGenerator}
              className="text-lg px-10 py-6 shadow-xl hover:shadow-2xl transition-all"
              data-testid="button-hero-cta"
            >
              <Sparkles className="h-5 w-5 mr-2" />
              İlk Fikrimi Üret
            </Button>
          </div>

          <div className="pt-12 opacity-80">
            <div className="inline-block px-6 py-4 bg-card/50 backdrop-blur-sm rounded-2xl border shadow-md">
              <p className="text-2xl font-serif font-semibold text-primary mb-1">
                "Giddy up!"
              </p>
              <p className="text-xs text-muted-foreground font-medium tracking-wide">
                — COSMO KRAMER
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
