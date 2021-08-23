function Button({ text, clickMe, className, style }) {
  function click() {
    clickMe();
  }
  return (
    <button onClick={click} className={className} style={style}>
      {text}
    </button>
  );
}
export default Button;
