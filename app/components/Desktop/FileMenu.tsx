import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem, HStack, Box } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItemType {
  label: string;
  action: () => void;
}

interface MenuType {
  label: string;
  items: MenuItemType[];
}

interface FileMenuProps {
  menus: MenuType[];
}

const MotionMenuButton = motion(MenuButton);
const MotionMenuItem = motion(MenuItem);

const ubuntuTheme = {
  orange: '#E95420',
  aubergine: '#2C001E',
  warmGrey: '#AEA79F',
  coolGrey: '#333333',
  lightAubergine: '#77216F',
};

const FileMenu: React.FC<FileMenuProps> = ({ menus }) => {
  return (
    <Box bg={ubuntuTheme.aubergine} p={2}>
      <HStack spacing={6}>
        {menus.map((menu, index) => (
          <Menu key={index} placement="bottom-start">
            {({ isOpen }) => (
              <>
                <MotionMenuButton
                  as={motion.button}
                  bg={ubuntuTheme.orange}
                  color="white"
                  _hover={{ bg: '#D34516' }}
                  _active={{ bg: '#C7410F' }}
                  px={3}
                  py={1}
                  fontSize="sm"
                  fontWeight="medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {menu.label}
                </MotionMenuButton>
                <AnimatePresence>
                  {isOpen && (
                    <MenuList
                      as={motion.ul}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      bg={ubuntuTheme.aubergine}
                      borderColor={ubuntuTheme.orange}
                      borderRadius="md"
                      boxShadow="lg"
                      p={1}
                    >
                      {menu.items.map((item, itemIndex) => (
                        <MotionMenuItem
                          key={itemIndex}
                          onClick={item.action}
                          color="white"
                          bg={ubuntuTheme.aubergine}
                          _hover={{ bg: ubuntuTheme.orange }}
                          _focus={{ bg: ubuntuTheme.orange }}
                          borderRadius="md"
                          mb={1}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {item.label}
                        </MotionMenuItem>
                      ))}
                    </MenuList>
                  )}
                </AnimatePresence>
              </>
            )}
          </Menu>
        ))}
      </HStack>
    </Box>
  );
};

export default FileMenu;