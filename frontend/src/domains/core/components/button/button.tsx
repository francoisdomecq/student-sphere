import React from "react";

import "./button.scss";

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type: "button" | "submit" | "reset";

}

const Button = (props: ButtonProps) => {
    const { onClick, children, disabled, type } = props;
    return (
        <button disabled={disabled} onClick={onClick} type={type}>
            {children}
        </button>
    );
};

export default Button;