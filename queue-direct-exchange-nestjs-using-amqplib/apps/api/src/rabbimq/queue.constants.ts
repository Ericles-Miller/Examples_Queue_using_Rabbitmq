import { IQueue } from './queue.interface';

export const EXCHANGE_TYPE = 'direct' as const;
export const EXCHANGE_NAME = 'direct_exchange' as const;

export const queues: IQueue[] = [
  {
    name: 'queue1',
    durable: true,
    routingKeys: ['Q1-key1', 'Q1-key2'],
  },
  {
    name: 'queue2',
    durable: false,
    routingKeys: ['Q2-key1', 'Q2-key2'],
  },
  {
    name: 'queue3',
    durable: true,
    routingKeys: ['key3'],
  },
  {
    name: 'queue4',
    durable: true,
    routingKeys: ['key4'],
  },
];
