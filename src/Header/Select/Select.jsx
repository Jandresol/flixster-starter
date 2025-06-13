import './Select.css'

function Select({ options, onChange, value }) {
    return (
        <select className="Select" onChange={onChange} value={value}>
            {options.map((option, index) => (
                <option key={index} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}

export default Select;