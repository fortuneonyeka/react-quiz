function NextButton({ text, className, onClick, disabled = false }) {
  return (
    <button
      className={`${className} ${disabled ? "disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}>
      {text}
    </button>
  );
}

export default NextButton;
