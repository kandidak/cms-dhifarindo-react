import React, { useState } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";

const Input = ({
  name,
  label,
  placeholder,
  type,
  helperText,
  onChange,
  defaultValue,
  required,
}) => {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-primary-dark" htmlFor={name}>
          {label}
          {required ? <a className="text-red-600">*</a> : ""}
        </label>
      )}
      {helperText && <p className="text-xs text-[#7E7F84]">{helperText}</p>}
      <div className="relative flex">
        <div className="relative w-full">
          <input
            id={name}
            type={type === "password" && !showPassword ? "text" : type}
            placeholder={placeholder}
            onChange={onChange}
            defaultValue={defaultValue}
            required={required}
            className="w-full rounded-md border border-gray-300 py-2 px-4"
          />

          {type === "password" ? (
            <button
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              type="button"
              tabIndex={-1}
              className="tranform absolute right-2 top-5 translate-y-[-50%]"
            >
              <EyeIcon />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Input;
