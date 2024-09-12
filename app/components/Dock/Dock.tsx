"use client";

import React, { useState } from 'react';
import { Box, Tooltip } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTerminal, faCode, faGlobe, faFolder, faFile, faComments, faTrash } from '@fortawesome/free-solid-svg-icons';

// Import actual app components
import TerminalApp from '../Apps/Terminal';
import CodeEditor from '../Apps/CodeEditor';
import WebBrowser from '../Apps/WebBrowser';
import FileExplorer from '../Apps/FileExplorer';
import FileViewer from '../Apps/FileViewer';
import Chatbot from '../Apps/Chatbot';

const DockIcon = ({ icon, label, onClick }) => {
  return (
    <Tooltip label={label} placement="top" hasArrow>
      <motion.div
        whileHover={{ y: -10 }}
        whileTap={{ scale: 0.95 }}
        className="mx-1"
      >
        <Box
            className="p-2 md:p-3 rounded-full cursor-pointer bg-white bg-opacity-10 text-white hover:bg-ubuntu-orange transition-all duration-200 w-[50px] sm:w-[40px] md:w-[65px] mx-auto text-center"
            onClick={onClick}
        >
          <FontAwesomeIcon icon={icon} size="lg" className='p-2 sm:w-[40px]' />
        </Box>
      </motion.div>
    </Tooltip>
  );
};

const Dock = ({ launchApp }) => {
  const dockItems = [
    { icon: faTerminal, label: 'Terminal', onClick: () => launchApp('Terminal') },
    { icon: faCode, label: 'Code Editor', onClick: () => launchApp('CodeEditor') },
    { icon: faGlobe, label: 'Web Browser', onClick: () => launchApp('WebBrowser') },
    { icon: faFolder, label: 'File Explorer', onClick: () => launchApp('FileExplorer') },
    { icon: faFile, label: 'File Viewer', onClick: () => launchApp('FileViewer') },
    { icon: faComments, label: 'Chatbot', onClick: () => launchApp('Chatbot') },
    { icon: faTrash, label: 'Recycle Bin', onClick: () => console.log('Open Recycle Bin') },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="absolute left-0 bottom-2 mx-auto w-[100%] sm:w-[100vw]"
    >
     <Box
  className="flex mx-auto items-center mb-2 justify-center bg-ubuntu-purple bg-opacity-80 p-2 rounded-full shadow-lg"
  style={{
    width: "100%", // Ensures the dock takes the full width of the container without overflow
    maxWidth: "95vw", // Ensures it doesn't overflow on larger screens
    padding: "0.5rem 1rem", // Padding adjusted to prevent overflow
    boxSizing: "border-box", // Ensures padding is included in width calculations
  }}
>
        {dockItems.map((item, index) => (
          <DockIcon key={index} icon={item.icon} label={item.label} onClick={item.onClick}/>
        ))}
      </Box>
    </motion.div>
  );
};

export default Dock;