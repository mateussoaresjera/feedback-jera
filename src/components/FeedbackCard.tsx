
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
  onClick?: () => void;
}

const categoryColors: Record<string, string> = {
  teamwork: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  communication: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  innovation: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  leadership: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  'problem-solving': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  mentorship: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  creativity: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  reliability: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300'
};

const feedbackTypeLabels: Record<string, string> = {
  positive: 'Positive Recognition',
  constructive: 'Constructive Feedback',
  appreciation: 'Appreciation',
  suggestion: 'Suggestion'
};

export const FeedbackCard = ({ feedback, onClick }: FeedbackCardProps) => {
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
    <Card 
      className={`border-l-4 border-l-shamrock rounded-xl hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-shamrock focus-visible:ring-offset-2 ${onClick ? 'hover:bg-muted/30' : ''}`}
      onClick={onClick}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {isGiven ? (
              <ArrowRight className="w-4 h-4 text-shamrock" />
            ) : (
              <ArrowLeft className="w-4 h-4 text-blue-600" />
            )}
            <div>
              <div className="font-medium text-sm font-nunito">
                {isGiven ? `To: ${feedback.recipient}` : `From: ${feedback.sender || 'Anonymous'}`}
              </div>
              <div className="text-xs text-muted-foreground font-nunito">
                {feedbackTypeLabels[feedback.feedbackType]} • {formatDate(feedback.date)}
              </div>
            </div>
          </div>
          <MessageSquare className="w-4 h-4 text-muted-foreground" />
        </div>

        {/* Categories */}
        {feedback.categories.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {feedback.categories.map((category) => (
              <Badge 
                key={category} 
                variant="secondary"
                className={`text-xs rounded-md ${categoryColors[category] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              </Badge>
            ))}
          </div>
        )}

        {/* Message */}
        <p className="text-sm text-foreground leading-relaxed font-nunito">
          {feedback.message.length > 150 
            ? `${feedback.message.substring(0, 150)}...` 
            : feedback.message
          }
        </p>
      </CardContent>
    </Card>
  );
};
