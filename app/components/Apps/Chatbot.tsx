"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  VStack,
  HStack,
  Input,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useToast,
  IconButton,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import { AttachmentIcon } from "@chakra-ui/icons";
import { FaMicrophone } from "react-icons/fa";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import gfm from "remark-gfm";
import mermaid from "mermaid";

// Ubuntu theme colors
const ubuntuTheme = {
  orange: "#E95420",
  purple: "#772953",
  warmGrey: "#AEA79F",
  coolGrey: "#333333",
  white: "#FFFFFF",
  lightGrey: "#f1efe7",
};

const ubuntuMarkdownStyles = `
  .markdown-body {
    font-family: 'Ubuntu', sans-serif;
    line-height: 1.8;
    color: #333333;
    background-color: #FFFFFF;
    padding: 20px;
    border-radius: 5px;
  }

  .markdown-body p {
    margin-bottom: 1.5em;
    text-align: justify;
  }

  .markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6 {
    font-family: 'Ubuntu', sans-serif;
    color: #E95420;
    margin-top: 1.5em;
    margin-bottom: 0.5em;
    font-weight: 500;
  }

  .markdown-body h1 { font-size: 2.25em; border-bottom: 2px solid #E95420; padding-bottom: 0.3em; }
  .markdown-body h2 { font-size: 1.75em; border-bottom: 1px solid #E95420; padding-bottom: 0.3em; }
  .markdown-body h3 { font-size: 1.5em; }
  .markdown-body h4 { font-size: 1.25em; }
  .markdown-body h5 { font-size: 1em; }
  .markdown-body h6 { font-size: 0.875em; color: #772953; }

  .markdown-body a {
    color: #19B6EE;
    text-decoration: none;
    transition: color 0.2s ease-in-out;
  }

  .markdown-body a:hover {
    color: #E95420;
    text-decoration: underline;
  }

  .markdown-body code {
    background-color: #F7F7F7;
    border: 1px solid #E1E1E1;
    border-radius: 3px;
    padding: 0.2em 0.4em;
    font-family: 'Ubuntu Mono', monospace;
    
    font-size: 85%;
    color: var(--ubuntu-orange);
  }

  .markdown-body pre {
    background-color: #2C001E;
    color: #FFFFFF;
    border-radius: 5px;
    padding: 16px;
    overflow: auto;
    font-family: 'Ubuntu Mono', monospace;
    font-size: 14px;
    line-height: 1.4;
    margin-bottom: 1.5em;
  }

  .markdown-body pre code {
    background-color: transparent;
    border: none;
    color: inherit;
    color: var(--ubuntu-orange);
    padding: 0;
    font-size: inherit;
  }

  .markdown-body blockquote {
    border-left: 4px solid #E95420;
    padding: 0 15px;
    color: #666666;
    font-style: italic;
    margin: 16px 0;
    background-color: #F7F7F7;
    border-radius: 0 5px 5px 0;
  }

  .markdown-body ul, .markdown-body ol {
    padding-left: 2em;
    margin-bottom: 1.5em;
  }

  .markdown-body li {
    margin-bottom: 0.5em;
  }

  .markdown-body table {
    border-collapse: separate;
    border-spacing: 0;
    margin: 16px 0;
    width: 100%;
    border: 1px solid #E1E1E1;
    border-radius: 5px;
    overflow: hidden;
  }

  .markdown-body table th, .markdown-body table td {
    border: 1px solid #E1E1E1;
    padding: 10px 13px;
  }

  .markdown-body table th {
    background-color: #F7F7F7;
    font-weight: 600;
    text-align: left;
    color: #E95420;
  }

  .markdown-body table tr:nth-child(even) {
    background-color: #F7F7F7;
  }

  .markdown-body img {
    max-width: 100%;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    border-radius: 5px;
    margin: 16px 0;
  }

  .markdown-body hr {
    height: 1px;
    padding: 0;
    margin: 24px 0;
    background-color: #E1E1E1;
    border: 0;
  }

  .markdown-body strong {
    font-weight: 600;
    color: #772953;
  }

  .markdown-body em {
    font-style: italic;
    color: #5E2750;
  }

  .markdown-body kbd {
    background-color: #F7F7F7;
    border: 1px solid #E1E1E1;
    border-radius: 3px;
    box-shadow: 0 1px 0 rgba(0,0,0,0.2), inset 0 0 0 2px #FFFFFF;
    color: var(--ubuntu-orange);
    display: inline-block;
    font-family: 'Ubuntu Mono', monospace;
    font-size: 11px;
    line-height: 1.4;
    margin: 0 0.1em;
    padding: 0.1em 0.6em;
  }

  /* Mermaid diagram styles */
  .mermaid-diagram {
    background-color: #F7F7F7;
    border: 1px solid #E1E1E1;
    border-radius: 5px;
    padding: 10px;
    margin: 16px 0;
    position: relative;
  }

  .mermaid-diagram::after {
    content: "Download PNG";
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #E95420;
    color: #FFFFFF;
    padding: 5px 10px;
    border-radius: 3px;
    font-size: 12px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  .mermaid-diagram::after:hover {
    background-color: #C84112;
  }

  /* Scrollbar styles */
  .ubuntu-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: #AEA79F #F7F7F7;
  }

  .ubuntu-scrollbar::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  .ubuntu-scrollbar::-webkit-scrollbar-track {
    background: #F7F7F7;
    border-radius: 4px;
  }

  .ubuntu-scrollbar::-webkit-scrollbar-thumb {
    background-color: #AEA79F;
    border-radius: 4px;
    border: 2px solid #F7F7F7;
  }

  .ubuntu-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #E95420;
  }

  code {
    color: var(--ubuntu-orange);
  }

   .markdown-body pre {
    background-color: #2C001E;
    color: #FFFFFF;
    border-radius: 5px;
    padding: 16px;
    overflow-x: auto;
    font-family: 'Ubuntu Mono', monospace;
    font-size: 14px;
    line-height: 1.4;
    margin-bottom: 1.5em;
    max-width: 100%;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .markdown-body pre code {
    background-color: transparent;
    border: none;
    color: inherit;
    padding: 0;
    font-size: inherit;
    max-width: 100%;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .markdown-body code {
    background-color: #F7F7F7;
    border: 1px solid #E1E1E1;
    border-radius: 3px;
    padding: 0.2em 0.4em;
    font-family: 'Ubuntu Mono', monospace;
    font-size: 85%;
    color: var(--ubuntu-orange);
    max-width: 100%;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`;

