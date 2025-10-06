import { Lightbulb, Github, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription submitted");
  };

  return (
    <footer className="bg-muted/30 border-t py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-6 w-6 text-primary" />
              <span className="font-serif text-xl font-bold">Kramer Ideas Tool</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Cosmo Kramer'ın yaratıcı ruhundan ilham alarak, girişimcilere ve fikir arayanlara yapay zeka destekli çözümler sunuyoruz.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Hakkımızda
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                  Nasıl Çalışır
                </a>
              </li>
              <li>
                <a href="#generator" className="text-muted-foreground hover:text-foreground transition-colors">
                  Fikir Üret
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Kramer Sözleri</h3>
            <p className="font-righteous text-xl text-primary/80 mb-2">"Giddy up!"</p>
            <p className="text-sm text-muted-foreground mb-4">Haftalık ilham verici fikirler al</p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <Input
                type="email"
                placeholder="E-posta adresin"
                className="flex-1"
                data-testid="input-newsletter-email"
              />
              <Button type="submit" data-testid="button-newsletter-submit">
                Abone Ol
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Kramer Ideas Tool. Tüm hakları saklıdır.
          </p>
          
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" data-testid="button-social-github">
              <Github className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" data-testid="button-social-twitter">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" data-testid="button-social-linkedin">
              <Linkedin className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
