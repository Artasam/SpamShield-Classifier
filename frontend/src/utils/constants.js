// API constants
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// App info
export const APP_NAME = 'SpamShield AI';
export const APP_TAGLINE = 'Intelligent Spam Detection Powered by Machine Learning';
export const APP_DESCRIPTION = 'Analyze emails and SMS messages in real-time with our advanced ML classifier. Get instant spam/ham classification with confidence scoring.';

// Feature cards data
export const FEATURES = [
  {
    icon: 'Zap',
    title: 'Real-Time Analysis',
    description: 'Get instant spam classification results in milliseconds. No waiting, no delays.',
  },
  {
    icon: 'Brain',
    title: 'ML-Powered',
    description: 'Trained on 5,500+ messages using advanced NLP and machine learning algorithms.',
  },
  {
    icon: 'Shield',
    title: 'High Accuracy',
    description: 'Industry-leading precision with confidence scoring for every prediction.',
  },
  {
    icon: 'Lock',
    title: 'Privacy First',
    description: 'Your messages are never stored. Analysis happens in real-time and data is discarded.',
  },
  {
    icon: 'BarChart3',
    title: 'Confidence Scoring',
    description: 'Every classification comes with a confidence percentage so you know how certain the model is.',
  },
  {
    icon: 'History',
    title: 'Prediction History',
    description: 'Track your past analyses locally in your browser. Clear anytime.',
  },
];

// Sample messages for demo
export const SAMPLE_MESSAGES = {
  spam: [
    "WINNER!! As a valued customer, you have been selected to receive a £900 prize reward! Call 09061701461 to claim.",
    "Free entry in 2 a weekly competition to win FA Cup final tickets. Text FA to 87121 to receive entry.",
    "Congratulations! You've won $1,000,000! Send your bank details to claim your prize now!!!",
  ],
  ham: [
    "Hey, are we still meeting for lunch tomorrow at the usual place?",
    "Just wanted to let you know the meeting has been moved to 3pm. See you there!",
    "Can you pick up some milk on your way home? Thanks!",
  ],
};
