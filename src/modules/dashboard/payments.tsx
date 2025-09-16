export type Payment = {
  id: string;
  amount: number;
  status: string;
  email: string;
};
export const payments: Payment[] = [
  {
    id: "1",
    email: "alice@example.com",
    amount: 250,
    status: "pending",
  },
  {
    id: "2",
    email: "bob@example.com",
    amount: 540,
    status: "processing",
  },
  {
    id: "3",
    email: "charlie@example.com",
    amount: 120,
    status: "success",
  },
  {
    id: "4",
    email: "diana@example.com",
    amount: 75,
    status: "failed",
  },
  {
    id: "5",
    email: "eve@example.com",
    amount: 999,
    status: "success",
  },
];
