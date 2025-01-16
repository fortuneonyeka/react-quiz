function NextButton({ text, className, onClick, disabled = false }) {
  return (
    <button
      className={`${className} ${disabled ? "disabled" : ""}`}
      onClick={onClick}
      disabled={disabled} // This ensures the button is disabled
    >
      {text}
    </button>
  );
}

export default NextButton;
