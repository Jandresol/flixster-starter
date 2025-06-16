import './Sort.css'

function Sort({ options, onChange, value }) {
    return (
        <div className="select-container">
            <select className="sort" onChange={onChange} value={value}>
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

export default Sort;