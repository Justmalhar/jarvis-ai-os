// pages/api/docker.js
import Docker from 'dockerode'

const docker = new Docker()

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { command } = req.body

    try {
      const container = await docker.createContainer({
        Image: 'ubuntu',
        Cmd: ['/bin/bash', '-c', command],
        Tty: true
      })

      await container.start()

      const logs = await container.logs({
        follow: true,
        stdout: true,
        stderr: true
      })

      let output = ''
      logs.on('data', (chunk) => {
        output += chunk.toString('utf8')
      })

      logs.on('end', async () => {
        await container.remove()
        res.status(200).json({ output })
      })
    } catch (error) {
      console.error('Docker API error:', error)
      res.status(500).json({ error: 'Error executing Docker command' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}