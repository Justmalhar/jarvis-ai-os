
// components/Apps/TerminalComponent.tsx
import React, { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const TerminalComponent: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new Terminal({
      theme: {
        background: '#2C001E',
        foreground: '#FFFFFF',
      }
    });
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalRef.current);
    fitAddon.fit();

    term.writeln('Welcome to JARVIS Terminal');
    term.writeln('Type "help" for available commands');

    term.onKey(({ key, domEvent }) => {
      if (domEvent.keyCode === 13) {
        term.writeln('');
        // Here you would typically send the command to the backend
        // and display the result
      } else {
        term.write(key);
      }
    });

    return () => {
      term.dispose();
    };
  }, []);

  return <Box ref={terminalRef} className="h-full" />;
};

export default TerminalComponent;