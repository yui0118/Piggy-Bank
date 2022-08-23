export type Goal = {
  id?: number;
  text: string;
  budget: number;
  expense: Expense[];
};

export type Expense = {
  id?: number;
  text: string;
  amount: number;
  goal_id: number;
};
