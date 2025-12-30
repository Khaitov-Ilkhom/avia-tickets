import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { Sun, Moon, Laptop } from "lucide-react";
import { useTheme } from "@/providers/theme/theme-provider";
import { useIsMobile } from "@/hooks/use-mobile";

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();

  return (
      <div>
        <Select value={theme} onValueChange={(value) => setTheme(value as any)}>
          <SelectTrigger className="w-[100px] md:w-[100px] [&>svg]:hidden">
            <SelectValue placeholder="Theme" className={isMobile ? "hidden" : "block"}/>
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="light" className="flex gap-2">
              <Sun className="h-4 w-4" />
              Light
            </SelectItem>

            <SelectItem value="dark" className="flex gap-2">
              <Moon className="h-4 w-4" />
              Dark
            </SelectItem>

            <SelectItem value="system" className="flex gap-2">
              <Laptop className="h-4 w-4" />
              System
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
  );
};

ThemeToggle.displayName = "ThemeToggle";