import {
  Button,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Input,
  Flex,
  ModalHeader,
  Heading,
} from '@chakra-ui/react';
import { useState } from 'react';

type Props = {
  isModalOpen: boolean;
  onClose: () => void;
  onClickSave: (text: string, amount: number) => void;
};

export default function CreateExpenseModal({
  isModalOpen,
  onClose,
  onClickSave,
}: Props) {
  const [expenseText, setExpenseText] = useState('');
  const [expenseAmount, setExpenseAmount] = useState(0);

  const resetStates = () => {
    setExpenseText('');
    setExpenseAmount(0);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => {
        resetStates();
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="md">支出を追加</Heading>
        </ModalHeader>
        <ModalBody>
          <FormLabel fontWeight="bold">内容</FormLabel>
          <Input
            value={expenseText}
            onChange={(e: any) => setExpenseText(e.target.value)}
            mb="16px"
          />
          <FormLabel fontWeight="bold">金額</FormLabel>
          <Flex alignItems="center">
            <Input
              type="number"
              mr="12px"
              width="80px"
              value={expenseAmount}
              onChange={(e: any) => setExpenseAmount(e.target.value)}
            />
            円
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="green"
            onClick={() => {
              resetStates();
              onClickSave(expenseText, expenseAmount);
            }}
          >
            保存
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
