import React, { ChangeEventHandler } from 'react';
import { Label, TextInput } from 'flowbite-react';

interface InputProps {
  id: string;
  label: string;
  type: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  name?: string;
}

const FormInput: React.FC<InputProps> = ({ id, label, type, onChange, name }) => {
  return (
    <div className='max-w-xs m-3'>
      <Label htmlFor={label}>{label}</Label>
      <TextInput type={type} id={id} name={name} onChange={onChange} />
      <div className="error text-red-500" id={id + "_error"}></div>
    </div>
  );
};

export default FormInput;