import { useEffect, useState } from 'react';
import Welcome from '../components/welcome';
import { Modal, Button, Box, Group } from '@mantine/core';
import NewGoalModal from '../components/newGoalModal';
import { Goal } from '../types/goal';
import GoalRow from '../components/goalRow';
import { client } from '../utils/supabaseClient';
import { PencilMinus } from 'tabler-icons-react';

const Home = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getGoals = async () => {
    const res = await client.from('goal').select('*');
    if (!!res) setGoals(res.data as Goal[]);
  };

  useEffect(() => {
    getGoals();
  }, []);

  return (
    <>
      {goals === [] && <Welcome />}
      {goals.length > 0 && (
        <Box sx={{ maxWidth: 400 }} mx="auto">
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
              onDelete={() => {
                client
                  .from('goal')
                  .delete()
                  .match({ id: goal.id })
                  .then(() => getGoals());
              }}
            />
          ))}
        </Box>
      )}

      <Group position="center" mt={100}>
        <Button
          variant="gradient"
          gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
          onClick={() => setIsModalOpen(true)}
          leftIcon={<PencilMinus size={18} strokeWidth={2} color={'white'} />}
        >
          目標を入力
        </Button>
      </Group>
      <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NewGoalModal
          onSave={(text, budget) => {
            // 書き込み通信
            client
              .from('goal')
              .insert({ text, budget })
              .then(() => {
                // 最新のデータに更新
                getGoals();
                setIsModalOpen(false);
              });
          }}
        />
      </Modal>
    </>
  );
};

export default Home;
