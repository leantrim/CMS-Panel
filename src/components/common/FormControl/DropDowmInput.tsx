export interface DropDownInput {
  name: string;
  label: string;
  error: string;
  data: any;
  options: any;
  onChange: any;
  restProps?: any;
  value: string;
}

function DropDownInput({ name, label, error, data, options, onChange, ...restProps }: DropDownInput) {
  return (
    <div>
      <label htmlFor={name} className={'-form-label'}>
        {label}
      </label>
      <select name={name} onChange={onChange} className={'-form-select'}>
        {options.map((opt: any) => (
          <option value={opt.name} key={opt.name}>
            {opt.name}
          </option>
        ))}
      </select>
      {error && <div className={'-alert'}>{error}</div>}
    </div>
  );
}

export default DropDownInput;
