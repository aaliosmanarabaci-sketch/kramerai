import { ThemeProvider } from "../ThemeProvider";
import { IdeaCard } from "../IdeaCard";

export default function IdeaCardExample() {
  return (
    <ThemeProvider>
      <div className="p-8 bg-background max-w-md">
        <IdeaCard
          title="Kahve Masası Kitabı 2.0"
          description="QR kod ile dijital içerik sunan, kendisi de kahve masasına dönüşebilen interaktif bir kitap. Her sayfa farklı bir kahve masası tasarımını anlatıyor."
          category="Eğlence"
          budget="Orta Bütçe"
          complexity="Orta"
          uniqueness={5}
        />
      </div>
    </ThemeProvider>
  );
}
