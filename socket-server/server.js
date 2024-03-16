const io = require('socket.io')(3001, {
  cors: {
    origin: [
      'https://instagram-clone-w91x-chandra-prakashs-projects-e92703e1.vercel.app',
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('User Connected');

  socket.on('like', (currLike, id) => {
    console.log({ currLike, id });
    io.emit('like', currLike, id);
  });
  socket.on('update-comment', (comment, id) => {
    console.log({ comment, id });
    io.emit('update-comment', comment, id);
  });
});
