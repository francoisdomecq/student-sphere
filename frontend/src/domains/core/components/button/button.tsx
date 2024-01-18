import React from "react";

import "./button.scss";

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;

}

const Button = (props: ButtonProps) => {
    const { onClick, children, disabled } = props;
    return (
        <button disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;