import { useState, useRef, useEffect } from 'react';

interface RunawayButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const RunawayButton = ({ onClick, disabled }: RunawayButtonProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !buttonRef.current) return;

    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(e.clientX - buttonCenterX, 2) + Math.pow(e.clientY - buttonCenterY, 2)
    );

    if (distance < 120) {
      const angle = Math.atan2(e.clientY - buttonCenterY, e.clientX - buttonCenterX);
      const moveDistance = 150;
      
      let newX = position.x - Math.cos(angle) * moveDistance;
      let newY = position.y - Math.sin(angle) * moveDistance;

      // Keep button within viewport
      const maxX = window.innerWidth - rect.width - 100;
      const maxY = window.innerHeight - rect.height - 100;
      const minX = -rect.left + 50;
      const minY = -rect.top + 50;

      newX = Math.max(minX, Math.min(maxX, newX));
      newY = Math.max(minY, Math.min(maxY, newY));

      setPosition({ x: newX, y: newY });
    }
  };

  const handleClick = () => {
    if (isMobile) {
      onClick();
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      disabled={disabled}
      className="btn-no transition-all duration-150 ease-out"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      No
    </button>
  );
};

export default RunawayButton;
