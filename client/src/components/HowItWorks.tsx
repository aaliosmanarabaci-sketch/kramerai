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
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Nasıl Çalışır?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Üç basit adımda harika fikirler üret
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="relative hover-elevate" data-testid={`card-step-${index + 1}`}>
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl">
                  {index + 1}
                </div>
                <CardHeader className="pt-8">
                  <div className="mb-4">
                    <Icon className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{step.title}</CardTitle>
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
