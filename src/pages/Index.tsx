
import { useState } from "react";
import { Plus, MessageSquare, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeedbackForm } from "@/components/FeedbackForm";
import { FeedbackHistory } from "@/components/FeedbackHistory";
import { FeedbackCard } from "@/components/FeedbackCard";
import { FeedbackDetail } from "@/components/FeedbackDetail";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { UserAvatar } from "@/components/UserAvatar";
import { useFeedbackData, FeedbackItem } from "@/hooks/useFeedbackData";

const Index = () => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);
  const [preSelectedCategory, setPreSelectedCategory] = useState<string | undefined>();
  const { feedbackData, addFeedback } = useFeedbackData();

  const stats = {
    given: feedbackData.filter(f => f.type === 'given').length,
    received: feedbackData.filter(f => f.type === 'received').length,
    thisWeek: feedbackData.filter(f => {
      const feedbackDate = new Date(f.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return feedbackDate > weekAgo;
    }).length
  };

  const recentFeedback = feedbackData
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const openFeedbackForm = (category?: string) => {
    setPreSelectedCategory(category);
    setShowFeedbackForm(true);
  };

  const closeFeedbackForm = () => {
    setShowFeedbackForm(false);
    setPreSelectedCategory(undefined);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        {/* Header with improved mobile spacing */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-8 gap-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative">
              {/* Logo with dynamic text color */}
              <img 
                src="https://jera.com.br/images/logo-jera-light.svg" 
                alt="Jera Logo" 
                className="h-6 sm:h-8 w-auto"
              />
              {/* Dynamic colored text overlay for "Jera" */}
              <span 
                className="absolute left-0 top-0 h-6 sm:h-8 flex items-center text-[#111111] dark:text-[#F5F5F5] font-bold text-sm sm:text-base"
                style={{ 
                  fontFamily: 'Arial, sans-serif',
                  paddingLeft: '0.1em',
                  fontSize: '1.1em',
                  lineHeight: '1'
                }}
              >
                Jera
              </span>
            </div>
            <div className="hidden sm:block w-px h-4 sm:h-6 bg-border"></div>
            <div className="hidden lg:block">
              <p className="text-muted-foreground font-nunito text-xs sm:text-sm">Construindo uma cultura de crescimento contínuo e melhoria</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto justify-end">
            <DarkModeToggle />
            <UserAvatar />
          </div>
        </div>

        {/* Stats Cards with improved mobile layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 mb-4 sm:mb-8">
          <Card className="bg-card shadow-sm rounded-xl p-3 sm:p-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-montserrat">Feedback Dado</CardTitle>
              <MessageSquare className="h-4 w-4 text-shamrock" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-xl sm:text-2xl font-bold text-shamrock font-montserrat">{stats.given}</div>
              <p className="text-xs text-muted-foreground font-nunito mt-1">Total de feedback compartilhado</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card shadow-sm rounded-xl p-3 sm:p-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-montserrat">Feedback Recebido</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-xl sm:text-2xl font-bold text-blue-600 font-montserrat">{stats.received}</div>
              <p className="text-xs text-muted-foreground font-nunito mt-1">Oportunidades de crescimento</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card shadow-sm rounded-xl p-3 sm:p-4 sm:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-montserrat">Esta Semana</CardTitle>
              <TrendingUp className="h-4 w-4 text-heliotrope" />
            </CardHeader>
            <CardContent className="pt-2">
              <div className="text-xl sm:text-2xl font-bold text-heliotrope font-montserrat">{stats.thisWeek}</div>
              <p className="text-xs text-muted-foreground font-nunito mt-1">Atividade recente</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content with improved mobile layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Recent Feedback */}
          <div className="lg:col-span-2">
            <Card className="bg-card shadow-sm rounded-xl p-3 sm:p-4">
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 gap-3">
                <div>
                  <CardTitle className="font-montserrat">Feedback Recente</CardTitle>
                  <CardDescription className="font-nunito mt-1">Suas interações de feedback mais recentes</CardDescription>
                </div>
                <Button 
                  onClick={() => openFeedbackForm()}
                  className="bg-shamrock hover:bg-shamrock/90 rounded-lg font-nunito focus-visible:ring-shamrock px-3 sm:px-4 py-2 w-full sm:w-auto"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Dar Feedback
                </Button>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                {recentFeedback.length > 0 ? (
                  <div className="space-y-3 sm:space-y-4">
                    {recentFeedback.map((feedback) => (
                      <FeedbackCard 
                        key={feedback.id} 
                        feedback={feedback} 
                        onClick={() => setSelectedFeedback(feedback)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 sm:py-12 text-muted-foreground">
                    <MessageSquare className="w-8 sm:w-12 h-8 sm:h-12 mx-auto mb-4 text-muted-foreground/50" />
                    <p className="font-nunito text-sm sm:text-base">Nenhum feedback ainda. Comece a construir sua cultura de feedback!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4 sm:space-y-6">
            <Card className="bg-card shadow-sm rounded-xl p-3 sm:p-4">
              <CardHeader className="p-3 sm:p-4">
                <CardTitle className="font-montserrat">Ações Rápidas</CardTitle>
                <CardDescription className="font-nunito mt-1">Categorias comuns de feedback</CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="space-y-2 sm:space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start rounded-lg font-nunito focus-visible:ring-shamrock h-auto min-h-[3rem] px-3 sm:px-4 py-2"
                    onClick={() => openFeedbackForm('teamwork')}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 w-full">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-nunito shrink-0 text-xs">Trabalho em Equipe</Badge>
                      <span className="flex-1 text-left text-sm truncate">Dar feedback de equipe</span>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start rounded-lg font-nunito focus-visible:ring-shamrock h-auto min-h-[3rem] px-3 sm:px-4 py-2"
                    onClick={() => openFeedbackForm('communication')}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 w-full">
                      <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 font-nunito shrink-0 text-xs">Comunicação</Badge>
                      <span className="flex-1 text-left text-sm truncate">Feedback de comunicação</span>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start rounded-lg font-nunito focus-visible:ring-shamrock h-auto min-h-[3rem] px-3 sm:px-4 py-2"
                    onClick={() => openFeedbackForm('innovation')}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 w-full">
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 font-nunito shrink-0 text-xs">Inovação</Badge>
                      <span className="flex-1 text-left text-sm truncate">Destacar inovação</span>
                    </div>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start rounded-lg font-nunito focus-visible:ring-shamrock h-auto min-h-[3rem] px-3 sm:px-4 py-2"
                    onClick={() => openFeedbackForm('leadership')}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 w-full">
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 font-nunito shrink-0 text-xs">Liderança</Badge>
                      <span className="flex-1 text-left text-sm truncate">Feedback de liderança</span>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div>
              <Tabs defaultValue="history" className="w-full">
                <TabsList className="grid w-full grid-cols-2 rounded-lg h-9 sm:h-10">
                  <TabsTrigger value="history" className="font-nunito text-sm">Histórico</TabsTrigger>
                  <TabsTrigger value="analytics" className="font-nunito text-sm">Análises</TabsTrigger>
                </TabsList>
                <TabsContent value="history" className="mt-3 sm:mt-4">
                  <FeedbackHistory 
                    feedbackData={feedbackData} 
                    onFeedbackClick={setSelectedFeedback}
                  />
                </TabsContent>
                <TabsContent value="analytics" className="mt-3 sm:mt-4">
                  <Card className="bg-card shadow-sm rounded-xl p-3 sm:p-4">
                    <CardHeader className="p-3 sm:p-4">
                      <CardTitle className="text-sm font-montserrat">Tendências de Feedback</CardTitle>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 pt-0">
                      <div className="text-center py-6 sm:py-8 text-muted-foreground text-sm font-nunito">
                        Análises em breve...
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Feedback Form Modal */}
        {showFeedbackForm && (
          <FeedbackForm 
            onClose={closeFeedbackForm}
            onSubmit={addFeedback}
            preSelectedCategory={preSelectedCategory}
          />
        )}

        {/* Feedback Detail Modal */}
        {selectedFeedback && (
          <FeedbackDetail
            feedback={selectedFeedback}
            onClose={() => setSelectedFeedback(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
