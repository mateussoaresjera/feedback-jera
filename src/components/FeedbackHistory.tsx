
import { useState } from "react";
import { Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FeedbackCard } from "./FeedbackCard";

interface FeedbackHistoryProps {
  feedbackData: any[];
}

export const FeedbackHistory = ({ feedbackData }: FeedbackHistoryProps) => {
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
    <Card className="bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Feedback History</CardTitle>
        
        {/* Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search feedback..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-9"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="given">Given</SelectItem>
                <SelectItem value="received">Received</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-9 text-sm">
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
                <FeedbackCard key={feedback.id} feedback={feedback} />
              ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p className="text-sm">No feedback matches your filters.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
