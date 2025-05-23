
import { useState } from "react";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

interface FeedbackFormProps {
  onClose: () => void;
  onSubmit: (feedback: any) => void;
}

const categories = [
  { id: 'teamwork', label: 'Teamwork', color: 'bg-blue-100 text-blue-700' },
  { id: 'communication', label: 'Communication', color: 'bg-green-100 text-green-700' },
  { id: 'innovation', label: 'Innovation', color: 'bg-purple-100 text-purple-700' },
  { id: 'leadership', label: 'Leadership', color: 'bg-orange-100 text-orange-700' },
  { id: 'problem-solving', label: 'Problem Solving', color: 'bg-red-100 text-red-700' },
  { id: 'mentorship', label: 'Mentorship', color: 'bg-indigo-100 text-indigo-700' },
  { id: 'creativity', label: 'Creativity', color: 'bg-pink-100 text-pink-700' },
  { id: 'reliability', label: 'Reliability', color: 'bg-teal-100 text-teal-700' }
];

const feedbackTypes = [
  { id: 'positive', label: 'Positive Recognition', description: 'Highlight great work and achievements' },
  { id: 'constructive', label: 'Constructive Feedback', description: 'Share growth opportunities' },
  { id: 'appreciation', label: 'Appreciation', description: 'Express gratitude and thanks' },
  { id: 'suggestion', label: 'Suggestion', description: 'Propose ideas for improvement' }
];

export const FeedbackForm = ({ onClose, onSubmit }: FeedbackFormProps) => {
  const [formData, setFormData] = useState({
    recipient: '',
    type: '',
    categories: [] as string[],
    message: '',
    anonymous: false
  });

  const toggleCategory = (categoryId: string) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.recipient || !formData.type || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const newFeedback = {
      id: Date.now().toString(),
      type: 'given',
      recipient: formData.recipient,
      feedbackType: formData.type,
      categories: formData.categories,
      message: formData.message,
      date: new Date().toISOString(),
      anonymous: formData.anonymous
    };

    onSubmit(newFeedback);
    
    toast({
      title: "Feedback Sent!",
      description: `Your feedback has been sent to ${formData.recipient}.`
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle>Give Feedback</CardTitle>
            <CardDescription>Share constructive feedback to help your colleague grow</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Recipient */}
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient *</Label>
              <Input
                id="recipient"
                placeholder="Enter colleague's name or email"
                value={formData.recipient}
                onChange={(e) => setFormData(prev => ({ ...prev, recipient: e.target.value }))}
                className="w-full"
              />
            </div>

            {/* Feedback Type */}
            <div className="space-y-2">
              <Label>Feedback Type *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select feedback type" />
                </SelectTrigger>
                <SelectContent>
                  {feedbackTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      <div>
                        <div className="font-medium">{type.label}</div>
                        <div className="text-sm text-gray-500">{type.description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Categories */}
            <div className="space-y-2">
              <Label>Categories (Optional)</Label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category.id}
                    variant={formData.categories.includes(category.id) ? "default" : "outline"}
                    className={`cursor-pointer transition-all hover:scale-105 ${
                      formData.categories.includes(category.id) ? category.color : 'hover:bg-gray-100'
                    }`}
                    onClick={() => toggleCategory(category.id)}
                  >
                    {category.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message">Feedback Message *</Label>
              <Textarea
                id="message"
                placeholder="Share your specific, actionable feedback..."
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="min-h-32 resize-none"
              />
              <p className="text-sm text-gray-500">
                Be specific, actionable, and constructive. Focus on behaviors and impact.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4 mr-2" />
                Send Feedback
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
