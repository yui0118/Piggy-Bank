import { useState } from 'react';
import Welcome from '../components/welcome';
import { Modal, Button, Box } from '@mantine/core';
import NewGoalModal from '../components/newGoalModal';
import { Goal } from '../types/goal';
import GoalRow from '../components/goalRow';

const Home = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {goals === [] && <Welcome />}
      {goals.length > 0 && (
        <Box>
          {goals.map((goal, i) => (
            <GoalRow
              goal={goal}
              key={i}
              onEdit={(text) => {
                setGoals(
                  goals.map((g2, i2) => {
                    if (i === i2) {
                      return { ...g2, text };
                    }
                    return g2;
                  }),
                );
              }}
              onDelete={() => setGoals(goals.filter((_, i2) => i !== i2))}
            />
          ))}
        </Box>
      )}
      <Button onClick={() => setIsModalOpen(true)}>目標を入力</Button>
      <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <NewGoalModal
          onSave={(text, budget) => {
            setGoals([...goals, { text, budget }]);
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </>
  );
};

export default Home;
