'use client';
import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { exportEventToExcel } from '@/actions/events/export';

interface ExportButtonProps {
  eventId: string;
}

const XLSX_MIME =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export const ExportButton = ({ eventId }: ExportButtonProps) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleDownload = () => {
    setError(null);
    startTransition(async () => {
      try {
        const { filename, base64 } = await exportEventToExcel(eventId);
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: XLSX_MIME });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch (e) {
        console.error(e);
        setError('Export mislukt');
      }
    });
  };

  return (
    <div className='flex items-center gap-2'>
      {error && <span className='text-sm text-destructive'>{error}</span>}
      <Button onClick={handleDownload} disabled={isPending}>
        {isPending ? (
          <Loader2 className='animate-spin' />
        ) : (
          <Download />
        )}
      </Button>
    </div>
  );
};
