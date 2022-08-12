import { Button, Input } from '@mantine/core';
import { useState } from 'react';
import { Goal } from '../types/goal';

type Props = {
  goal: Goal;
  onDelete: () => void;
  onEdit: (text: string) => void;
};

export default function GoalRow({ goal, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingGoalText, setEditingGoalText] = useState(goal.text);
  return (
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
      >
        {isEditing ? 'キャンセル' : '編集'}
      </Button>
      {isEditing && (
        <Button
          onClick={() => {
            onEdit(editingGoalText);
            setIsEditing(false);
          }}
        >
          保存
        </Button>
      )}
      <Button onClick={onDelete}>削除</Button>
    </div>
  );
}
