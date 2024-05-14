import React, { useState } from 'react'

interface Props {
  name: string
  label: string
  value: string
  placeholder?: string
  type?: string
  onChange: (e: any) => void
}

export default function Input({
  name,
  label,
  value,
  placeholder,
  type = 'text',
  onChange,
}: Props) {
  const [inputType, setInputType] = useState(type)
  const [showText, setShowText] = useState(false)

  const handleToggle = () => {
    if (inputType === 'text') {
      setInputType('password')
    } else {
      setInputType('text')
    }
    setShowText(!showText)
  }

  return (
    <div className="relative w-full rounded-xl border border-gray-200 bg-white px-5 py-3">
      <label htmlFor={name} className="w-full font-medium text-gray-500">
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        placeholder={placeholder || label}
        type={inputType}
        onChange={onChange}
        className="w-full border-0 text-sm font-light ring-0 focus:outline-none"
      />
      {type === 'password' && (
        <div
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer py-1 text-xs text-gray-400"
          onClick={handleToggle}
        >
          {!showText ? 'show' : 'hide'}
        </div>
      )}
    </div>
  )
}
