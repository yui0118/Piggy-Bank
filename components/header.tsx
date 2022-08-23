import { Box, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { BsHouseDoor } from 'react-icons/bs';

export default function Header() {
  const router = useRouter();
  return (
    <Box
      p="16px 80px"
      bg="white"
      boxShadow="md"
      position="fixed"
      top="0"
      w="100%"
      onClick={() => router.push('/')}
    >
      <IconButton
        icon={<BsHouseDoor />}
        variant="outline"
        aria-label="ホームボタン"
        colorScheme="blue"
        size="sm"
      />
    </Box>
  );
}
