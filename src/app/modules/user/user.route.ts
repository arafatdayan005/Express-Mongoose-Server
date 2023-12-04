import express from 'express';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUser);
router.get('/:userId', UserControllers.getSingleUser);
router.put('/:userId', UserControllers.updateUser);
router.delete('/:userId', UserControllers.deleteUser);
router.put('/:userId/orders', UserControllers.addOrders);
router.get('/:userId/orders', UserControllers.getOrders);
router.get('/:userId/orders/total-price', UserControllers.getTotalPrice);

export const UserRoutes = router;