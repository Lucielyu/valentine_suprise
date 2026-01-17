import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface EnvelopeRevealProps {
  partnerName: string;
  yourName: string;
}

const EnvelopeReveal = ({ partnerName, yourName }: EnvelopeRevealProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsOpen(true), 500);
    const timer2 = setTimeout(() => setShowLetter(true), 1500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8">
      <div className="relative w-full max-w-md">
        {/* Envelope */}
        <div className="envelope relative w-full aspect-[4/3] rounded-lg overflow-hidden">
          {/* Envelope flap */}
          <div
            className={`absolute top-0 left-0 w-full h-1/2 origin-top transition-transform duration-1000 ease-out z-10 ${
              isOpen ? 'rotate-x-180' : ''
            }`}
            style={{
              background: 'linear-gradient(180deg, hsl(350 70% 80%) 0%, hsl(350 60% 85%) 100%)',
              clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
              transformStyle: 'preserve-3d',
              transform: isOpen ? 'rotateX(180deg)' : 'rotateX(0deg)',
            }}
          />
          
          {/* Envelope body */}
          <div
            className="absolute bottom-0 left-0 w-full h-3/4 rounded-b-lg"
            style={{
              background: 'linear-gradient(180deg, hsl(350 65% 88%) 0%, hsl(350 60% 82%) 100%)',
            }}
          />

          {/* Heart seal */}
          <div
            className={`absolute top-1/4 left-1/2 -translate-x-1/2 z-20 transition-all duration-500 ${
              isOpen ? 'opacity-0 scale-150' : 'opacity-100'
            }`}
          >
            <Heart className="w-12 h-12 text-love-red fill-love-red animate-heart-beat" />
          </div>
        </div>

        {/* Letter */}
        <div
          className={`letter-paper absolute top-1/2 left-1/2 -translate-x-1/2 w-[90%] rounded-lg p-6 md:p-8 transition-all duration-1000 ${
            showLetter ? 'opacity-100 -translate-y-[120%]' : 'opacity-0 translate-y-0'
          }`}
          style={{
            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.2)',
          }}
        >
          <div className="letter-text space-y-4 text-center">
            <p className="text-2xl md:text-3xl font-bold text-rose-dark">
              Dear {partnerName},
            </p>
            <p className="text-lg md:text-xl leading-relaxed">
              You get more and more beautiful with each passing day, every moment spent with you feels like moments that I don't want to end.
            </p>
            <p className="text-lg md:text-xl leading-relaxed">
              I love you endlessly and to many more years to come.
            </p>
            <p className="text-lg md:text-xl leading-relaxed">
              Thank you for being my Valentine this year, and many more.
            </p>
            <p className="text-lg md:text-xl font-semibold text-rose">
              Dinner reservation has been set for the evening of February 14th.
            </p>
            <div className="pt-4">
              <p className="text-xl md:text-2xl italic">Your Love,</p>
              <p className="text-2xl md:text-3xl font-bold text-rose-dark">{yourName}</p>
            </div>
            <div className="flex justify-center pt-4">
              <Heart className="w-8 h-8 text-love-red fill-love-red animate-heart-beat" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvelopeReveal;
