
import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Sun, Moon } from 'lucide-react';

export const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3 bg-muted/50 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 min-w-0">
      <div className="flex items-center gap-1 sm:gap-2 min-w-0">
        <Sun className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500 shrink-0" />
        <span className="text-xs sm:text-sm font-nunito text-muted-foreground hidden xs:inline">Claro</span>
      </div>
      
      <Switch
        checked={isDark}
        onCheckedChange={toggleDarkMode}
        className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground/30 shrink-0 scale-75 sm:scale-100"
        aria-label="Alternar modo escuro"
      />
      
      <div className="flex items-center gap-1 sm:gap-2 min-w-0">
        <span className="text-xs sm:text-sm font-nunito text-muted-foreground hidden xs:inline">Escuro</span>
        <Moon className="h-3 w-3 sm:h-4 sm:w-4 text-slate-400 shrink-0" />
      </div>
    </div>
  );
};
