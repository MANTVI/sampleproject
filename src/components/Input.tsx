import React, { useId, forwardRef, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label = 'input', type = 'text', className = '', ...props }, ref) => {
    const id = useId();

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="inline-block mb-1 pl-1">
            {label}
          </label>
        )}
        <input
          type={type}
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
          ref={ref}
          id={id}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
