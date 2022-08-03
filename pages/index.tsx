import type { NextPage } from 'next';
import { useState } from 'react';
import Goals from '../components/goals';
import Welcome from '../components/welcome';
import GoalModal from '../components/goalModal';
import { Modal, Button, Group } from '@mantine/core';

const Home: NextPage = () => {
  const [goals, setGoals] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(goals);
  return (
    <>
      {goals.length > 0 ? <Goals goals={goals} /> : <Welcome />}
      <Group position="center">
        <Button
          variant="gradient"
          gradient={{ from: 'teal', to: 'lime', deg: 105 }}
          onClick={() => setIsModalOpen(true)}
        >
          目標を入力
        </Button>
      </Group>
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="目標を入力"
      >
        <GoalModal
          opened={isModalOpen}
          onClose={(close: boolean) => setIsModalOpen(close)}
          onAddGoals={(goal: string) => setGoals([...goals, goal])}
        />
      </Modal>
    </>
  );
};

export default Home;
