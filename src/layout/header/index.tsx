import {cn} from "@/lib/utils.ts";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import LanguagePicker from "@/components/language-picker.tsx";
import {ThemeToggle} from "@/components/theme-toggle.tsx";
import {Plane} from "lucide-react";

const Index = () => {
  const [showShadow, setShowShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShowShadow(true);
      } else {
        setShowShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll)
    };
  }, []);

  return (
      <div className={cn("fixed inset-x-0 z-50  bg-slate-50/70 dark:bg-slate-950/40  backdrop-blur-sm py-2 transition-shadow duration-300",
              {"border-b": !showShadow}, {"shadow-lg  border-b": showShadow})}
      >
        <div className="relative">
          <div className="flex justify-between items-center px-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                <Plane className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">Travel</span>
            </Link>

            <div className="flex justify-between items-center gap-2">
              <LanguagePicker/>
              <ThemeToggle/>
            </div>
          </div>
        </div>
      </div>
  )
}
export default Index
