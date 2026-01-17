interface GrowingYesButtonProps {
  onClick: () => void;
  scale: number;
}

const GrowingYesButton = ({ onClick, scale }: GrowingYesButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="btn-yes transition-all duration-300"
      style={{
        transform: `scale(${scale})`,
      }}
    >
      Yes
    </button>
  );
};

export default GrowingYesButton;
