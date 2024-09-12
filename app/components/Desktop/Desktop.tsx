"use client";

import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTerminal,
  faCode,
  faGlobe,
  faFolder,
  faFile,
  faComments,
  faWindowMinimize,
  faWindowMaximize,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Dock from "../Dock/Dock";
import FileMenu from "./FileMenu";
import { Rnd } from "react-rnd";

// Import actual app components
import TerminalApp from "../Apps/Terminal";
import CodeEditor from "../Apps/CodeEditor";
import WebBrowser from "../Apps/WebBrowser";
import FileExplorer from "../Apps/FileExplorer";
import FileViewer from "../Apps/FileViewer";
import Chatbot from "../Apps/Chatbot";

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
    <FontAwesomeIcon
      icon={icon}
      size="2x"
      className="mb-1 max-w-[60px] max-h-[60px]"
    />
    <span className="text-sm">{label}</span>
  </Box>
);

interface AppWindow {
  name: string;
  component: React.ReactNode;
}

const defaultMenuItems = [
  {
    label: "File",
    items: [
      { label: "New", action: () => console.log("New") },
      { label: "Open", action: () => console.log("Open") },
      { label: "Save", action: () => console.log("Save") },
      { label: "Close", action: () => console.log("Close") },
    ],
  },
  {
    label: "Edit",
    items: [
      { label: "Undo", action: () => console.log("Undo") },
      { label: "Redo", action: () => console.log("Redo") },
      { label: "Cut", action: () => console.log("Cut") },
      { label: "Copy", action: () => console.log("Copy") },
      { label: "Paste", action: () => console.log("Paste") },
    ],
  },
];

const appMenuItems = {
  Terminal: [
    ...defaultMenuItems,
    {
      label: "View",
      items: [
        {
          label: "Toggle Full Screen",
          action: () => console.log("Toggle Full Screen"),
        },
        { label: "Zoom In", action: () => console.log("Zoom In") },
        { label: "Zoom Out", action: () => console.log("Zoom Out") },
      ],
    },
  ],
  CodeEditor: [
    ...defaultMenuItems,
    {
      label: "Code",
      items: [
        {
          label: "Format Document",
          action: () => console.log("Format Document"),
        },
        {
          label: "Toggle Comment",
          action: () => console.log("Toggle Comment"),
        },
        { label: "Find", action: () => console.log("Find") },
      ],
    },
  ],
  WebBrowser: [
    ...defaultMenuItems,
    {
      label: "Navigation",
      items: [
        { label: "Back", action: () => console.log("Back") },
        { label: "Forward", action: () => console.log("Forward") },
        { label: "Refresh", action: () => console.log("Refresh") },
      ],
    },
  ],
  FileExplorer: [
    ...defaultMenuItems,
    {
      label: "View",
      items: [
        { label: "List View", action: () => console.log("List View") },
        { label: "Grid View", action: () => console.log("Grid View") },
        {
          label: "Show Hidden Files",
          action: () => console.log("Show Hidden Files"),
        },
      ],
    },
  ],
  FileViewer: [
    ...defaultMenuItems,
    {
      label: "View",
      items: [
        { label: "Zoom In", action: () => console.log("Zoom In") },
        { label: "Zoom Out", action: () => console.log("Zoom Out") },
        { label: "Rotate", action: () => console.log("Rotate") },
      ],
    },
  ],
  Chatbot: [
    ...defaultMenuItems,
    {
      label: "Chat",
      items: [
        { label: "Clear Chat", action: () => console.log("Clear Chat") },
        { label: "Export Chat", action: () => console.log("Export Chat") },
        { label: "Change Model", action: () => console.log("Change Model") },
      ],
    },
  ],
};

