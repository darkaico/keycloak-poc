import React, { ReactNode }  from 'react';
import Container from '@mui/material/Container';
import NavBar from './NavBar';

interface LayoutProps {
  children: ReactNode;
}


const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <NavBar />
    <Container maxWidth="md">
      {children}
    </Container>
  </>
);

export default Layout;
