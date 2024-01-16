import { useState, useRef } from "react";
import Chip from "./Chip";

function AutoComplete({ options, placeholder, ...props }) {
    const [inputValue, setInputValue] = useState("");
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [highlightChip, setHighlightChip] = useState(false);

    const inputRef = useRef(null);

    const handleOptionClick = (label, value) => {
        inputRef.current.focus();
        setSelectedOptions([...selectedOptions, { label, value }]);
    };

    const handleRemoveClick = (value) => {
        const newSelectedOptions = selectedOptions.filter((option) => option.value !== value);
        setSelectedOptions(newSelectedOptions);
    };

    const handleBackPress = (e) => {
        if (e.key === "Backspace" && !inputValue && selectedOptions.length && !highlightChip) {
            setHighlightChip(true);
        }

        if (e.key === "Backspace" && !inputValue && selectedOptions.length && highlightChip) {
            const lastOption = selectedOptions[selectedOptions.length - 1];
            handleRemoveClick(lastOption.value);
            setHighlightChip(false);
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const filteredOptions = options?.filter(({ label, value }) => {
        const isNotSelected = selectedOptions.every((option) => option.value !== value);
        const doesLabelMatch = label.toLowerCase().includes(inputValue.toLowerCase());

        return doesLabelMatch && isNotSelected;
    });


    return (
        <div
         className="relative"
        >
            <div
                className="flex gap-2 border border-gray-300 rounded-md w-full p-2 max-w-full"
            >
                <div className="flex gap-2 flex-wrap max-w-[50%]">
                    {selectedOptions.map(({ label, value }, idx) => (
                        <Chip
                            key={value}
                            label={label}
                            onClick={() => handleRemoveClick(value)}
                            color={
                                idx === selectedOptions.length - 1 && highlightChip
                                    ? "bg-gray-200"
                                    : ""
                            }
                        />
                    ))}
                </div>
                <input type="text"
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={() => setShowOptions(true)}
                    {...props}
                    className="w-full p-2 focus:outline-none h-auto"
                    ref={inputRef}
                    onKeyDown={handleBackPress}
                />
            </div>
            <ul
             className={`absolute w-full h-60 overflow-y-scroll border border-gray-300 rounded-md mt-1 bg-white ${showOptions ? "" : "hidden"}`}
            >
                {filteredOptions.map(({ label, value }) => (
                    <li
                        key={value}
                        onClick={() => handleOptionClick(label, value)}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                        {label}
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default AutoComplete;