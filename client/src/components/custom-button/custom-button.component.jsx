import "./custom-button.scss";

export const CustomButton = ({ children, bgdark, className, ...props }) => {
  return (
    <button
      className={`custom-button  ${bgdark ? "bg-dark" : " "}`}
      {...props}
    >
      {children}
    </button>
  );
};
