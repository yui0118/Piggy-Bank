import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';

export default function Welcome() {
  return (
    <Box bg="white" p="40px" borderRadius="20px" boxShadow="xl">
      <Heading color="blue.600" mb="32px" textAlign="center">
        PiggyBank
      </Heading>
      <Flex justifyContent="center" mb="32px">
        <Image
          src="/savings_illustration.svg"
          width="300px"
          height="300px"
          alt="サービスイメージ"
        />
      </Flex>
      <Text
        color="gray.700"
        fontWeight="bold"
        lineHeight="200%"
        fontSize="16px"
        textAlign="center"
      >
        達成したい目標にいくら投資したのかを可視化できるサービスです！
      </Text>
    </Box>
  );
}
