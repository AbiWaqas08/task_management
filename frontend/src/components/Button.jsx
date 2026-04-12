const Button = ({ children, onClick, color = "primary" }) => {
  const colors = {
    primary: "bg-primary hover:bg-primary-dark text-white",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-white"
  };
  return (
    <button onClick={onClick} className={`py-2 px-4 rounded ${colors[color]} transition`}>
      {children}
    </button>
  );
};
export default Button;