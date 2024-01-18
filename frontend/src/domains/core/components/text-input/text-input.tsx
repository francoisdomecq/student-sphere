import { ChangeEvent, HTMLProps } from "react";

import "./text-input.scss";

interface TextInputProps extends HTMLProps<HTMLInputElement> {
  value: string;
  readonly?: boolean;
  className?: string;
  label?: string;
  required?: boolean;

}

const TextInput = (props: TextInputProps) => {
    const {
        value,
        onChange = () => {
        },
        readonly, className, label, required, placeholder
    } = props;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!readonly) {
            onChange(event);
        }
    };

    return (
        <div className="text-input">
            <label className="text-input__label">{label}</label>
            <input
                className="text-input__input"
                value={value}
                onChange={handleChange}
                required={required}
                readOnly={readonly}
            />
        </div>
    );
};

export default TextInput;