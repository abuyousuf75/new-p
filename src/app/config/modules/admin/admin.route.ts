import express from 'express';
import { AdminControlers } from './admin.controler';
import validateRequest from '../../middleWares/validateRequest';
import { adminValidations } from './admin.validation';

const router = express.Router();


router.get('/', AdminControlers.getAllAdmin);
router.get('/:id',AdminControlers.getAAdmin);
router.patch('/:id', validateRequest(adminValidations.updateAdminValidationSchema), AdminControlers.updateAAdmin);
router.delete('/:id',AdminControlers.deleteAdmin)


export const AdminRouters = router;