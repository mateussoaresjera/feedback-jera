
import { useState } from "react";
import { Plus, MessageSquare, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeedbackForm } from "@/components/FeedbackForm";
import { FeedbackHistory } from "@/components/FeedbackHistory";
import { FeedbackCard } from "@/components/FeedbackCard";
import { useFeedbackData } from "@/hooks/useFeedbackData";

const Index = () => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Feedback Hub</h1>
            <p className="text-gray-600">Building a culture of continuous growth and improvement</p>
          </div>
          <Button 
            onClick={() => setShowFeedbackForm(true)}
            className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Give Feedback
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Feedback Given</CardTitle>
              <MessageSquare className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.given}</div>
              <p className="text-xs text-gray-600">Total feedback shared</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Feedback Received</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.received}</div>
              <p className="text-xs text-gray-600">Growth opportunities</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.thisWeek}</div>
              <p className="text-xs text-gray-600">Recent activity</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Feedback */}
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Recent Feedback</CardTitle>
                <CardDescription>Your latest feedback interactions</CardDescription>
              </CardHeader>
              <CardContent>
                {recentFeedback.length > 0 ? (
                  <div className="space-y-4">
                    {recentFeedback.map((feedback) => (
                      <FeedbackCard key={feedback.id} feedback={feedback} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No feedback yet. Start building your feedback culture!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common feedback categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setShowFeedbackForm(true)}
                  >
                    <Badge variant="secondary" className="mr-2 bg-blue-100 text-blue-700">Teamwork</Badge>
                    Give teamwork feedback
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setShowFeedbackForm(true)}
                  >
                    <Badge variant="secondary" className="mr-2 bg-green-100 text-green-700">Communication</Badge>
                    Share communication feedback
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setShowFeedbackForm(true)}
                  >
                    <Badge variant="secondary" className="mr-2 bg-purple-100 text-purple-700">Innovation</Badge>
                    Highlight innovation
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => setShowFeedbackForm(true)}
                  >
                    <Badge variant="secondary" className="mr-2 bg-orange-100 text-orange-700">Leadership</Badge>
                    Give leadership feedback
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6">
              <Tabs defaultValue="history" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                <TabsContent value="history">
                  <FeedbackHistory feedbackData={feedbackData} />
                </TabsContent>
                <TabsContent value="analytics">
                  <Card className="bg-white shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-sm">Feedback Trends</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-4 text-gray-500 text-sm">
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
            onClose={() => setShowFeedbackForm(false)}
            onSubmit={addFeedback}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
