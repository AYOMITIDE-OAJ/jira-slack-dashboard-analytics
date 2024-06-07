import { Popover as HPopover, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment, useState, useRef } from 'react'
import { usePopper, PopperProps } from 'react-popper'

import { PopoverItem, PopoverItemProps } from './PopoverItem'

type PopoverProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  Omit<PopoverItemProps, 'name' | 'src'> &
  Pick<PopperProps<any>, 'placement'> & {
    children: React.ReactNode[]
    trigger: (state?: boolean) => React.ReactNode
    disabled?: boolean
  }

export const Popover = (props: PopoverProps) => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null)
  const popperElement = useRef<HTMLDivElement | null>(null) // Changed to useRef
  const { styles, attributes } = usePopper(
    referenceElement,
    popperElement.current,
    {
      placement: props.placement || 'auto',
      modifiers: [
        {
          name: 'computeStyles',
          options: { adaptive: false },
        },
      ],
    }
  )

  const { children, trigger, className, disabled } = props
  return (
    <HPopover as="div" className="relative z-30">
      {({ open }) => (
        <>
          <HPopover.Button
            ref={setReferenceElement}
            disabled={disabled}
            className="p-0.5 transition-opacity hover:opacity-80 focus:outline-none disabled:opacity-40"
          >
            {trigger(open)}
          </HPopover.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <HPopover.Panel
              ref={popperElement} // Changed to use ref
              style={{
                ...styles.popper,
                right: '0', // Aligns the Popover to the right end
                top: '0', // Aligns the Popover to the top of the reference element
              }}
              as="ul"
              {...attributes.popper}
              className={clsx('shadow-initial/5 z-50 shadow-sm', className)}
            >
              {children}
            </HPopover.Panel>
          </Transition>
        </>
      )}
    </HPopover>
  )
}

Popover.Item = PopoverItem
