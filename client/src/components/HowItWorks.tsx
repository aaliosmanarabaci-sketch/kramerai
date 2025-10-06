import { Filter, Sparkles, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const steps = [
  {
    icon: Filter,
    title: "Kriterlerini Seç",
    description: "Sektör, bütçe, karmaşıklık ve hedef kitle gibi filtrelerle aradığın fikir tipini belirle.",
  },
  {
    icon: Sparkles,
    title: "AI Fikir Üretir",
    description: "Yapay zeka, senin için Kramer seviyesinde yaratıcı ve özgün girişim fikirleri üretir.",
  },
  {
    icon: Heart,
    title: "Kaydet & Geliştir",
    description: "Beğendiğin fikirleri kaydet, paylaş ve kendi girişimini kurma yolunda ilk adımı at.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gradient-to-b from-muted/20 via-muted/40 to-muted/20">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">Süreç</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Nasıl Çalışır?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Üç basit adımda <span className="text-foreground font-semibold">harika fikirler</span> üret
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="relative hover-elevate bg-card/70 backdrop-blur-sm shadow-lg border-2" data-testid={`card-step-${index + 1}`}>
                <div className="absolute -top-5 -left-5 w-14 h-14 rounded-full bg-gradient-to-br from-primary to-destructive text-primary-foreground flex items-center justify-center font-bold text-xl shadow-xl border-4 border-background">
                  {index + 1}
                </div>
                <CardHeader className="pt-10">
                  <div className="mb-4 p-3 bg-primary/10 rounded-xl w-fit">
                    <Icon className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-bold">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
