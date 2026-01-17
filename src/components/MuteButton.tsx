import { Volume2, VolumeX } from 'lucide-react';

interface MuteButtonProps {
  isMuted: boolean;
  onToggle: () => void;
}

const MuteButton = ({ isMuted, onToggle }: MuteButtonProps) => {
  return (
    <button
      onClick={onToggle}
      className="btn-mute fixed top-4 right-4 z-50"
      aria-label={isMuted ? 'Unmute music' : 'Mute music'}
    >
      {isMuted ? (
        <VolumeX className="w-6 h-6" />
      ) : (
        <Volume2 className="w-6 h-6" />
      )}
    </button>
  );
};

export default MuteButton;
