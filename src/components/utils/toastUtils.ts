
import React from 'react';
import { toast } from '@/hooks/use-toast';

export function showToastMessage(title: string, message: string) {
  toast({
    title: title,
    description: message,
    duration: 5000,
  });
}

