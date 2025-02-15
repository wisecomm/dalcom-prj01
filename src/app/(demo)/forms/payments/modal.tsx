import React from 'react';
import { Button, Input, Label } from '@/components/ui';
import { Payment } from './columns';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Payment) => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = React.useState('');
  const [amount, setAmount] = React.useState(0);
  const [status, setStatus] = React.useState('');
  const [email, setEmail] = React.useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    const newPayment: Payment = {
      id: Math.random().toString(36).substr(2, 9), // Generate a random id
      title,
      amount,
      status,
      email,
    };
    onSubmit(newPayment);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded">
        <h2 className="text-xl mb-4">추가</h2>
        <div className="mb-2">
          <Label className="block">Title</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <Label className="block">Amount</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <Label className="block">Status</Label>
          <Input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-2">
          <Label className="block">Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" size="sm" onClick={onClose}>
            취소
          </Button>
          <Button variant="outline" size="sm" onClick={handleSubmit}>
            추가
          </Button>
        </div>
      </div>
    </div>
  );
};