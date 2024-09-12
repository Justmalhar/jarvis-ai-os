// components/Apps/FileViewer.js
"use client";
import { useState, useEffect } from 'react'
import { Box, Text, Image, VStack } from '@chakra-ui/react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'

export default function FileViewer({ filePath }) {
  const [content, setContent] = useState(null)
  const [fileType, setFileType] = useState(null)

  useEffect(() => {
    // In a real application, you would fetch the file content and type from your backend
    // This is a mock implementation
    const fetchFileContent = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock file types and content
      const fileExtension = filePath.split('.').pop().toLowerCase()
      switch (fileExtension) {
        case 'txt':
          setFileType('text')
          setContent('This is a sample text file content.')
          break
        case 'jpg':
        case 'png':
          setFileType('image')
          setContent('/sample-image.jpg') // Path to a sample image in your public folder
          break
        case 'js':
        case 'py':
        case 'html':
          setFileType('code')
          setContent('function helloWorld() {\n  console.log("Hello, World!");\n}')
          break
        default:
          setFileType('unknown')
          setContent('Unsupported file type')
      }
    }

    fetchFileContent()
  }, [filePath])

  const renderContent = () => {
    switch (fileType) {
      case 'text':
        return <Text>{content}</Text>
      case 'image':
        return <Image src={content} alt="File preview" />
      case 'code':
        return (
          <CodeMirror
            value={content}
            height="300px"
            extensions={[javascript({ jsx: true })]}
            editable={false}
            theme="dark"
          />
        )
      default:
        return <Text>Unable to preview this file type</Text>
    }
  }

  return (
    <Box p={4}>
      <Text fontSize="xl" mb={4}>File Viewer: {filePath}</Text>
      {content ? renderContent() : <Text>Loading...</Text>}
    </Box>
  )
}