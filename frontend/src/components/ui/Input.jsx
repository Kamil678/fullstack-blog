import { TextInput } from "flowbite-react";

export default function Input({ value, onChange, placeholder = "", type = "text", className = "", ...props }) {
  return (
    <TextInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`
        [&_input]:pl-9 
        [&_input]:rounded-md 
        [&_input]:border-slate-200 
        [&_input]:dark:border-slate-700 
        [&_input]:bg-slate-100 
        [&_input]:dark:bg-slate-800/60 
        [&_input]:text-slate-700 
        [&_input]:dark:text-slate-300 
        [&_input]:placeholder-slate-400 
        [&_input]:dark:placeholder-slate-500 
        [&_input]:focus:ring-cyan-400/30 
        [&_input]:focus:border-cyan-400/60 
        [&_input]:transition-all 
        [&_input]:duration-200
        ${className}
      `}
      {...props}
    />
  );
}
