import { ReactNode } from 'react';

interface QuestionCardProps {
  question: string;
  image: ReactNode;
  buttons: ReactNode;
}

const QuestionCard = ({ question, image, buttons }: QuestionCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 animate-fade-in">
      <div className="text-center max-w-lg mx-auto">
        <h1 className="question-text mb-8 animate-bounce-gentle">
          {question}
        </h1>
        
        <div className="cat-container mb-10 animate-float">
          {image}
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-6">
          {buttons}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
