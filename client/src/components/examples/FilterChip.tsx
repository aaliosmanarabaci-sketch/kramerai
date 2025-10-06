import { useState } from "react";
import { ThemeProvider } from "../ThemeProvider";
import { FilterChip } from "../FilterChip";

export default function FilterChipExample() {
  const [active, setActive] = useState(false);

  return (
    <ThemeProvider>
      <div className="p-8 bg-background">
        <div className="flex gap-4">
          <FilterChip
            label="Teknoloji"
            isActive={active}
            onClick={() => setActive(!active)}
          />
          <FilterChip label="Moda" isActive={false} onClick={() => {}} />
          <FilterChip label="Yiyecek" isActive={true} onClick={() => {}} />
        </div>
      </div>
    </ThemeProvider>
  );
}
