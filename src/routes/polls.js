const express = require('express');
const router = express.Router();
const prisma = require('../db');


// create poll with options
router.post('/', async (req, res) => {
try {
const { question, creatorId, options = [], isPublished = false } = req.body;
if (!question || !creatorId || !Array.isArray(options) || options.length < 2) {
return res.status(400).json({ error: 'question, creatorId and at least 2 options required' });
}


const poll = await prisma.poll.create({
data: {
question,
isPublished,
creator: { connect: { id: Number(creatorId) } },
options: { create: options.map(text => ({ text })) }
},
include: { options: true }
});


res.status(201).json(poll);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'server error' });
}
});


// get poll with options and vote counts
router.get('/:id', async (req, res) => {
const id = Number(req.params.id);
const options = await prisma.pollOption.findMany({
where: { pollId: id },
include: { votes: true }
});
const poll = await prisma.poll.findUnique({ where: { id }, include: { creator: true } });
if (!poll) return res.status(404).json({ error: 'poll not found' });


const results = options.map(o => ({ id: o.id, text: o.text, votes: o.votes.length }));
res.json({ poll, results });
});


// add option to poll
router.post('/:id/options', async (req, res) => {
const pollId = Number(req.params.id);
const { text } = req.body;
if (!text) return res.status(400).json({ error: 'text required' });
const option = await prisma.pollOption.create({ data: { text, poll: { connect: { id: pollId } } } });
res.status(201).json(option);
});


module.exports = router;