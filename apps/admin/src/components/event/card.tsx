import Link from 'next/link';
import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDate } from '@/utils/helpers';
import { H2, Ul } from '../typography';
import { Plus } from 'lucide-react';

interface CardProps {
  id?: string;
  title?: string;
  start?: Date;
  end?: Date;
  cta?: boolean;
}

const EventCard = ({ id, title, start, end, cta = false }: CardProps) => {
  if (cta) {
    return (
      <Link href={`/${id}`}>
        <Card>
          <Plus size={48} />
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/${id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            {`${formatDate(start)} - ${formatDate(end)}`}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export { EventCard as Card };
