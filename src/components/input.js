const Input = ({
  className,
  label,
  type,
  select,
  value,
  actions,
  placeholder,
}) => {
  const input = ["number", "text", "date", "button", "submit", "password"];
  return (
    <div className="w3-container">
      {label && <lable>{label}</lable>}
      {type === "textarea" && (
        <textarea
          className={`w3-input ${className}`}
          placeholder={placeholder}
          value={value}
          onChange={(value) => {
            actions(value.target.value);
          }}
        ></textarea>
      )}
      {input.indexOf(type) !== -1 && (
        <input
          className={`w3-input ${className}`}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={(value) => {
            actions(value.target.value);
          }}
        />
      )}
      {type === "select" && (
        <select
          className={`w3-select ${className}`}
          onChange={(value) => {
            actions(value.target.value);
          }}
          value={value}
        >
          {select.map((data) => {
            return (
              <option value={data.value}>
                {data.name}
              </option>
            );
          })}
        </select>
      )}
    </div>
  );
};

export default Input;
