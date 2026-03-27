import '@mantine/core/styles.css';
import React from 'react';
import { Box } from '@mantine/core';
import { MantineProvider } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import CreatePage from './pages/CreatePage.jsx';
import Navbar from './components/Navbar.jsx';

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage({ key: 'mantine-color-scheme', defaultValue: 'light' });

  const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
      <Box mih={"100vh"} style={{ backgroundColor: colorScheme === 'dark' ? '#0b0b0d' : '#ffffff', color: colorScheme === 'dark' ? '#ffffff' : '#000000' }}>
        <Navbar colorScheme={colorScheme} toggleColorScheme={toggleColorScheme} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
          </Routes>
        </Box>
      </MantineProvider>
  );
}

export default App
