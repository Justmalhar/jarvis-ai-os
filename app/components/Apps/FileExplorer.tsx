// app/components/Apps/FileExplorer.tsx
"use client";

import React, { useState } from 'react';
import { Box, VStack, HStack, Text, Icon } from '@chakra-ui/react';
import { FaFolder, FaFile } from 'react-icons/fa';

interface File {
  name: string;
  type: 'file' | 'folder';
}

const FileExplorer: React.FC = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const [files, setFiles] = useState<File[]>([
    { name: 'Documents', type: 'folder' },
    { name: 'Pictures', type: 'folder' },
    { name: 'resume.pdf', type: 'file' },
    { name: 'script.js', type: 'file' },
  ]);

  const handleItemClick = (item: File) => {
    if (item.type === 'folder') {
      setCurrentPath(`${currentPath}${item.name}/`);
      // In a real application, you would fetch the contents of the new folder here
    } else {
      console.log(`Opening file: ${item.name}`);
      // Implement file opening logic here
    }
  };

  return (
    <Box h="full" p={4}>
      <Text mb={4}>Current Path: {currentPath}</Text>
      <VStack align="stretch" spacing={2}>
        {files.map((item, index) => (
          <HStack
            key={index}
            p={2}
            bg="gray.100"
            borderRadius="md"
            cursor="pointer"
            onClick={() => handleItemClick(item)}
          >
            <Icon as={item.type === 'folder' ? FaFolder : FaFile} />
            <Text>{item.name}</Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default FileExplorer;