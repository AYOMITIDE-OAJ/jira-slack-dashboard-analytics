import React from 'react';

export type PopoverItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
};

export const PopoverItem = (props: PopoverItemProps) => {
  return <li>{props.children}</li>;
};
