// lib/ngrokUtils.js
import ngrok from 'ngrok'

let ngrokUrl = null

export async function startNgrokTunnel(port) {
  try {
    ngrokUrl = await ngrok.connect({
      addr: port,
      onStatusChange: status => {
        console.log('Ngrok Status:', status)
      },
      onLogEvent: data => {
        console.log('Ngrok Log:', data)
      },
    })
    console.log('Ngrok tunnel started:', ngrokUrl)
    return ngrokUrl
  } catch (error) {
    console.error('Error starting ngrok tunnel:', error)
    throw error
  }
}

export function getNgrokUrl() {
  return ngrokUrl
}

export async function stopNgrokTunnel() {
  if (ngrokUrl) {
    await ngrok.disconnect(ngrokUrl)
    await ngrok.kill()
    console.log('Ngrok tunnel stopped')
    ngrokUrl = null
  }
}

// Use this in your server.js or custom server file
import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { startNgrokTunnel, stopNgrokTunnel } from './lib/ngrokUtils'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  })

  const port = process.env.PORT || 3000
  server.listen(port, async (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
    
    try {
      const ngrokUrl = await startNgrokTunnel(port)
      console.log(`> Ngrok tunnel established at: ${ngrokUrl}`)
    } catch (error) {
      console.error('Failed to start ngrok tunnel:', error)
    }
  })

  process.on('SIGTERM', async () => {
    console.log('SIGTERM received, closing server and ngrok tunnel')
    await stopNgrokTunnel()
    server.close(() => {
      console.log('Server closed')
      process.exit(0)
    })
  })
})