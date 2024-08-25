'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface ExportButtonProps {
  fileName: string;
  data: string;
}

export const ExportButton = ({ data, fileName }: ExportButtonProps) => {
  const downloadCsv = () => {
    navigator.clipboard.writeText(data);
  };

  return (
    <Button onClick={downloadCsv}>
      <Download />
    </Button>
  );
};
