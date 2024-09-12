// pages/index.js
import Head from 'next/head'
import Desktop from './components/Desktop/Desktop'
import MenuBar from './components/MenuBar/MenuBar'
import Dock from './components/Dock/Dock'

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title>JARVIS OS</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MenuBar />
      <main className="flex-grow overflow-hidden">
        <Desktop />
      </main>
    </div>
  )
}
