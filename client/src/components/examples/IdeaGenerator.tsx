import { ThemeProvider } from "../ThemeProvider";
import { IdeaGenerator } from "../IdeaGenerator";

export default function IdeaGeneratorExample() {
  return (
    <ThemeProvider>
      <div className="bg-background">
        <IdeaGenerator />
      </div>
    </ThemeProvider>
  );
}
