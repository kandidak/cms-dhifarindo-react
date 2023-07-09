import React from "react";

const Button = ({
  children,
  className = "",
  variant = "primary",
  onClick = () => {},
  fullWidth = false,
  isRounded = true,
  type,
}) => {
  const VARIANT_TYPE = {
    primary: "bg-red-primary text-white hover:bg-opacity-90",
    secondary: "bg-navy-sec-4 text-white hover:bg-opacity-90",
    outline:
      "bg-transparent text-primary-shade-1 border border-navy-primary hover:border-red-primary",
    "outline-secondary":
      "bg-transparent text-navy-primary border border-primary-shade-1",
    text: "bg-transparent text-black rounded-none",
    danger: "bg-red-primary text-white hover:bg-opacity-90",
    success: "bg-green-500 text-white hover: bg-opacity-90",
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} ${isRounded ? "rounded-full" : "rounded-md"} ${
        VARIANT_TYPE[variant]
      } ${
        fullWidth ? "w-full" : "w-fit"
      } flex text-center gap-2 items-center justify-center px-5 py-2 text-sm font-normal`}
    >
      {children}
    </button>
  );
}

export default Button;