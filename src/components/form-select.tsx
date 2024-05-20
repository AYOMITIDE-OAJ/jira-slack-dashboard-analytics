import { cn } from '@/lib/utils'
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import React, { useEffect, useState } from 'react'

type Option = {
  name: string
  value: string | null
}

interface FormSelectProps {
  name: string
  value: Option | string
  options: Option[]
  label: string
  onChange: (value: Option) => void
}

const FormSelect = ({
  name,
  value,
  options,
  label,
  onChange,
}: FormSelectProps) => {
  const [selectedValue, setSelectedValue] = useState<Option>({
    name: `Select ${name}`,
    value: null,
  })

  useEffect(() => {
    if (
      typeof value === 'object' &&
      value !== null &&
      'name' in value &&
      'value' in value
    ) {
      setSelectedValue(value as Option)
    } else if (typeof value === 'string') {
      const foundOption = options.find((option) => option.value === value)
      if (foundOption) {
        setSelectedValue(foundOption)
        return
      }
    }
  }, [value])

  return (
    <div className="w-full space-y-2">
      <label
        htmlFor={selectedValue.name}
        className="text-sm font-medium text-gray-600"
      >
        {label}
      </label>
      <Listbox value={selectedValue} onChange={onChange}>
        <ListboxButton
          className={cn(
            'relative block w-full rounded-lg bg-gray-100 py-3 pl-3 pr-8 text-left text-sm/6',
            selectedValue.value ? 'text-gray-600' : 'text-gray-400',
            'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-gray-200'
          )}
        >
          {selectedValue.name || `Select ${name}`}
          <ChevronDownIcon
            className="group pointer-events-none absolute right-2.5 top-2.5 size-4 fill-gray-600"
            aria-hidden="true"
          />
        </ListboxButton>
        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions
            anchor="bottom"
            className="w-[var(--button-width)] rounded-xl border border-gray-50 bg-white p-1 shadow-md [--anchor-gap:var(--spacing-1)] focus:outline-none"
          >
            {options.map((option) => (
              <ListboxOption
                key={option.name}
                value={option}
                className="group flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-gray-100"
              >
                <div className="text-sm/6 text-gray-600">{option.name}</div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </Listbox>
    </div>
  )
}

export default FormSelect
