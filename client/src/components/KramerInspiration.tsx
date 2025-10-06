import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Kramer'ın İlham Veren Fikirleri
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cosmo Kramer'ın Seinfeld'daki unutulmaz girişimlerinden bazıları
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kramerIdeas.map((idea, index) => (
            <Card key={index} className="hover-elevate" data-testid={`card-kramer-idea-${index}`}>
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

        <div className="text-center mt-12">
          <p className="font-righteous text-3xl text-primary/80 mb-2">
            "These pretzels are making me thirsty!"
          </p>
          <p className="text-muted-foreground">- Cosmo Kramer, Seinfeld</p>
        </div>
      </div>
    </section>
  );
}
