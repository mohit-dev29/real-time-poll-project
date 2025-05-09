import express from 'express';
import { createPoll, votePoll } from '../controllers/poll.controller';
const router = express.Router();

router.post('/', createPoll);
router.post('/:id/vote', votePoll);

export default router;
