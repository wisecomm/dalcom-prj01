
import React from 'react';
import { toast } from '@/hooks/use-toast';

export function showToastMessageUi(title: string, message: string) {
  toast({
    title: title,
    description: (
      <React.Fragment>
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{message}</code>
        </pre>
      </React.Fragment>
    ),
    duration: 5000,
  });
}
