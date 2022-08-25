import { useEffect, useState } from 'react';
import Welcome from '../components/welcome';
import NewGoalModal from '../components/newGoalModal';
import { Goal } from '../types/supabase';
import GoalRow from '../components/goalRow';
import { client } from '../utils/supabaseClient';
import { Pencil } from 'tabler-icons-react';
import { Box, Flex, Heading, Stack, Button, Text } from '@chakra-ui/react';

const Home = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getGoals = async () => {
    const res = await client.from('goal').select('*').order('id');
    if (!!res) setGoals(res.data as Goal[]);
  };

  useEffect(() => {
    getGoals();
  }, []);

  return (
    <Box
      bg="gray.50"
      py="60px"
      display="flex"
      flexDir="column"
      alignItems="center"
    >
      <Box mb="48px" w="600px">
        <Welcome />
      </Box>
      <>
        <Flex mb="32px" w="600px" justifyContent="space-between">
          <Heading size="lg">作成した目標</Heading>
          <Button
            variant="outline"
            colorScheme="blue"
            onClick={() => setIsModalOpen(true)}
            leftIcon={<Pencil size={18} strokeWidth={2} />}
          >
            目標を作成
          </Button>
        </Flex>
        <Stack spacing="32px">
          {goals.length === 0 && (
            <Text fontSize="sm" color="gray.600">
              まだ目標が作成されていません
            </Text>
          )}
          {goals.map((goal, i) => (
            <GoalRow
              goal={goal}
              key={i}
              onEdit={(text) => {
                client
                  .from('goal')
                  .update({ text })
                  .match({ id: goal.id })
                  .then(() => getGoals());
              }}
              onDelete={async () => {
                try {
                  await client
                    .from('expense')
                    .delete()
                    .match({ goal_id: goal.id });
                  await client.from('goal').delete().match({ id: goal.id });
                  getGoals();
                } catch (e) {
                  console.error(e);
                }
              }}
            />
          ))}
        </Stack>
      </>
      <NewGoalModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(text, budget) => {
          client
            .from('goal')
            .insert({ text, budget })
            .then(() => {
              getGoals();
              setIsModalOpen(false);
            });
        }}
      />
    </Box>
  );
};

export default Home;
