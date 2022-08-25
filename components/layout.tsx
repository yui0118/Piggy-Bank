import Header from './header';
import { Box } from '@chakra-ui/react';

export default function Layout({ children }: any) {
  return (
    <>
      <Header />
      <Box mt="70px">
        <main>{children}</main>
      </Box>
    </>
  );
}
