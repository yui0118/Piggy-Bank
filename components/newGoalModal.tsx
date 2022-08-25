import { Button, Input, Text, Group } from '@mantine/core';
import { useState } from 'react';
import { ArrowBigDownLine } from 'tabler-icons-react';

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
      <Group position="center" mt="md">
        <Button
          onClick={() => {
            setGoal('');
            setBudget(1000);
            onSave(goal, budget);
          }}
          variant="gradient"
          gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
          leftIcon={
            <ArrowBigDownLine size={18} strokeWidth={2} color={'white'} />
          }
        >
          保存
        </Button>
      </Group>
    </div>
  );
}
