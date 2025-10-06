import { ThemeProvider } from "../ThemeProvider";
import { KramerInspiration } from "../KramerInspiration";

export default function KramerInspirationExample() {
  return (
    <ThemeProvider>
      <div className="bg-background">
        <KramerInspiration />
      </div>
    </ThemeProvider>
  );
}
