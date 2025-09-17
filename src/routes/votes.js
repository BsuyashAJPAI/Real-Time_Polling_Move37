const express = require('express');
const router = express.Router();
const prisma = require('../db');
const broadcast = require('../utils/broadcast');


// Cast a vote
// body: { userId, pollOptionId }
router.post('/', async (req, res) => {
try {
const { userId, pollOptionId } = req.body;
if (!userId || !pollOptionId) return res.status(400).json({ error: 'userId and pollOptionId required' });


// create vote (unique constraint prevents duplicates)
const vote = await prisma.vote.create({ data: { user: { connect: { id: Number(userId) } }, pollOption: { connect: { id: Number(pollOptionId) } } } });


// find poll id for broadcasting
const option = await prisma.pollOption.findUnique({ where: { id: Number(pollOptionId) } });
const pollId = option.pollId;


// broadcast updated results
await broadcast.broadcastPollResults(pollId);


res.status(201).json({ ok: true, voteId: vote.id });
} catch (err) {
console.error(err);
if (err.code === 'P2002') {
return res.status(409).json({ error: 'already voted for this option' });
}
res.status(500).json({ error: 'server error' });
}
});


module.exports = router;