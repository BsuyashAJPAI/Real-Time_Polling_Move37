const prisma = require('../db');
let io = null;


module.exports = {
init(socketServer) {
io = socketServer;
},


// send poll results to room poll:<id>
async broadcastPollResults(pollId) {
if (!io) return;


// get options and counts
const options = await prisma.pollOption.findMany({
where: { pollId: Number(pollId) },
include: {
votes: true,
}
});


const results = options.map(opt => ({
id: opt.id,
text: opt.text,
votes: opt.votes.length
}));


const room = `poll:${pollId}`;
io.to(room).emit('poll:update', { pollId, results });
}
};