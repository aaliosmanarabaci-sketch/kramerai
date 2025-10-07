import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { IdeaGenerator } from "@/components/IdeaGenerator";
import { KramerInspiration } from "@/components/KramerInspiration";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <IdeaGenerator />
        <KramerInspiration />
      </main>
      <Footer />
    </div>
  );
}
