import React, { useState } from "react";

export default function ButtonDropdown({
  name,
  label,
  value,
  defaultValue,
  helperText,
  required,
  placeholder,
  onChange,
  dropdownContent,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div>
        <label
          htmlFor="regular-form-1"
          aria-label=".form-select-lg example"
          className="form-label"
        >
          {label}
          {required ? <a className="text-red-600">*</a> : ""}
        </label>
        {helperText && <p className="text-xs text-[#7E7F84]">{helperText}</p>}
        <div className="relative flex">
          <div className="relative w-full">
            <select
              id={name}
              className="w-full rounded-md border border-gray-300 py-2 px-4"
              defaultValue={defaultValue}
              value={value}
              onChange={onChange}
              required={required}
            >
              {dropdownContent}
            </select>
          </div>
        </div>
      </div>
    </>
    // </div>
  );
}
