
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
  positive: 'Reconhecimento Positivo',
  constructive: 'Feedback Construtivo',
  appreciation: 'Apreciação',
  suggestion: 'Sugestão'
};

const categoryLabels: Record<string, string> = {
  teamwork: 'Trabalho em Equipe',
  communication: 'Comunicação',
  innovation: 'Inovação',
  leadership: 'Liderança',
  'problem-solving': 'Resolução de Problemas',
  mentorship: 'Mentoria',
  creativity: 'Criatividade',
  reliability: 'Confiabilidade'
};

export const FeedbackDetail = ({ feedback, onClose }: FeedbackDetailProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4-grid z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4-grid p-4-grid">
          <div className="flex items-center gap-4-grid">
            {isGiven ? (
              <ArrowRight className="w-5 h-5 text-shamrock" />
            ) : (
              <ArrowLeft className="w-5 h-5 text-blue-600" />
            )}
            <div>
              <CardTitle className="font-montserrat">
                {isGiven ? 'Feedback Dado' : 'Feedback Recebido'}
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
        
        <CardContent className="spacing-8 p-4-grid">
          {/* Participant Info */}
          <div className="spacing-4">
            <h3 className="font-montserrat font-medium text-sm text-muted-foreground">
              {isGiven ? 'Destinatário' : 'Remetente'}
            </h3>
            <p className="font-nunito">
              {isGiven ? feedback.recipient : (feedback.sender || 'Anônimo')}
            </p>
          </div>

          {/* Date */}
          <div className="spacing-4">
            <h3 className="font-montserrat font-medium text-sm text-muted-foreground">Data</h3>
            <p className="font-nunito text-sm">{formatDate(feedback.date)}</p>
          </div>

          {/* Categories */}
          {feedback.categories.length > 0 && (
            <div className="spacing-4">
              <h3 className="font-montserrat font-medium text-sm text-muted-foreground">Categorias</h3>
              <div className="flex flex-wrap gap-4-grid">
                {feedback.categories.map((category) => (
                  <Badge 
                    key={category} 
                    variant="secondary"
                    className={`text-xs rounded-md ${categoryColors[category] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'}`}
                  >
                    {categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Message */}
          <div className="spacing-4">
            <h3 className="font-montserrat font-medium text-sm text-muted-foreground">Mensagem</h3>
            <div className="bg-muted/50 rounded-lg p-4-grid">
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
