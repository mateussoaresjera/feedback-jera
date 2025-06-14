
import { useState } from 'react';

// Define the feedback data type to match what FeedbackCard expects
export interface FeedbackItem {
  id: string;
  type: 'given' | 'received';  // This ensures type is strictly 'given' or 'received'
  recipient?: string;
  sender?: string;
  feedbackType: string;
  categories: string[];
  message: string;
  date: string;
  anonymous?: boolean;
}

// Mock data for demonstration
const mockFeedbackData: FeedbackItem[] = [
  {
    id: '1',
    type: 'received',  // Now explicitly typed as a literal
    sender: 'Sarah Johnson',
    feedbackType: 'positive',
    categories: ['teamwork', 'communication'],
    message: 'Great job leading the project retrospective! Your facilitation skills really helped the team identify key improvements and action items.',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    anonymous: false
  },
  {
    id: '2',
    type: 'given',  // Now explicitly typed as a literal
    recipient: 'Mike Chen',
    feedbackType: 'constructive',
    categories: ['innovation', 'problem-solving'],
    message: 'Your creative approach to solving the API integration challenge was impressive. Consider documenting your thought process to help others learn from your methodology.',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    anonymous: false
  },
  {
    id: '3',
    type: 'received',  // Now explicitly typed as a literal
    sender: 'Anonymous',
    feedbackType: 'appreciation',
    categories: ['mentorship', 'leadership'],
    message: 'Thank you for always being available to answer questions and provide guidance. Your mentorship has been invaluable to my growth.',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    anonymous: true
  },
  {
    id: '4',
    type: 'given',  // Now explicitly typed as a literal
    recipient: 'Lisa Rodriguez',
    feedbackType: 'positive',
    categories: ['creativity', 'innovation'],
    message: 'The user interface designs you created for the mobile app are outstanding. The user flow is intuitive and the visual design is both modern and accessible.',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    anonymous: false
  },
  {
    id: '5',
    type: 'received',  // Now explicitly typed as a literal
    sender: 'David Kim',
    feedbackType: 'suggestion',
    categories: ['communication'],
    message: 'Your technical knowledge is excellent. To maximize impact, consider presenting complex topics with more visual aids or examples for stakeholders.',
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    anonymous: false
  }
];

export const useFeedbackData = () => {
  const [feedbackData, setFeedbackData] = useState<FeedbackItem[]>(mockFeedbackData);

  const addFeedback = (newFeedback: FeedbackItem) => {
    setFeedbackData(prev => [newFeedback, ...prev]);
  };

  return {
    feedbackData,
    addFeedback
  };
};
