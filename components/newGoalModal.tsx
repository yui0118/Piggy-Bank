import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Input,
  Button,
  FormLabel,
  ModalFooter,
  Flex,
  Heading,
} from '@chakra-ui/react';
import { useState } from 'react';

type Props = {
  isModalOpen: boolean;
  onSave: (text: string, budget: number) => void;
  onClose: () => void;
};

export default function NewGoalModal({ onSave, isModalOpen, onClose }: Props) {
  const [goal, setGoal] = useState('');
  const [budget, setBudget] = useState(1000);
  return (
    <Modal isOpen={isModalOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="md">目標を作成</Heading>
        </ModalHeader>
        <ModalBody>
          <FormLabel fontWeight="bold">目標</FormLabel>
          <Input
            mb="12px"
            placeholder="目標を入力"
            type="text"
            value={goal}
            onChange={(e: any) => setGoal(e.target.value)}
          />
          <FormLabel fontWeight="bold">上限金額</FormLabel>
          <Flex alignItems="center">
            <Input
              placeholder="上限金額"
              mr="8px"
              w="100px"
              type="number"
              value={budget}
              onChange={(e: any) => setBudget(e.target.value)}
            />
            円
          </Flex>
          <ModalFooter>
            <Button
              colorScheme="green"
              onClick={() => {
                setGoal('');
                setBudget(1000);
                onSave(goal, budget);
              }}
            >
              保存
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
