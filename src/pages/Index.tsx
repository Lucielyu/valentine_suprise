import { useState, useRef, useEffect } from 'react';
import FallingHearts from '@/components/FallingHearts';
import MuteButton from '@/components/MuteButton';
import QuestionCard from '@/components/QuestionCard';
import RunawayButton from '@/components/RunawayButton';
import GrowingYesButton from '@/components/GrowingYesButton';
import ShrinkingNoButton from '@/components/ShrinkingNoButton';
import EnvelopeReveal from '@/components/EnvelopeReveal';

import corgiLove from '@/assets/corgi-love.gif';
import corgiBored from '@/assets/corgi-bored.gif';
import corgiFinal from '@/assets/corgi-final.gif';

const PARTNER_NAME = "Amy";
const YOUR_NAME = "Luciel";

type Step = 'love' | 'love-retry' | 'free' | 'valentine' | 'final';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>('love');
  const [isMuted, setIsMuted] = useState(false);
  const [yesScale, setYesScale] = useState(1);
  const [noScale, setNoScale] = useState(1);
  const [noClickCount, setNoClickCount] = useState(0);
  const [showNoButton, setShowNoButton] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Try to autoplay music
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay was prevented, user needs to interact first
        });
      }
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      // Try to play if not already playing
      if (!isMuted && audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  const handleYesClick = () => {
    // Try to start music on first interaction
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().catch(() => {});
    }

    switch (currentStep) {
      case 'love':
        setCurrentStep('free');
        break;
      case 'love-retry':
        setCurrentStep('free');
        break;
      case 'free':
        setCurrentStep('valentine');
        // Reset scales for next question
        setYesScale(1);
        setNoScale(1);
        setNoClickCount(0);
        setShowNoButton(true);
        break;
      case 'valentine':
        setCurrentStep('final');
        break;
    }
  };

  const handleNoClickLove = () => {
    // Mobile fallback - show retry screen
    setCurrentStep('love-retry');
  };

  const handleNoClickFree = () => {
    const newNoCount = noClickCount + 1;
    setNoClickCount(newNoCount);
    
    // Yes button grows
    setYesScale(1 + newNoCount * 0.15);
    
    // No button shrinks
    const newNoScale = Math.max(0.1, 1 - newNoCount * 0.08);
    setNoScale(newNoScale);

    // After 10 clicks, hide the no button
    if (newNoCount >= 10) {
      setShowNoButton(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'love':
        return (
          <QuestionCard
            question={`${PARTNER_NAME}, do you love me?`}
            image={
              <img
                src={corgiLove}
                alt="Cute corgi couple"
                className="w-64 h-64 object-contain mx-auto"
              />
            }
            buttons={
              <>
                <button onClick={handleYesClick} className="btn-yes">
                  Yes
                </button>
                <RunawayButton onClick={handleNoClickLove} />
              </>
            }
          />
        );

      case 'love-retry':
        return (
          <QuestionCard
            question="TRY AGAIN, DO YOU EVEN LOVE ME?"
            image={
              <img
                src={corgiBored}
                alt="Bored corgi couple"
                className="w-64 h-64 object-contain mx-auto"
              />
            }
            buttons={
              <>
                <button onClick={handleYesClick} className="btn-yes">
                  Yes
                </button>
                <button onClick={handleYesClick} className="btn-yes">
                  Yes
                </button>
              </>
            }
          />
        );

      case 'free':
        return (
          <QuestionCard
            question="Good bubbi! Are you free on the evening of February 14th, Saturday?"
            image={
              <img
                src={corgiLove}
                alt="Cute corgi couple"
                className="w-64 h-64 object-contain mx-auto"
              />
            }
            buttons={
              <>
                <GrowingYesButton onClick={handleYesClick} scale={yesScale} />
                <ShrinkingNoButton
                  onClick={handleNoClickFree}
                  scale={noScale}
                  visible={showNoButton}
                />
              </>
            }
          />
        );

      case 'valentine':
        return (
          <QuestionCard
            question={`${PARTNER_NAME}, will you be my Valentine?`}
            image={
              <img
                src={corgiFinal}
                alt="Corgi couple kissing"
                className="w-64 h-64 object-contain mx-auto"
              />
            }
            buttons={
              <>
                <button onClick={handleYesClick} className="btn-yes">
                  Yes
                </button>
                <RunawayButton onClick={() => {}} disabled />
              </>
            }
          />
        );

      case 'final':
        return <EnvelopeReveal partnerName={PARTNER_NAME} yourName={YOUR_NAME} />;

      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background music - Romantic jazz melody */}
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/download/audio/2022/10/25/audio_946b0939c8.mp3?filename=fly-me-to-the-moon-jazz-137979.mp3"
      />

      <FallingHearts />
      <MuteButton isMuted={isMuted} onToggle={toggleMute} />
      
      <main className="relative z-10">
        {renderStep()}
      </main>
    </div>
  );
};

export default Index;
