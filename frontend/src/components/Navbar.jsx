import { Container, Flex, Text, Button, Group, ActionIcon } from '@mantine/core'
import React from 'react'
import { Link } from 'react-router-dom'
import { FaPlusCircle, FaMoon, FaSun  } from "react-icons/fa";

const Navbar = ({ colorScheme, toggleColorScheme }) => {

  return (
    <Container size={1000} py="md">
      
      <Flex
      mih= {16}
      align= "center"
      justify= "space-between"
      direction={{
        base: 'column',
        sm: 'row',
      }}
      >
        
        <Text
          //c = "blue.6"
          size="xl" mb={5} fw={700}
          tt="uppercase"
          ta='center'
          variant='gradient'
          gradient={{from: 'lime', to: 'green', deg: '90'}}
        >
        <Link to="/">Product Store 🛒</Link>
        </Text>
            {/* Navigation links can be added here */}
        <Group spacing={4} position='right'>
          <Link to="/create">
            <Button>
              <FaPlusCircle size={20} />
            </Button>
          </Link>
          <ActionIcon onClick={() => toggleColorScheme()} size="lg" variant="filled">
            {colorScheme === 'dark' ? <FaSun size={18} /> : <FaMoon size={18} />}
          </ActionIcon>
        </Group>
      </Flex>
    </Container>
  )
}

export default Navbar