import { Button, Input, Text } from '@mantine/core';
import { useState } from 'react';

type Props = {
  onSave: (text: string, budget: number) => void;
};

export default function NewGoalModal({ onSave }: Props) {
  const [goal, setGoal] = useState('');
  const [budget, setBudget] = useState(1000);
  return (
    <div>
      <Text>目標</Text>
      <Input
        placeholder="目標を入力"
        type="text"
        value={goal}
        onChange={(e: any) => setGoal(e.target.value)}
      />
      <Text>上限金額</Text>
      <Input
        placeholder="上限金額"
        type="number"
        value={budget}
        onChange={(e: any) => setBudget(e.target.value)}
      />
      <Button onClick={() => onSave(goal, budget)}>保存</Button>
    </div>
  );
}
