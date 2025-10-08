import { Zap, Github, Twitter, Linkedin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription submitted");
  };

  return (
    <footer className="bg-gradient-to-b from-muted/20 to-muted/40 border-t py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="relative flex-shrink-0">
                <img src="/kramer-logo.png" alt="Kramer" className="h-10 w-10 rounded-lg object-cover ring-2 ring-primary/30" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold leading-none">KramerAI</span>
                <span className="text-xs text-muted-foreground font-medium leading-none">Idea Generator</span>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Cosmo Kramer'ın yaratıcı ruhundan ilham alarak, girişimcilere ve fikir arayanlara <span className="font-semibold text-foreground">yapay zeka destekli</span> çözümler sunuyoruz.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li>
                <a href="#kramer-inspiration" className="text-muted-foreground hover:text-foreground transition-colors">
                  Kramer Hakkında
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full mb-4 border border-primary/20">
              <Sparkles className="h-3 w-3 text-primary" />
              <h3 className="font-semibold text-sm">Kramer Sözleri</h3>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-xl p-4 mb-4 border">
              <p className="text-xl font-serif font-semibold text-primary mb-1">"Giddy up!"</p>
              <p className="text-xs text-muted-foreground">— COSMO KRAMER</p>
            </div>
            <p className="text-sm text-muted-foreground mb-4">Haftalık ilham verici fikirler al</p>
            
            <form
              action="https://app.us20.list-manage.com/subscribe/post?u=093799661af66a7874f64bd51&amp;id=7a1c4ab2e5&amp;f_id=00fb76eef0"
              method="post"
              target="_blank"
              className="flex gap-2"
            >
              <input
                type="email"
                name="EMAIL"
                required
                placeholder="E-posta adresin"
                className="flex-1 border border-border rounded-lg p-2 text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                data-testid="input-newsletter-email"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4 py-2 rounded-lg transition shadow-sm"
                data-testid="button-newsletter-submit"
              >
                Abone Ol
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground font-medium">
            © 2025 <span className="font-semibold text-foreground">KramerAI</span>. Tüm hakları saklıdır.
          </p>
          
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" className="hover-elevate" data-testid="button-social-github">
              <Github className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="hover-elevate" data-testid="button-social-twitter">
              <Twitter className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="hover-elevate" data-testid="button-social-linkedin">
              <Linkedin className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
