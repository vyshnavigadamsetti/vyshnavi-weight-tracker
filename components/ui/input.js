export function Input({ value, onChange, className = '' }) {
  return <input type="text" value={value} onChange={onChange} className={`border rounded px-2 py-1 ${className}`} />;
}
