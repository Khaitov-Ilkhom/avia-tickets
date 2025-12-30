import { ArrowLeft, Home, ClipboardList, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: typeof Home;
  label: string;
  path: string;
  isBack?: boolean;
}

const navItems: NavItem[] = [
  { icon: ArrowLeft, label: "Назад", path: "#", isBack: true },
  { icon: Home, label: "Главный", path: "/" },
  { icon: ClipboardList, label: "Мои заказы", path: "/order" },
  { icon: User, label: "Кабинет", path: "/profile" },
];

export const BottomNavigation = () => {
  const location = useLocation();

  const handleBack = () => {
    window.history.back();
  };

  return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border bottom-nav-safe md:hidden">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            if (item.isBack) {
              return (
                  <button key={item.label} onClick={handleBack}
                      className="flex flex-col items-center justify-center gap-1 flex-1 h-full text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-xs">{item.label}</span>
                  </button>
              );
            }

            return (
                <Link key={item.path} to={item.path}
                    className={cn("flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
                        isActive ? "text-green-500" : "text-muted-foreground hover:text-foreground"
                    )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Link>
            );
          })}
        </div>
      </nav>
  );
};
