import express from 'express';
import { AdminControlers } from './admin.controler';
import validateRequest from '../../middleWares/validateRequest';
import { adminValidations } from './admin.validation';
import auth from '../../middleWares/auth';

const router = express.Router();


router.get('/', AdminControlers.getAllAdmin);
router.get('/:id',AdminControlers.getAAdmin);
router.patch('/:id', auth('admin') ,validateRequest(adminValidations.updateAdminValidationSchema), AdminControlers.updateAAdmin);
router.delete('/:id', auth('admin'), AdminControlers.deleteAdmin);


export const AdminRouters = router;