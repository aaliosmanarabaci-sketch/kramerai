import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

const kramerIdeas = [
  {
    title: "Kahve Masası Kitabı",
    description: "Kahve masaları hakkında bir kitap... ve kitabın kendisi kahve masasına dönüşüyor!",
    status: "Efsane",
  },
  {
    title: "Erkekler İçin Sütyen",
    description: "The Bro ya da Manssiere - Erkekler için özel sütyen tasarımı",
    status: "Yenilikçi",
  },
  {
    title: "Plajlı Ofis",
    description: "Masanın altına kum döküp ofisi plaja çevirmek",
    status: "Çılgın",
  },
  {
    title: "Makarna Yeleği",
    description: "Spagettiden yapılmış, yenebilir bir giysi",
    status: "Özgün",
  },
  {
    title: "Periskoplu Araba",
    description: "Trafikte önü görmek için arabalara periskop takmak",
    status: "Pratik",
  },
  {
    title: "Kramerica Industries",
    description: "Kendi holding şirketini kurmak",
    status: "Hırslı",
  },
];

export function KramerInspiration() {
  return (
    <section id="kramer-inspiration" className="py-16 bg-gradient-to-b from-muted/10 to-muted/20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">İlham Kaynağımız</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Kramer Hakkında
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              <span className="font-bold text-foreground">Cosmo Kramer</span>, Seinfeld dizisinin unutulmaz karakteri ve <span className="text-primary font-semibold">yaratıcı dehanın</span> sembolüdür. 
              Sıradışı fikirleri, cesur girişimleri ve "hiçbir şey imkansız değil" anlayışıyla milyonları etkiledi.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Bu platform, Kramer'ın <span className="font-semibold text-foreground">spontane yaratıcılığını</span> ve 
              <span className="font-semibold text-foreground"> sınır tanımayan girişimcilik ruhunu</span> yapay zeka ile harmanlayarak, 
              size gerçekleştirilebilir ama aynı zamanda özgün iş fikirleri sunar.
            </p>
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border mx-auto max-w-2xl">
              <p className="text-2xl font-serif font-bold text-primary mb-2">
                "I'm not a businessman, I'm a business, man!"
              </p>
              <p className="text-sm text-muted-foreground">
                Kramer'ın girişimcilik felsefesi
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-center mb-8">
            Kramer'ın Unutulmaz Girişimleri
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kramerIdeas.map((idea, index) => (
              <Card key={index} className="hover-elevate transition-all duration-300" data-testid={`card-kramer-idea-${index}`}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-xl leading-tight">{idea.title}</CardTitle>
                    <Badge variant="secondary">{idea.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{idea.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/10 to-destructive/10 rounded-3xl p-8 border-2 border-primary/20 max-w-3xl mx-auto">
            <h3 className="font-serif text-2xl font-bold mb-4">Kramer Ruhu Nasıl İş Fikirlerinize Yansıyor?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-primary mb-2">🚀 Cesaret</h4>
                <p className="text-sm text-muted-foreground">Sıradışı fikirleri gerçeğe dönüştürme cesareti</p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">💡 Yaratıcılık</h4>
                <p className="text-sm text-muted-foreground">Kimsenin düşünmediği çözümler üretme yetisi</p>
              </div>
              <div>
                <h4 className="font-semibold text-primary mb-2">🎯 Kararlılık</h4>
                <p className="text-sm text-muted-foreground">"Giddy up!" ruhuyla hedeflere odaklanma</p>
              </div>
            </div>
            <div className="mt-8">
              <p className="font-righteous text-3xl text-primary mb-2">
                "These pretzels are making me thirsty!"
              </p>
              <p className="text-sm text-muted-foreground">
                - Cosmo Kramer'ın ünlü sözü, basit şeylerin bile büyük fırsatlara dönüşebileceğini hatırlatır
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
