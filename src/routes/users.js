const express = require('express');
const router = express.Router();
const prisma = require('../db');
const bcrypt = require('bcrypt');


// create user
router.post('/', async (req, res) => {
try {
const { name, email, password } = req.body;
if (!name || !email || !password) return res.status(400).json({ error: 'name,email,password required' });
const passwordHash = await bcrypt.hash(password, 10);
const user = await prisma.user.create({ data: { name, email, passwordHash } });
res.status(201).json({ id: user.id, name: user.name, email: user.email });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'server error' });
}
});


// get user
router.get('/:id', async (req, res) => {
const id = Number(req.params.id);
const user = await prisma.user.findUnique({ where: { id }, include: { polls: true } });
if (!user) return res.status(404).json({ error: 'user not found' });
res.json(user);
});


module.exports = router;