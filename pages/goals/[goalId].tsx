import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { client } from '../../utils/supabaseClient';
import {
  Box,
  Button,
  CircularProgress,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Expense, Goal as GoalType } from '../../types/supabase';
import CreateExpenseModal from '../../components/createExpenseModal';

export default function Goal() {
  const router = useRouter();
  const { goalId } = router.query;
  const [goal, setGoal] = useState<GoalType>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const expenseSum =
    goal?.expense.map((e) => e.amount).reduce((v1, v2) => v1 + v2) ?? 0;

  const getGoal = useCallback(async () => {
    try {
      const { data } = await client
        .from<GoalType>('goal')
        .select('*, expense!inner(*)')
        .match({ id: goalId });
      if (data && data.length > 0) setGoal(data[0]);
    } catch (e) {
      console.error(e);
    }
  }, [goalId]);

  const insertExpense = async (text: string, amount: number) => {
    try {
      await client.from<Expense>('expense').insert({
        text,
        amount,
        goal_id: Number(goalId),
      });
      getGoal();
    } catch (e) {
      console.error(e);
    }
    setIsModalOpen(false);
  };

  const deleteExpense = async (id: number) => {
    try {
      await client.from<Expense>('expense').delete().match({ id: id });
      getGoal();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (goalId) getGoal();
  }, [goalId, getGoal]);

  return (
    <Box p="80px" bg="gray.50">
      <Box
        p="48px"
        borderWidth="1px"
        mb="16px"
        bg="white"
        borderRadius="24px"
        boxShadow="xl"
        maxWidth="1200px"
        minH="480px"
        m="0 auto"
      >
        <Heading textAlign="center" mb="80px" size="xl">
          {goal?.text}
        </Heading>
        <Flex justifyContent="center" alignItems="center" h="100%">
          <Box position="relative" mr="80px">
            <CircularProgress
              size="240px"
              value={(expenseSum / (goal?.budget ?? 1)) * 100}
            />
            <Flex
              position="absolute"
              top="88px"
              left="61px"
              flexDir="column"
              alignItems="center"
            >
              <Heading size="xs">上限予算</Heading>
              <Text fontWeight="bold" fontSize="32px">
                {goal?.budget}円
              </Text>
            </Flex>
          </Box>
          <Box w="480px">
            <Flex
              justifyContent="space-between"
              alignItems="center"
              mb="16px"
              background="gray.100"
              p="8px 12px"
              borderRadius="4px"
            >
              <Heading size="md">支出</Heading>
              <Button
                variant="ghost"
                colorScheme="blue"
                size="sm"
                onClick={() => setIsModalOpen(true)}
              >
                追加
              </Button>
            </Flex>
            <Stack spacing="16px">
              {goal?.expense?.map((expense) => (
                <Flex
                  key={expense.id}
                  alignItems="center"
                  justifyContent="space-between"
                  borderBottomWidth="1px"
                  pb="16px"
                  px="12px"
                >
                  <Flex alignItems="center">
                    <Text>{expense.text}</Text>
                    <Text ml="8px" fontWeight="bold">
                      {expense.amount}
                    </Text>
                    <Text ml="4px">円</Text>
                  </Flex>
                  <Button
                    variant="outline"
                    colorScheme="red"
                    size="sm"
                    onClick={() => {
                      const shouldDelete = confirm('本当に削除しますか？');
                      if (shouldDelete && expense.id) deleteExpense(expense.id);
                    }}
                  >
                    削除
                  </Button>
                </Flex>
              ))}
            </Stack>
          </Box>
        </Flex>
      </Box>
      <CreateExpenseModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onClickSave={(text, amount) => insertExpense(text, amount)}
      />
    </Box>
  );
}
