
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
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div className="flex items-center gap-4">
            <img 
              src="https://jera.com.br/images/logo-jera-light.svg" 
              alt="Jera Logo" 
              className="h-8 w-auto"
            />
            <div>
              <p className="text-muted-foreground font-nunito">Building a culture of continuous growth and improvement</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <DarkModeToggle />
            <UserAvatar />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-card shadow-sm rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-montserrat">Feedback Given</CardTitle>
              <MessageSquare className="h-4 w-4 text-shamrock" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-shamrock font-montserrat">{stats.given}</div>
              <p className="text-xs text-muted-foreground font-nunito">Total feedback shared</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card shadow-sm rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-montserrat">Feedback Received</CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600 font-montserrat">{stats.received}</div>
              <p className="text-xs text-muted-foreground font-nunito">Growth opportunities</p>
            </CardContent>
          </Card>
          
          <Card className="bg-card shadow-sm rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium font-montserrat">This Week</CardTitle>
              <TrendingUp className="h-4 w-4 text-heliotrope" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-heliotrope font-montserrat">{stats.thisWeek}</div>
              <p className="text-xs text-muted-foreground font-nunito">Recent activity</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Feedback */}
          <div className="lg:col-span-2">
            <Card className="bg-card shadow-sm rounded-xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="font-montserrat">Recent Feedback</CardTitle>
                  <CardDescription className="font-nunito">Your latest feedback interactions</CardDescription>
                </div>
                <Button 
                  onClick={() => openFeedbackForm()}
                  className="bg-shamrock hover:bg-shamrock/90 rounded-lg font-nunito focus-visible:ring-shamrock"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Give Feedback
                </Button>
              </CardHeader>
              <CardContent>
                {recentFeedback.length > 0 ? (
                  <div className="space-y-4">
                    {recentFeedback.map((feedback) => (
                      <FeedbackCard 
                        key={feedback.id} 
                        feedback={feedback} 
                        onClick={() => setSelectedFeedback(feedback)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted-foreground/50" />
                    <p className="font-nunito">No feedback yet. Start building your feedback culture!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="bg-card shadow-sm rounded-xl">
              <CardHeader>
                <CardTitle className="font-montserrat">Quick Actions</CardTitle>
                <CardDescription className="font-nunito">Common feedback categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start rounded-lg font-nunito focus-visible:ring-shamrock"
                    onClick={() => openFeedbackForm('teamwork')}
                  >
                    <Badge variant="secondary" className="mr-3 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 font-nunito">Teamwork</Badge>
                    <span className="flex-1 text-left">Give teamwork feedback</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start rounded-lg font-nunito focus-visible:ring-shamrock"
                    onClick={() => openFeedbackForm('communication')}
                  >
                    <Badge variant="secondary" className="mr-3 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 font-nunito">Communication</Badge>
                    <span className="flex-1 text-left">Share communication feedback</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start rounded-lg font-nunito focus-visible:ring-shamrock"
                    onClick={() => openFeedbackForm('innovation')}
                  >
                    <Badge variant="secondary" className="mr-3 bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 font-nunito">Innovation</Badge>
                    <span className="flex-1 text-left">Highlight innovation</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start rounded-lg font-nunito focus-visible:ring-shamrock"
                    onClick={() => openFeedbackForm('leadership')}
                  >
                    <Badge variant="secondary" className="mr-3 bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 font-nunito">Leadership</Badge>
                    <span className="flex-1 text-left">Give leadership feedback</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6">
              <Tabs defaultValue="history" className="w-full">
                <TabsList className="grid w-full grid-cols-2 rounded-lg">
                  <TabsTrigger value="history" className="font-nunito">History</TabsTrigger>
                  <TabsTrigger value="analytics" className="font-nunito">Analytics</TabsTrigger>
                </TabsList>
                <TabsContent value="history">
                  <FeedbackHistory 
                    feedbackData={feedbackData} 
                    onFeedbackClick={setSelectedFeedback}
                  />
                </TabsContent>
                <TabsContent value="analytics">
                  <Card className="bg-card shadow-sm rounded-xl">
                    <CardHeader>
                      <CardTitle className="text-sm font-montserrat">Feedback Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-4 text-muted-foreground text-sm font-nunito">
                        Analytics coming soon...
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
