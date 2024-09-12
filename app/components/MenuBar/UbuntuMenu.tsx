import React from 'react';
import {
  Flex, Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider,
  IconButton, Text
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRocket, faCog, faQuestionCircle, faUser, faSignOutAlt,
  faFolder, faSearch, faTerminal, faCubes, faShieldAlt
} from '@fortawesome/free-solid-svg-icons';

export default function UbuntuMenu() {
  return (
    <Flex alignItems="center" flex={1} p={2} flexWrap="wrap" justifyContent="space-between">
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Ubuntu Menu"
          icon={<FontAwesomeIcon icon={faRocket} />}
          bg="transparent"
          color="white"
          _hover={{ bg: 'var(--ubuntu-orange)', transition: 'background 0.2s ease-in-out' }}  // Ubuntu Orange hover
          _active={{ bg: 'var(--ubuntu-purple)' }} // Ubuntu dark purple for active state
          _focus={{ boxShadow: '0 0 0 3px rgba(233, 84, 32, 0.6)' }}  // Focus with orange outline
          transition="background 0.2s ease-out"
        />
        <MenuList
          bg="#2C001E" // Ubuntu dark gray background
          borderColor="var(--ubuntu-purple)" // Ubuntu purple border
          borderWidth={1}
          boxShadow="md"
          p={2}
          borderRadius="8px"  // Rounded edges for smoother UI
          transition="all 0.2s ease-in-out"
        >
          <MenuGroup title="Applications" color="var(--ubuntu-light-gray)" fontSize="sm" mb={2}>
            <MenuItem
              icon={<FontAwesomeIcon icon={faFolder} />}
              bg="var(--ubuntu-orange)"
              _hover={{ bg: 'var(--ubuntu-purple)', color: 'white', transform: 'scale(1.02)' }} // Hover state with motion
              color="white"
              borderRadius="6px"
              mb={2} // Add margin between items
              transition="all 0.2s ease-in-out"
            >
              Files
            </MenuItem>
            <MenuItem
              icon={<FontAwesomeIcon icon={faSearch} />}
              bg="var(--ubuntu-orange)"
              _hover={{ bg: 'var(--ubuntu-purple)', color: 'white', transform: 'scale(1.02)' }}
              color="white"
              borderRadius="6px"
              mb={2}
              transition="all 0.2s ease-in-out"
            >
              Search
            </MenuItem>
            <MenuItem
              icon={<FontAwesomeIcon icon={faTerminal} />}
              bg="var(--ubuntu-orange)"
              _hover={{ bg: 'var(--ubuntu-purple)', color: 'white', transform: 'scale(1.02)' }}
              color="white"
              borderRadius="6px"
              mb={2}
              transition="all 0.2s ease-in-out"
            >
              Terminal
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuGroup title="System" color="var(--ubuntu-light-gray)" fontSize="sm" mb={2} mt={2}>
            <MenuItem
              icon={<FontAwesomeIcon icon={faCubes} />}
              bg="var(--ubuntu-orange)"
              _hover={{ bg: 'var(--ubuntu-purple)', color: 'white', transform: 'scale(1.02)' }}
              color="white"
              borderRadius="6px"
              mb={2}
              transition="all 0.2s ease-in-out"
            >
              Software Center
            </MenuItem>
            <MenuItem
              icon={<FontAwesomeIcon icon={faShieldAlt} />}
              bg="var(--ubuntu-orange)"
              _hover={{ bg: 'var(--ubuntu-purple)', color: 'white', transform: 'scale(1.02)' }}
              color="white"
              borderRadius="6px"
              mb={2}
              transition="all 0.2s ease-in-out"
            >
              System Monitor
            </MenuItem>
            <MenuItem
              icon={<FontAwesomeIcon icon={faCog} />}
              bg="var(--ubuntu-orange)"
              _hover={{ bg: 'var(--ubuntu-purple)', color: 'white', transform: 'scale(1.02)' }}
              color="white"
              borderRadius="6px"
              mb={2}
              transition="all 0.2s ease-in-out"
            >
              Settings
            </MenuItem>
          </MenuGroup>
          <MenuDivider />
          <MenuItem
            icon={<FontAwesomeIcon icon={faQuestionCircle} />}
            bg="var(--ubuntu-orange)"
            _hover={{ bg: 'var(--ubuntu-purple)', color: 'white', transform: 'scale(1.02)' }}
            color="white"
            borderRadius="6px"
            mb={2}
            transition="all 0.2s ease-in-out"
          >
            Help
          </MenuItem>
          <MenuItem
            icon={<FontAwesomeIcon icon={faUser} />}
            bg="var(--ubuntu-orange)"
            _hover={{ bg: 'var(--ubuntu-purple)', color: 'white', transform: 'scale(1.02)' }}
            color="white"
            borderRadius="6px"
            mb={2}
            transition="all 0.2s ease-in-out"
          >
            About JARVIS
          </MenuItem>
          <MenuDivider />
          <MenuItem
            icon={<FontAwesomeIcon icon={faSignOutAlt} />}
            color="red.300"
            bg="white"
            _hover={{ bg: 'var(--ubuntu-orange)', color: 'white', transform: 'scale(1.02)' }} // No dimming effect for Log Out
            borderRadius="6px"
            transition="all 0.2s ease-in-out"
          >
            Log Out
          </MenuItem>
        </MenuList>
      </Menu>
      
    </Flex>
  );
}
