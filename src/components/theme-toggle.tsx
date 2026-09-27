import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');}catch(e){}})();`;

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggle}
      aria-label={dark ? "Switch to day mode" : "Switch to night mode"}
    >
      {dark ? <Sun /> : <Moon />}
    </Button>
  );
}
