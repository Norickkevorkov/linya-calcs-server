import {Router} from 'express';
import {addEvent, getEvent, editEvent, getEvents, removeEvent} from "../../../controllers/events-controller";
import authMiddleware from "../../../middlewares/auth-middleware";

const router = Router();

router.get('/events', authMiddleware, getEvents);
router.get('events/:id', authMiddleware, getEvent);
router.post('/events', authMiddleware, addEvent);
router.put('/events/:id', authMiddleware, editEvent);
router.delete('/events/:id', authMiddleware, removeEvent);

export default router;