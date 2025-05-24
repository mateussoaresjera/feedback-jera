
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FeedbackItem } from '@/hooks/useFeedbackData';

interface FeedbackDetailProps {
  feedback: FeedbackItem;
  onClose: () => void;
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

export const FeedbackDetail = ({ feedback, onClose }: FeedbackDetailProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isGiven = feedback.type === 'given';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-3">
            {isGiven ? (
              <ArrowRight className="w-5 h-5 text-shamrock" />
            ) : (
              <ArrowLeft className="w-5 h-5 text-blue-600" />
            )}
            <div>
              <CardTitle className="font-montserrat">
                {isGiven ? 'Feedback Given' : 'Feedback Received'}
              </CardTitle>
              <p className="text-sm text-muted-foreground font-nunito">
                {feedbackTypeLabels[feedback.feedbackType]}
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className="focus-visible:ring-2 focus-visible:ring-shamrock"
          >
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Participant Info */}
          <div className="space-y-2">
            <h3 className="font-montserrat font-medium text-sm text-muted-foreground">
              {isGiven ? 'Recipient' : 'Sender'}
            </h3>
            <p className="font-nunito">
              {isGiven ? feedback.recipient : (feedback.sender || 'Anonymous')}
            </p>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <h3 className="font-montserrat font-medium text-sm text-muted-foreground">Date</h3>
            <p className="font-nunito text-sm">{formatDate(feedback.date)}</p>
          </div>

          {/* Categories */}
          {feedback.categories.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-montserrat font-medium text-sm text-muted-foreground">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {feedback.categories.map((category) => (
                  <Badge 
                    key={category} 
                    variant="secondary"
                    className={`text-xs ${categoryColors[category] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Message */}
          <div className="space-y-2">
            <h3 className="font-montserrat font-medium text-sm text-muted-foreground">Message</h3>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="font-nunito text-sm leading-relaxed whitespace-pre-wrap">
                {feedback.message}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
