import React, { ChangeEventHandler } from 'react';
import { Label, TextInput } from 'flowbite-react';

interface InputProps {
  id: string;
  label: string;
  type: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const FormInput: React.FC<InputProps> = ({ id, label, type, onChange }) => {
  return (
    <div className='max-w-xs m-3'>
      <Label htmlFor={label}>{label}</Label>
      <TextInput type={type} id={id} onChange={onChange} />
    </div>
  );
};

export default FormInput;