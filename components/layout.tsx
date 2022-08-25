import Header from './header';
import { Box } from '@chakra-ui/react';

export default function Layout({ children }: any) {
  return (
    <>
      <Header />
      <Box mt="70px" bg="gray.50" h="calc(100vh - 70px)">
        <main>{children}</main>
      </Box>
    </>
  );
}
