import { Button, Input, Group } from '@mantine/core';
import { useState } from 'react';
import { Goal } from '../types/goal';
import { Trash, Edit, ArrowBigDownLine } from 'tabler-icons-react';

type Props = {
  goal: Goal;
  onDelete: () => void;
  onEdit: (text: string) => void;
};

export default function GoalRow({ goal, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingGoalText, setEditingGoalText] = useState(goal.text);
  return (
    <Group position="center">
      <div>
        {!isEditing && goal.text}
        {isEditing && (
          <Input
            value={editingGoalText}
            onChange={(e: any) => setEditingGoalText(e.target.value)}
          />
        )}
        <Button
          onClick={() => {
            setIsEditing(!isEditing);
            setEditingGoalText(goal.text);
          }}
          leftIcon={<Edit size={18} strokeWidth={2} color={'white'} />}
          variant="gradient"
          gradient={{ from: 'teal', to: 'lime', deg: 105 }}
          ml={10}
          mt={5}
        >
          {isEditing ? 'キャンセル' : '編集'}
        </Button>
        {isEditing && (
          <Button
            onClick={() => {
              onEdit(editingGoalText);
              setIsEditing(false);
            }}
            leftIcon={
              <ArrowBigDownLine size={18} strokeWidth={2} color={'white'} />
            }
            variant="gradient"
            gradient={{ from: 'teal', to: 'lime', deg: 105 }}
            ml={10}
          >
            保存
          </Button>
        )}
        <Button
          onClick={onDelete}
          leftIcon={<Trash size={18} strokeWidth={2} color={'white'} />}
          variant="gradient"
          gradient={{ from: 'teal', to: 'lime', deg: 105 }}
          ml={10}
        >
          削除
        </Button>
      </div>
    </Group>
  );
}
