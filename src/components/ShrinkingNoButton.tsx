interface ShrinkingNoButtonProps {
  onClick: () => void;
  scale: number;
  visible: boolean;
}

const ShrinkingNoButton = ({ onClick, scale, visible }: ShrinkingNoButtonProps) => {
  if (!visible) return null;

  return (
    <button
      onClick={onClick}
      className="btn-no transition-all duration-300"
      style={{
        transform: `scale(${scale})`,
        opacity: scale < 0.3 ? scale * 3 : 1,
      }}
    >
      No
    </button>
  );
};

export default ShrinkingNoButton;
