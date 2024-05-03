import { ChangeEvent, HTMLProps } from "react";

import "./text-input.scss";

interface TextInputProps extends HTMLProps<HTMLInputElement> {
  name?:string;
  value?: string;
  readonly?: boolean;
  className?: string;
  label?: string;
  required?: boolean;
  type?:string;
  // @ts-ignore
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
}

const TextInput = (props: TextInputProps) => {
    const {
        value, readonly, className, label, required, placeholder,
        type, onChange, onFocus,name
    } = props;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!readonly && onChange) {
            onChange(event);
        }
    };

    return (
        <div className={`text-input ${className}`}>
            <label className="text-input__label">{label}</label>
            <input
                name={name}
                className="text-input__input"
                value={value}
                onChange={handleChange}
                onFocus={onFocus}
                required={required}
                readOnly={readonly}
                placeholder={placeholder}
                type={type}
            />
        </div>
    );
};

export default TextInput;