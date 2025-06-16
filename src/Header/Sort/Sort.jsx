import './Sort.css'

function Sort({ options, onChange, value }) {
    return (
        <select className="Sort" onChange={onChange} value={value}>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default Sort;