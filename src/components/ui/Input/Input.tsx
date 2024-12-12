import React from 'react';
import { FieldError } from 'react-hook-form';
import { MdErrorOutline } from 'react-icons/md';
import './Input.scss';

type InputProps = React.ComponentProps<'input'> & {
  label: string;
  error: FieldError | undefined;
};

const Input = React.forwardRef(
  ({ label, error, ...inputProps }: InputProps, ref: React.Ref<HTMLInputElement>) => {
    return (
      <div className="input">
        <label className={`input__label ${error && 'input__label--error'}`} htmlFor={inputProps.id}>
          {label}
        </label>
        <div className={`input__wrapper ${error && 'input__wrapper--error'}`}>
          <input ref={ref} className="input__field" autoComplete="off" {...inputProps} />
          {error && <MdErrorOutline className="input__icon" />}
        </div>
        <span className="input__error">{error?.message} </span>
      </div>
    );
  },
);

export default Input;
