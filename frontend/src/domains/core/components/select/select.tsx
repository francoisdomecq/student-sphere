import { SyntheticEvent, useState } from "react";

import useOutsideClick from "../../hooks/use-click-outside.tsx";
import TextInput from "../text-input/text-input.tsx";


import "./select.scss";

interface SelectProps{
  label:string;
  name:string;
  options:{label:string, value:string}[]
  selectedValue?:string;
  searchValue?:string;
  onSelect: (option:{label:string,value:string}) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Select = (props:SelectProps)=>{
    const { label, name, options, selectedValue, onSelect,searchValue,onChange } = props;
    const [showList,setShowList] = useState(false);

    const handleSelectSuggestions = (event: SyntheticEvent<HTMLLIElement>) => {
        const { id, innerText } = event.currentTarget;
        onSelect({ value: id, label: innerText });
        setShowList(false);
    };

    const handleClickOutside = () => {
        setShowList(false);
    };

    const renderSuggestions = (option:{label:string, value:string}) => {
        const { value,label:optionLabel } = option;
        return (
            <li key={value}  className="search-dropdown__list-item"  id={value} onClick={handleSelectSuggestions}>{optionLabel}</li>
        );
    };

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
        event.currentTarget.select();
        setShowList(prevValue => !prevValue);
    };

    const showSuggestions = showList && options.length > 0;
    const activeClassName = showSuggestions ? "search-dropdown--active" : "";
    const ref=useOutsideClick(handleClickOutside);

    return (
        <div ref={ref} className={`search-dropdown ${activeClassName}`}>
            <TextInput
                className="search-dropdown__search-field"
                label={label}
                name={name}
                value={selectedValue ?? searchValue}
                onChange={onChange}
                onFocus={handleFocus}
            >
                {selectedValue}
            </TextInput>
            {showSuggestions && <ul className="search-dropdown__list">{options.map(renderSuggestions)}</ul>}
        </div>
    );
};

export default Select;