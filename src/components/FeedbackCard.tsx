
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, ArrowRight, ArrowLeft } from "lucide-react";

interface FeedbackCardProps {
  feedback: {
    id: string;
    type: 'given' | 'received';
    recipient?: string;
    sender?: string;
    feedbackType: string;
    categories: string[];
    message: string;
    date: string;
    anonymous?: boolean;
  };
}

const categoryColors: Record<string, string> = {
  teamwork: 'bg-blue-100 text-blue-700',
  communication: 'bg-green-100 text-green-700',
  innovation: 'bg-purple-100 text-purple-700',
  leadership: 'bg-orange-100 text-orange-700',
  'problem-solving': 'bg-red-100 text-red-700',
  mentorship: 'bg-indigo-100 text-indigo-700',
  creativity: 'bg-pink-100 text-pink-700',
  reliability: 'bg-teal-100 text-teal-700'
};

const feedbackTypeLabels: Record<string, string> = {
  positive: 'Positive Recognition',
  constructive: 'Constructive Feedback',
  appreciation: 'Appreciation',
  suggestion: 'Suggestion'
};

export const FeedbackCard = ({ feedback }: FeedbackCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isGiven = feedback.type === 'given';

  return (
    <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {isGiven ? (
              <ArrowRight className="w-4 h-4 text-blue-600" />
            ) : (
              <ArrowLeft className="w-4 h-4 text-green-600" />
            )}
            <div>
              <div className="font-medium text-sm">
                {isGiven ? `To: ${feedback.recipient}` : `From: ${feedback.sender || 'Anonymous'}`}
              </div>
              <div className="text-xs text-gray-500">
                {feedbackTypeLabels[feedback.feedbackType]} • {formatDate(feedback.date)}
              </div>
            </div>
          </div>
          <MessageSquare className="w-4 h-4 text-gray-400" />
        </div>

        {/* Categories */}
        {feedback.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {feedback.categories.map((category) => (
              <Badge 
                key={category} 
                variant="secondary"
                className={`text-xs ${categoryColors[category] || 'bg-gray-100 text-gray-700'}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              </Badge>
            ))}
          </div>
        )}

        {/* Message */}
        <p className="text-sm text-gray-700 leading-relaxed">
          {feedback.message.length > 150 
            ? `${feedback.message.substring(0, 150)}...` 
            : feedback.message
          }
        </p>
      </CardContent>
    </Card>
  );
};