// Mermaid rendering component (unchanged)
const MermaidDiagram: React.FC<{ code: string }> = ({ code }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: "default",
      securityLevel: "loose",
    });

    if (ref.current) {
      mermaid.render("mermaid-diagram", code).then((result) => {
        if (ref.current) {
          ref.current.innerHTML = result.svg;
        }
      });
    }
  }, [code]);

  const downloadPNG = () => {
    if (ref.current) {
      const svg = ref.current.querySelector("svg");
      if (svg) {
        const svgData = new XMLSerializer().serializeToString(svg);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          const pngFile = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.download = "mermaid-diagram.png";
          downloadLink.href = pngFile;
          downloadLink.click();
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
      }
    }
  };

  return (
    <div ref={ref} className="mermaid-diagram">
      <button onClick={downloadPNG} className="download-btn">
        Download PNG
      </button>
    </div>
  );
};

// Custom renderer for code blocks
const CodeBlock: React.FC<{
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}> = ({ inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || "");
  const language = match && match[1];

  if (language === "mermaid") {
    return <MermaidDiagram code={String(children).replace(/\n$/, "")} />;
  }

  return !inline && language ? (
    <SyntaxHighlighter
      style={tomorrow}
      language={language}
      PreTag="div"
      {...props}
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};
// Slash commands
const slashCommands = [
  { name: "/help", description: "Show available commands" },
  { name: "/clear", description: "Clear chat history" },
  { name: "/model", description: "Change AI model" },
  { name: "/save", description: "Save chat history" },
  { name: "/load", description: "Load saved chat history" },
];

export default function Chatbot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [model, setModel] = useState("gpt-4o");
  const [slashCommandSuggestions, setSlashCommandSuggestions] = useState([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const toast = useToast();

  const sendMessage = async () => {
    if (!input.trim() || isStreaming) return;

    const userMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsStreaming(true);

    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          model: model,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to communicate with AI");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      const aiResponse = { role: "assistant", content: "" };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        const lines = chunk.split("\n\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(5).trim();
            if (data === "[DONE]") {
              setIsStreaming(false);
              break;
            }
            try {
              const { text } = JSON.parse(data);
              aiResponse.content += text;
              setMessages((prevMessages) =>
                prevMessages.map((msg, i) =>
                  i === prevMessages.length - 1 ? { ...aiResponse } : msg
                )
              );
            } catch (error) {
              console.error("Error parsing chunk:", error);
            }
          }
        }
      }
    } catch (error) {
      console.error("Error sending message to AI:", error);
      const errorMessage = {
        role: "system",
        content: "Error communicating with AI. Please try again.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      toast({
        title: "Error",
        description: "Failed to communicate with AI",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsStreaming(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    if (value.startsWith("/")) {
      const matchingCommands = slashCommands.filter((cmd) =>
        cmd.name.startsWith(value)
      );
      setSlashCommandSuggestions(matchingCommands);
    } else {
      setSlashCommandSuggestions([]);
    }
  };

  const handleSlashCommand = (command) => {
    switch (command) {
      case "/clear":
        setMessages([]);
        break;
      case "/model":
        // Toggle between models
        setModel((prevModel) =>
          prevModel === "gpt-4o" ? "gpt-4o-mini" : "gpt-4o"
        );
        toast({
          title: "Model Changed",
          description: `Now using ${
            model === "gpt-4o" ? "GPT-4o-mini" : "GPT-4o"
          }`,
          status: "info",
          duration: 3000,
          isClosable: true,
        });
        break;
      case "/save":
        saveChat();
        break;
      case "/load":
        loadChat();
        break;
      case "/help":
        const helpMessage = {
          role: "system",
          content:
            "# Available commands:\n" +
            slashCommands
              .map((cmd) => `${cmd.name} - ${cmd.description}`)
              .join("\n"),
        };
        setMessages((prevMessages) => [...prevMessages, helpMessage]);
        break;
      default:
        break;
    }
    setInput("");
    setSlashCommandSuggestions([]);
  };

  const saveChat = () => {
    localStorage.setItem("savedChat", JSON.stringify(messages));
    toast({
      title: "Chat Saved",
      description: "Your chat has been saved successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const loadChat = () => {
    const savedChat = localStorage.getItem("savedChat");
    if (savedChat) {
      setMessages(JSON.parse(savedChat));
      toast({
        title: "Chat Loaded",
        description: "Your saved chat has been loaded",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "No Saved Chat",
        description: "There is no saved chat to load",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const deleteChat = () => {
    setMessages([]);
    localStorage.removeItem("savedChat");
    toast({
      title: "Chat Deleted",
      description: "Your chat has been deleted",
      status: "info",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box h="full" display="flex" flexDirection="column" bg={ubuntuTheme.white}>
      <style>{ubuntuMarkdownStyles}</style>
      <HStack p={4} bg={ubuntuTheme.orange} color={ubuntuTheme.white}>
        <Text fontWeight="bold" fontSize="xl">
          Ubuntu Chatbot
        </Text>
        <Menu>
          <MenuButton as={Button} colorScheme="whiteAlpha">
            Menu
          </MenuButton>
          <MenuList>
            <MenuItem onClick={saveChat}>Save Chat</MenuItem>
            <MenuItem onClick={loadChat}>Load Chat</MenuItem>
            <MenuItem onClick={deleteChat}>Delete Chat</MenuItem>
            <MenuItem onClick={() => setModel("gpt-4o-mini")}>
              Use GPT-4o-mini
            </MenuItem>
            <MenuItem onClick={() => setModel("gpt-4o")}>Use GPT-4o</MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      <VStack
        flex={1}
        overflowY="auto"
        overflowX={"hidden"}
        spacing={8} // Increased spacing between messages
        p={6} // Increased padding
        align="stretch"
        bg={ubuntuTheme.lightGrey} // Light background for better readability
        className="ubuntu-scrollbar"
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            maxWidth="80%" // Increased max width for better readability
            alignSelf={message.role === "user" ? "flex-end" : "flex-start"}
          >
            <Text
              fontWeight="bold"
              color={
                message.role === "user"
                  ? ubuntuTheme.orange
                  : ubuntuTheme.purple
              }
              mb={2} // Increased margin bottom
              fontSize="lg" // Larger font size for role label
            >
              {message.role === "user" ? "You:" : "AI:"}
            </Text>
            <Box
              bg={ubuntuTheme.white}
              color={ubuntuTheme.coolGrey}
              p={4} // Increased padding
              borderRadius="md"
              boxShadow="md" // Added shadow for depth
              overflow={"none"}
            >
              <ReactMarkdown
                remarkPlugins={[gfm]}
                components={{
                  code: CodeBlock,
                }}
              >
                {message.content}
              </ReactMarkdown>
            </Box>
          </Box>
        ))}
      </VStack>
      <Box p={4} bg={ubuntuTheme.coolGrey}>
        <Flex>
          <IconButton
            aria-label="Attach file"
            icon={<AttachmentIcon />}
            mr={2}
            onClick={() => console.log("Attach file")}
          />
          <IconButton
            aria-label="Voice input"
            icon={<FaMicrophone />}
            mr={2}
            onClick={() => console.log("Voice input")}
          />
          <Popover
            isOpen={slashCommandSuggestions.length > 0}
            placement="top-start"
          >
            <PopoverTrigger>
              <Input
                flex={1}
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message or use / for commands..."
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                bg={ubuntuTheme.white}
                size="lg" // Larger input
                borderRadius="md"
              />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody>
                {slashCommandSuggestions.map((cmd, index) => (
                  <Box
                    key={index}
                    p={2}
                    _hover={{ bg: ubuntuTheme.warmGrey }}
                    cursor="pointer"
                    onClick={() => handleSlashCommand(cmd.name)}
                  >
                    {cmd.name} - {cmd.description}
                  </Box>
                ))}
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Button
            onClick={sendMessage}
            ml={4} // Increased margin
            colorScheme="orange"
            isLoading={isStreaming}
            loadingText="Sending..."
            size="lg" // Larger button
          >
            Send
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}
