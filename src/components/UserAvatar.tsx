
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { User, LogOut } from 'lucide-react';

export const UserAvatar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const username = "João Silva"; // This would come from your auth system

  const handleLogout = () => {
    // Add logout logic here
    console.log('Fazendo logout...');
    setShowPopup(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setShowPopup(!showPopup)}
        className="flex items-center gap-3 px-3 py-2 h-auto focus-visible:ring-2 focus-visible:ring-shamrock focus-visible:ring-offset-2 rounded-lg"
      >
        <div className="w-8 h-8 bg-shamrock rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-nunito">Olá, {username}</span>
      </Button>

      {showPopup && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowPopup(false)}
          />
          <Card className="absolute top-full right-0 mt-2 w-48 z-50 shadow-lg rounded-xl">
            <CardContent className="p-3">
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="w-full justify-start text-left p-3 h-auto hover:bg-red-50 dark:hover:bg-red-900/20 focus-visible:ring-2 focus-visible:ring-red-500 rounded-lg"
              >
                <LogOut className="w-4 h-4 mr-3" />
                <span className="text-sm font-nunito">Sair</span>
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
