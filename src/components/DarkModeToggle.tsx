
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
    <div className="flex items-center gap-3 bg-muted/50 rounded-lg px-3 py-2">
      <div className="flex items-center gap-2">
        <Sun className="h-4 w-4 text-amber-500" />
        <span className="text-sm font-nunito text-muted-foreground">Claro</span>
      </div>
      
      <Switch
        checked={isDark}
        onCheckedChange={toggleDarkMode}
        className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground/30"
        aria-label="Alternar modo escuro"
      />
      
      <div className="flex items-center gap-2">
        <span className="text-sm font-nunito text-muted-foreground">Escuro</span>
        <Moon className="h-4 w-4 text-slate-400" />
      </div>
    </div>
  );
};
