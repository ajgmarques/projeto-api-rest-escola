// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Não deve existir em um sistema real
// router.get('/', loginRequired, userController.index); // Lista todos os users
// router.get('/:id', userController.show); // Lista um user

router.post('/', loginRequired, userController.store);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;
