// app/components/Apps/WebBrowser.tsx
"use client";

import React, { useState } from 'react';
import { Box, Input, Button, VStack } from '@chakra-ui/react';

const WebBrowser: React.FC = () => {
  const [url, setUrl] = useState('https://www.example.com');
  const [iframeKey, setIframeKey] = useState(0); // Used to force iframe refresh

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIframeKey(prevKey => prevKey + 1); // Force iframe to reload
  };

  return (
    <VStack h="full" spacing={4}>
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Box display="flex">
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            mr={2}
          />
          <Button type="submit">Go</Button>
        </Box>
      </form>
      <Box flexGrow={1} w="full">
        <iframe
          key={iframeKey}
          src={url}
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="Web Browser"
        />
      </Box>
    </VStack>
  );
};

export default WebBrowser;