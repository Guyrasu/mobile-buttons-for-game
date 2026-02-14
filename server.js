import express from 'express'
import path from 'path'
const app = express()
const PORT = 3001

// Serve static files from the 'public' directory
app.use( express.static( 'public' ) )

app.listen( PORT, '0.0.0.0', () => {
    console.log(`
            Game Server Running!
            Local: http://localhost:${PORT}
            Android: http://127.0.0.1:${PORT}
        `)
} )