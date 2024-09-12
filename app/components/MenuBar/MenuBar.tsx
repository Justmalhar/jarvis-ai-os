"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Flex, IconButton, Menu, MenuButton, MenuList, MenuItem, Text, useMediaQuery,
  Slider, SliderTrack, SliderFilledTrack, SliderThumb
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRocket, faCog, faQuestionCircle, faUser, faSignOutAlt,
  faVolumeUp, faVolumeMute, faVolumeDown, faMicrophone, faMicrophoneSlash,
  faVideo, faVideoSlash, faBatteryFull, faClock
} from '@fortawesome/free-solid-svg-icons';
import UbuntuMenu from './UbuntuMenu';

import dynamic from 'next/dynamic';

// Dynamically import the Clock component with server-side rendering disabled
const Clock = dynamic(() => import('./Clock'), { ssr: false });

export default function MenuBar() {
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [volume, setVolume] = useState(50);
  const [showVolumeToast, setShowVolumeToast] = useState(false);
  const volumeToastTimeout = useRef(null);

  useEffect(() => {
    if (showVolumeToast) {
      if (volumeToastTimeout.current) clearTimeout(volumeToastTimeout.current);
      volumeToastTimeout.current = setTimeout(() => setShowVolumeToast(false), 2000);
    }
    return () => {
      if (volumeToastTimeout.current) clearTimeout(volumeToastTimeout.current);
    };
  }, [showVolumeToast]);

  const getVolumeIcon = () => {
    if (volume === 0) return faVolumeMute;
    if (volume < 50) return faVolumeDown;
    return faVolumeUp;
  };

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    setShowVolumeToast(true);
  };

  return (
    <>
      <Box className="flex justify-between items-center bg-[#300A24] text-white py-2 px-4 shadow-md">
        <UbuntuMenu />
        <Flex alignItems="center" className="space-x-2">
          {!isMobile && (
            <>
              {/* Volume Control Menu */}
              <Menu>
                <MenuButton as={IconButton} icon={<FontAwesomeIcon icon={getVolumeIcon()} />} variant="white" />
                <MenuList className="bg-[#2C001E] border-[#77216F] rounded-md mt-2 p-4 text-white">
                  <Slider
                    aria-label="volume-slider"
                    defaultValue={50}
                    min={0}
                    max={100}
                    onChange={handleVolumeChange}
                    orientation="vertical"
                    minH="32"
                  >
                    <SliderTrack bg="gray.400">
                      <SliderFilledTrack bg="orange.400" />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                </MenuList>
              </Menu>

              {/* Microphone Control Menu */}
              <Menu>
                <MenuButton as={IconButton} icon={<FontAwesomeIcon icon={isMicOn ? faMicrophone : faMicrophoneSlash} />} variant="white" />
                <MenuList className="bg-[#2C001E] border-[#77216F] rounded-md mt-2 p-1 text-white">
                  <MenuItem
                    onClick={() => setIsMicOn(!isMicOn)}
                    className="text-white hover:bg-[#E95420] my-1"
                    _hover={{ bg: "#E95420" }}
                  >
                    {isMicOn ? 'Turn Off Microphone' : 'Turn On Microphone'}
                  </MenuItem>
                </MenuList>
              </Menu>

              {/* Camera Control Menu */}
              <Menu>
                <MenuButton as={IconButton} icon={<FontAwesomeIcon icon={isCameraOn ? faVideo : faVideoSlash} />} variant="white" />
                <MenuList className="bg-[#2C001E] border-[#77216F] rounded-md mt-2 p-1 text-white">
                  <MenuItem
                    onClick={() => setIsCameraOn(!isCameraOn)}
                    className="text-white hover:bg-[#E95420] my-1"
                    _hover={{ bg: "#E95420" }}
                  >
                    {isCameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
                  </MenuItem>
                </MenuList>
              </Menu>

              {/* Battery Status */}
              <IconButton icon={<FontAwesomeIcon icon={faBatteryFull} />} variant="white" aria-label="Battery Status" />
            </>
          )}
          
          {/* Clock Display */}
          <Flex alignItems="center" className="bg-[#3A0A2E] px-3 py-1 rounded-full">
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            <Clock />
          </Flex>
        </Flex>
      </Box>

      {/* Volume Toast */}
      {showVolumeToast && (
        <Box
          position="fixed"
          top="40"
          right="10"
          bg="orange.500"
          color="white"
          px="4"
          py="2"
          borderRadius="md"
          zIndex="toast"
        >
          Volume: {volume}%
        </Box>
      )}
    </>
  );
}
