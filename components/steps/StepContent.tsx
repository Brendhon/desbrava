'use client';

import { Card } from '@/components/ui';
import { ReactNode } from 'react';

interface StepContentProps {
  children: ReactNode;
}

const StepContent = ({ children }: StepContentProps) => {
  return (
    <Card shadow="none" background="dark" maxWidth="none" border={false}>
      {children}
    </Card>
  );
};

export default StepContent;
