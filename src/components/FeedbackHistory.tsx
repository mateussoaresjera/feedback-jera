
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
      <CardHeader className="p-4-grid">
        <CardTitle className="text-lg font-montserrat">Histórico de Feedback</CardTitle>
        
        {/* Filters */}
        <div className="spacing-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar feedback..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-9 rounded-lg focus-visible:ring-shamrock font-nunito"
            />
          </div>
          
          <div className="flex gap-4-grid">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="h-9 text-sm rounded-lg focus-visible:ring-shamrock">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Tipos</SelectItem>
                <SelectItem value="given">Dados</SelectItem>
                <SelectItem value="received">Recebidos</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-9 text-sm rounded-lg focus-visible:ring-shamrock">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Categorias</SelectItem>
                {allCategories.map(category => (
                  <SelectItem key={category} value={category}>
                    {categoryLabels[category] || category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4-grid">
        <div className="spacing-4 max-h-96 overflow-y-auto">
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
            <div className="text-center py-8-grid text-muted-foreground">
              <p className="text-sm font-nunito">Nenhum feedback corresponde aos seus filtros.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
