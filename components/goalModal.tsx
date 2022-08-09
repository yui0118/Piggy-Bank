/* eslint-disable @typescript-eslint/indent */
import { useState } from 'react';
import { TextInput, Button, Group, Box, NumberInput } from '@mantine/core';
import { useForm } from '@mantine/form';

type Form = {
  newGoal: string;
  maximumAmount: number;
};

type Props = {
  onAddGoals: (goal: Form) => void;
  opened: boolean;
  onClose: (close: boolean) => void;
};
export default function GoalModal({ onAddGoals, onClose }: Props) {
  const [newGoal, setNewGoal] = useState<Form>({
    newGoal: '',
    maximumAmount: 1000,
  });
  const form = useForm<Form>({
    validateInputOnChange: ['newGoal', 'maximumAmount'],
    initialValues: {
      newGoal: '',
      maximumAmount: 1000,
    },

    validate: (values) => ({
      newGoal:
        values.newGoal.length === undefined
          ? '目標は、入力必須項目です'
          : values.newGoal.length >= 2
          ? null
          : '目標は、2文字以上で入力してください',
      maximumAmount:
        values.maximumAmount === undefined
          ? '使用できる金額は、入力必須項目です'
          : values.maximumAmount < 1000
          ? '使用できる金額の入力は、1,000円以上でお願いします'
          : values.maximumAmount > 10000000
          ? '使用できる金額の入力上限は、10,000,000円です。'
          : null,
    }),
  });

  return (
    <Box sx={{ maxWidth: 400 }} mx="auto">
      <form
        onSubmit={form.onSubmit((values: Form) => {
          setNewGoal(values);
          onAddGoals(newGoal);
          form.reset();
          onClose(false);
        })}
      >
        <TextInput
          required
          label="目標"
          placeholder="達成したい目標"
          {...form.getInputProps('newGoal')}
        />

        <NumberInput
          required
          mt="md"
          label="使用できる金額(1000円以上)"
          placeholder="1000"
          min={1000}
          max={10000000}
          {...form.getInputProps('maximumAmount')}
        />

        <Group position="right" mt="md">
          <Button
            type="submit"
            variant="gradient"
            gradient={{ from: 'teal', to: 'lime', deg: 105 }}
          >
            保存
          </Button>
        </Group>
      </form>
    </Box>
  );
}
