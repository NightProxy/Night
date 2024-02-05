import express from 'express';
import http from 'node:http';
import { createBareServer } from '@tomphttp/bare-server-node';
import cors from 'cors';
import path from "path";

const server = http.createServer();
const app = express(server);
const __dirname = process.cwd();
const bareServer = createBareServer('/bare/');
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/static'));
app.use(cors());


app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/pages/index.html'));
});

app.get('/index', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/pages/index.html'));
});

app.get('/apps', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/pages/apps.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/pages/about.html'));
});

app.get('/extras', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/pages/e.html'));
});

app.get('/edu', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/pages/edu.html'));
});

app.get('/games', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/pages/games.html'));
});

app.get('/s', (req, res) => {
  res.sendFile(path.join(process.cwd(), '/pages/settings.html'));
});

server.on('request', (req, res) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeRequest(req, res)
  } else {
    app(req, res)
  }
})

server.on('upgrade', (req, socket, head) => {
  if (bareServer.shouldRoute(req)) {
    bareServer.routeUpgrade(req, socket, head)
  } else {
    socket.end()
  }
})

server.on('listening', () => {
  console.log(`Running at http://localhost:${PORT}`)
})

server.listen({ port: PORT, })
