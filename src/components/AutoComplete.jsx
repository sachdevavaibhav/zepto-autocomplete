import { useState } from "react";
// import { data } from "../data/data";

function AutoComplete({placeholder, options}) {
    const [originalData] = useState(options);
    const [data, setData] = useState(options);
    const [showOptions, setShowOptions] = useState(false);
    const handleSearch = (keyword) => {
        // search for keyword in data
        // return options
        const filteredData = originalData.filter((item) => item.toLowerCase().includes(keyword.toLowerCase()));
        return filteredData;
    };

    const handleInputChange = (e) => {
        const keyword = e.target.value;
        const filteredData = handleSearch(keyword);
        console.log(filteredData);
        setData(filteredData);
    };
    return (
        <div>
            <input
            type="text"
            placeholder={placeholder}
            onChange={handleInputChange}
            onFocus={() => setShowOptions(true)}
            onBlur={() => setShowOptions(false)}
            className="border border-gray-300 rounded-md p-2"
            />
            <section className={`${showOptions?"":"hidden"} border border-gray-300 rounded-md`}>
                {
                    data?.map((item, idx) => {
                        return (
                            <div role="button" key={idx} className="p-2">
                                {item}
                            </div>
                        )
                    })
                }
            </section>
        </div>
    )
};

export default AutoComplete;

/*
    - input box that takes options and displays them. On click, the selected option is displayed as a chip
 */