export default function Desktop() {
  const [openApps, setOpenApps] = useState<AppWindow[]>([]);
  const [maximized, setMaximized] = useState<boolean>(false);
  const gradientWallpapers = [
    "linear-gradient(to right, #ff7e5f, #feb47b)", // Example gradients
    "linear-gradient(to right, #6a11cb, #2575fc)",
    "linear-gradient(to right, #00c9ff, #92fe9d)",
    "linear-gradient(to right, #fc466b, #3f5efb)",
  ];

  const [currentWallpaper, setCurrentWallpaper] = useState<string>(
    gradientWallpapers[0]
  );
  const [contextMenuVisible, setContextMenuVisible] = useState<boolean>(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenuPosition({ x: e.pageX, y: e.pageY });
    setContextMenuVisible(true);
  };

  const changeWallpaper = (index: number) => {
    setCurrentWallpaper(gradientWallpapers[index]);
    setContextMenuVisible(false);
  };

  const launchApp = (appName: string) => {
    let appComponent: React.ReactNode;

    switch (appName) {
      case "Terminal":
        appComponent = <TerminalApp />;
        break;
      case "Code Editor":
        appComponent = <CodeEditor />;
        break;
      case "Web Browser":
        appComponent = <WebBrowser />;
        break;
      case "File Explorer":
        appComponent = <FileExplorer />;
        break;
      case "File Viewer":
        appComponent = <FileViewer />;
        break;
      case "Chatbot":
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

  const toggleMaximize = () => {
    setMaximized(!maximized);
  };

  return (
    <Box
      className="relative h-full p-4 ubuntu-scrollbar"
      style={{ background: currentWallpaper }}
      onContextMenu={handleRightClick}
    >
      {contextMenuVisible && (
        <Box
          className="absolute bg-gray-800 text-white rounded shadow-lg z-50"
          style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
        >
          {gradientWallpapers.map((gradient, index) => (
            <Box
              key={index}
              className="cursor-pointer p-2 hover:bg-gray-700"
              onClick={() => changeWallpaper(index)}
            >
              Wallpaper {index + 1}
            </Box>
          ))}
        </Box>
      )}
      <div className="grid grid-cols-6 gap-4">
        <DesktopIcon
          icon={faTerminal}
          label="Terminal"
          onClick={() => launchApp("Terminal")}
        />
        <DesktopIcon
          icon={faCode}
          label="Code Editor"
          onClick={() => launchApp("Code Editor")}
        />
        <DesktopIcon
          icon={faGlobe}
          label="Web Browser"
          onClick={() => launchApp("Web Browser")}
        />
        <DesktopIcon
          icon={faFolder}
          label="File Explorer"
          onClick={() => launchApp("File Explorer")}
        />
        <DesktopIcon
          icon={faFile}
          label="File Viewer"
          onClick={() => launchApp("File Viewer")}
        />
        <DesktopIcon
          icon={faComments}
          label="Chatbot"
          onClick={() => launchApp("Chatbot")}
        />
      </div>

      {openApps.map((app, index) => (
        <Rnd
          key={index}
          default={{
            x: 50,
            y: 50,
            width: 400,
            height: 300,
          }}
          bounds="parent"
          minWidth={300}
          minHeight={200}
          className={`${
            maximized ? "fixed inset-0" : ""
          } shadow-lg rounded-lg overflow-hidden ubuntu-border`}
        >
          <Flex direction="column" h="full">
            <div className="ubuntu-window-header bg-gray-800 text-white p-2 flex justify-between items-center">
              <strong>{app.name}</strong>
              <div className="flex">
                <button
                  className="text-white hover:text-gray-300"
                  onClick={toggleMaximize}
                >
                  <FontAwesomeIcon icon={faWindowMinimize} />
                </button>
                <button
                  className="text-white hover:text-gray-300 mx-2"
                  onClick={toggleMaximize}
                >
                  <FontAwesomeIcon icon={faWindowMaximize} />
                </button>
                <button
                  className="text-white hover:text-gray-300"
                  onClick={() => closeApp(index)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>
            <div className="bg-ubuntu-orange text-white">
              <FileMenu menus={appMenuItems[app.name] || defaultMenuItems} />
            </div>
            <div className="flex-grow bg-white overflow-auto ubuntu-scrollbar">
              {app.component}
            </div>
          </Flex>
        </Rnd>
      ))}

      <Dock launchApp={launchApp} />
    </Box>
  );
}
