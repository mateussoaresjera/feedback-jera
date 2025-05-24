
import { useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FeedbackCard } from "./FeedbackCard";
import { FeedbackItem } from "@/hooks/useFeedbackData";

interface FeedbackHistoryProps {
  feedbackData: FeedbackItem[];
  onFeedbackClick?: (feedback: FeedbackItem) => void;
}

export const FeedbackHistory = ({ feedbackData, onFeedbackClick }: FeedbackHistoryProps) => {
  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFeedback = feedbackData.filter(feedback => {
    const matchesType = filter === 'all' || feedback.type === filter;
    const matchesCategory = categoryFilter === 'all' || feedback.categories.includes(categoryFilter);
    const matchesSearch = searchTerm === '' || 
      feedback.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (feedback.recipient && feedback.recipient.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (feedback.sender && feedback.sender.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesType && matchesCategory && matchesSearch;
  });

  const allCategories = Array.from(new Set(feedbackData.flatMap(f => f.categories)));

  return (
    <Card className="bg-card shadow-sm rounded-xl">
      <CardHeader>
        <CardTitle className="text-lg font-montserrat">Feedback History</CardTitle>
        
        {/* Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search feedback..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-9 rounded-lg focus-visible:ring-shamrock font-nunito"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="h-9 text-sm rounded-lg focus-visible:ring-shamrock">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="given">Given</SelectItem>
                <SelectItem value="received">Received</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-9 text-sm rounded-lg focus-visible:ring-shamrock">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {allCategories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredFeedback.length > 0 ? (
            filteredFeedback
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((feedback) => (
                <FeedbackCard 
                  key={feedback.id} 
                  feedback={feedback} 
                  onClick={onFeedbackClick ? () => onFeedbackClick(feedback) : undefined}
                />
              ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm font-nunito">No feedback matches your filters.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
