'use client';

import React, { ComponentProps } from 'react';
import { TypeAnimation as BaseTypeAnimation } from 'react-type-animation';

type TypeAnimationProps = ComponentProps<typeof BaseTypeAnimation>;

export const TypeAnimation = (props: TypeAnimationProps) => {
  return <BaseTypeAnimation {...props} />;
};
