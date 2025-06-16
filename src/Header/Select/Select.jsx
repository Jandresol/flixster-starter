import './Select.css';

function Select({ options, onChange, value }) {
    return (
        <div className="select-container">
            <select className="select" onChange={onChange} value={value}>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <i className="fa fa-chevron-down select-icon"></i>
        </div>
    );
}

export default Select;
