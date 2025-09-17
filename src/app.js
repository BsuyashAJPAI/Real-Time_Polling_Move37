const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/users');
const pollsRouter = require('./routes/polls');
const votesRouter = require('./routes/votes');


const app = express();
app.use(cors());
app.use(express.json());


app.use('/users', usersRouter);
app.use('/polls', pollsRouter);
app.use('/votes', votesRouter);


app.get('/', (req, res) => {
res.json({ ok: true, message: 'Move37 Poll Backend' });
});


module.exports = app;