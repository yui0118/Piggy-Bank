import { useState } from 'react';
import { Goal } from '../types/supabase';
import { Trash, Edit } from 'tabler-icons-react';
import { useRouter } from 'next/router';
import { Flex, Button, Input, Heading } from '@chakra-ui/react';

type Props = {
  goal: Goal;
  onDelete: () => void;
  onEdit: (text: string) => void;
};

export default function GoalRow({ goal, onDelete, onEdit }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingGoalText, setEditingGoalText] = useState(goal.text);
  const router = useRouter();
  return (
    <Flex
      bg="white"
      alignItems="center"
      justifyContent="space-between"
      p="32px"
      boxShadow="xl"
      borderWidth="1px"
      borderRadius="20px"
      width="600px"
      cursor="pointer"
      onClick={() => {
        router.push(`/goals/${goal.id}`);
      }}
    >
      {!isEditing && <Heading size="md">{goal.text}</Heading>}
      {isEditing && (
        <Input
          value={editingGoalText}
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setEditingGoalText(e.target.value)}
        />
      )}
      <Flex ml="24px">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            setIsEditing(!isEditing);
            setEditingGoalText(goal.text);
          }}
          leftIcon={!isEditing ? <Edit size={18} strokeWidth={2} /> : undefined}
          size="sm"
          variant="outline"
          mr="12px"
        >
          {isEditing ? 'キャンセル' : '編集'}
        </Button>
        {isEditing && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(editingGoalText);
              setIsEditing(false);
            }}
            variant="outline"
            size="sm"
          >
            保存
          </Button>
        )}
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          leftIcon={<Trash size={18} strokeWidth={2} />}
          ml="12px"
          variant="outline"
          colorScheme="red"
          size="sm"
        >
          削除
        </Button>
      </Flex>
    </Flex>
  );
}
