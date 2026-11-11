export function FormInput({id, label, type="text", name, value, onChange, placeholder, required=false}) {
    return (
        <>
        <label htmlFor={id}>{label}</label>
        <input id={id} type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required}/>
        </>
       
    )
}