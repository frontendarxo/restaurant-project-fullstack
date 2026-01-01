import React from 'react';
import './style.css';

type TextProps = {
  children: React.ReactNode;
  type?: 'p' | 'span';
  className?: string;
};

export const Text = ({ children, type = 'p', className }: TextProps) => {
  const Tag = type as React.ElementType;
  return <Tag className={`text ${className || ''}`}>{children}</Tag>;
};