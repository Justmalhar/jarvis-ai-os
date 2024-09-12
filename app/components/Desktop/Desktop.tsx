"use client";

import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTerminal, faCode, faGlobe, faFolder, faFile, faComments } from '@fortawesome/free-solid-svg-icons';
import Dock from '../Dock/Dock';
import FileMenu from './FileMenu';

// Import actual app components
import TerminalApp from '../Apps/Terminal';
import CodeEditor from '../Apps/CodeEditor';
import WebBrowser from '../Apps/WebBrowser';
import FileExplorer from '../Apps/FileExplorer';
import FileViewer from '../Apps/FileViewer';
import Chatbot from '../Apps/Chatbot';

interface DesktopIconProps {
  icon: any;
  label: string;
  onClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ icon, label, onClick }) => (
  <Box 
    className="flex flex-col items-center mb-4 cursor-pointer text-white hover:bg-white hover:bg-opacity-10 p-2 rounded transition-colors duration-200"
    onClick={onClick}
  >
    <FontAwesomeIcon icon={icon} size="2x" className="mb-1" />
    <span className="text-sm">{label}</span>
  </Box>
);

interface AppWindow {
  name: string;
  component: React.ReactNode;
}

const defaultMenuItems = [
    {
      label: 'File',
      items: [
        { label: 'New', action: () => console.log('New') },
        { label: 'Open', action: () => console.log('Open') },
        { label: 'Save', action: () => console.log('Save') },
        { label: 'Close', action: () => console.log('Close') },
      ],
    },
    {
      label: 'Edit',
      items: [
        { label: 'Undo', action: () => console.log('Undo') },
        { label: 'Redo', action: () => console.log('Redo') },
        { label: 'Cut', action: () => console.log('Cut') },
        { label: 'Copy', action: () => console.log('Copy') },
        { label: 'Paste', action: () => console.log('Paste') },
      ],
    },
  ];
  
  // Define app-specific menu items
  const appMenuItems = {
    Terminal: [
      ...defaultMenuItems,
      {
        label: 'View',
        items: [
          { label: 'Toggle Full Screen', action: () => console.log('Toggle Full Screen') },
          { label: 'Zoom In', action: () => console.log('Zoom In') },
          { label: 'Zoom Out', action: () => console.log('Zoom Out') },
        ],
      },
    ],
    CodeEditor: [
      ...defaultMenuItems,
      {
        label: 'Code',
        items: [
          { label: 'Format Document', action: () => console.log('Format Document') },
          { label: 'Toggle Comment', action: () => console.log('Toggle Comment') },
          { label: 'Find', action: () => console.log('Find') },
        ],
      },
    ],
    WebBrowser: [
      ...defaultMenuItems,
      {
        label: 'Navigation',
        items: [
          { label: 'Back', action: () => console.log('Back') },
          { label: 'Forward', action: () => console.log('Forward') },
          { label: 'Refresh', action: () => console.log('Refresh') },
        ],
      },
    ],
    FileExplorer: [
      ...defaultMenuItems,
      {
        label: 'View',
        items: [
          { label: 'List View', action: () => console.log('List View') },
          { label: 'Grid View', action: () => console.log('Grid View') },
          { label: 'Show Hidden Files', action: () => console.log('Show Hidden Files') },
        ],
      },
    ],
    FileViewer: [
      ...defaultMenuItems,
      {
        label: 'View',
        items: [
          { label: 'Zoom In', action: () => console.log('Zoom In') },
          { label: 'Zoom Out', action: () => console.log('Zoom Out') },
          { label: 'Rotate', action: () => console.log('Rotate') },
        ],
      },
    ],
    Chatbot: [
      ...defaultMenuItems,
      {
        label: 'Chat',
        items: [
          { label: 'Clear Chat', action: () => console.log('Clear Chat') },
          { label: 'Export Chat', action: () => console.log('Export Chat') },
          { label: 'Change Model', action: () => console.log('Change Model') },
        ],
      },
    ],
  };
  
  export default function Desktop() {
    const [openApps, setOpenApps] = useState<AppWindow[]>([]);
  
    const launchApp = (appName: string) => {
      let appComponent: React.ReactNode;
  
      switch (appName) {
        case 'Terminal':
          appComponent = <TerminalApp />;
          break;
        case 'CodeEditor':
          appComponent = <CodeEditor />;
          break;
        case 'WebBrowser':
          appComponent = <WebBrowser />;
          break;
        case 'FileExplorer':
          appComponent = <FileExplorer />;
          break;
        case 'FileViewer':
          appComponent = <FileViewer />;
          break;
        case 'Chatbot':
          appComponent = <Chatbot />;
          break;
        default:
          appComponent = <div>App not found</div>;
      }
  
      setOpenApps([...openApps, { name: appName, component: appComponent }]);
    };
  
    const closeApp = (index: number) => {
      setOpenApps(openApps.filter((_, i) => i !== index));
    };
  
    return (
      <Box className="relative h-full bg-[#2C001E] p-4 ubuntu-scrollbar ">
        <div className="grid grid-cols-6 gap-4">
          <DesktopIcon icon={faTerminal} label="Terminal" onClick={() => launchApp('Terminal')} />
          <DesktopIcon icon={faCode} label="Code Editor" onClick={() => launchApp('CodeEditor')} />
          <DesktopIcon icon={faGlobe} label="Web Browser" onClick={() => launchApp('WebBrowser')} />
          <DesktopIcon icon={faFolder} label="File Explorer" onClick={() => launchApp('FileExplorer')} />
          <DesktopIcon icon={faFile} label="File Viewer" onClick={() => launchApp('FileViewer')} />
          <DesktopIcon icon={faComments} label="Chatbot" onClick={() => launchApp('Chatbot')} />
        </div>
  
        
        {openApps.map((app, index) => (
            <Box key={index} className="absolute inset-4 ubuntu-window rounded-lg overflow-hidden shadow-lg max-h-[75vh]">
            <Flex direction="column" h="full">
                <div className="ubuntu-window-header bg-gray-800 text-white p-2 flex justify-between items-center">
                <span>{app.name}</span>
                <button 
                    className="text-white hover:text-gray-300"
                    onClick={() => closeApp(index)}
                >
                    ×
                </button>
                </div>
                <div className="bg-ubuntu-orange text-white">
                <FileMenu menus={appMenuItems[app.name] || defaultMenuItems} />
                </div>
                <div className="flex-grow bg-white overflow-auto ubuntu-scrollbar">
                {app.component}
                </div>
            </Flex>
            </Box>
        ))}
  
        <Dock launchApp={launchApp} />
      </Box>
    );
  }