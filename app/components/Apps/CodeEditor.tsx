
// components/Apps/CodeEditor.js
import { useState } from 'react'
import { Box } from '@chakra-ui/react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { githubLight } from '@uiw/codemirror-theme-github'

export default function CodeEditor() {
  const [code, setCode] = useState('// Start coding here')

  const onChange = (value) => {
    setCode(value)
  }

  return (
    <Box className="h-full ubuntu-scrollbar">
      <CodeMirror
        value={code}
        height="100%"
        extensions={[javascript({ jsx: true })]}
        onChange={onChange}
        theme={githubLight}
        className="ubuntu-scrollbar"
      />
    </Box>
  )
}