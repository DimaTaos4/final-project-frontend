import styles from "./Button.module.css";

import type { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button: FC<ButtonProps> = ({ children, className, type, ...props }) => {
  return (
    <button
      {...props}
      className={`${styles.button} ${className || ""}`}
      type={type || "button"}
    >
      {children}
    </button>
  );
};

export default Button;
