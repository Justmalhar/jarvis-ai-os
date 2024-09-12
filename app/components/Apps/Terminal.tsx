// components/Apps/Terminal.tsx
"use client";

import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

const TerminalComponent = dynamic(() => import('./TerminalComponent'), {
  ssr: false,
  loading: () => <p>Loading Terminal...</p>
});

export default function TerminalApp() {
  return (
    <Box className="h-full bg-[#2C001E] ubuntu-scrollbar">
      <TerminalComponent />
    </Box>
  );
}