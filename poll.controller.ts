import Poll from '../models/poll.model';

export const createPoll = async (req, res) => {
  const { question, durationMinutes } = req.body;
  const expiresAt = new Date(Date.now() + durationMinutes * 60000);
  const poll = await Poll.create({ question, expiresAt });
  res.status(201).json(poll);
};

export const votePoll = async (req, res) => {
  const { id } = req.params;
  const { vote } = req.body;
  const voterId = req.ip;
  const poll = await Poll.findById(id);
  if (!poll || new Date() > new Date(poll.expiresAt)) return res.status(403).json({ message: 'Poll expired' });
  if (poll.voters.includes(voterId)) return res.status(403).json({ message: 'Already voted' });
  vote === 'like' ? poll.responses.likes++ : poll.responses.dislikes++;
  poll.voters.push(voterId);
  await poll.save();
  req.app.get('io').to(id).emit('poll-update', poll.responses);
  res.json({ success: true });
};