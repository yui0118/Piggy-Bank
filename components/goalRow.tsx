import { Button, Input, Group, Text } from '@mantine/core';
import { useState } from 'react';
import { Goal } from '../types/supabase';
import { Trash, Edit, ArrowBigDownLine } from 'tabler-icons-react';
import { useRouter } from 'next/router';
import { Flex } from '@chakra-ui/react';

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
    <Group position="center">
      <Flex
        alignItems="center"
        p="16px"
        borderWidth="1px"
        borderColor="gray.100"
        borderRadius="4px"
        width="400px"
        cursor="pointer"
        onClick={() => router.push(`/goals/${goal.id}`)}
      >
        {!isEditing && <Text>{goal.text}</Text>}
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
      </Flex>
    </Group>
  );
}
