import express from 'express';
import * as clienteController from '../controllers/clienteController.js';
import validade from '../middlewares/validate.js';
import { usuarioCreateSchema, usuarioUpdateSchema } from '../controllers/clienteController.js'
//import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router();
//router.use(authMiddleware);

router.post('/', validade(usuarioCreateSchema), clienteController.adicionaUsuario);
router.get('/', clienteController.listarUsuarios);
router.put('/:cpf', validade(usuarioUpdateSchema), clienteController.atualizarUsuario);
router.delete('/:cpf', clienteController.deletarUsuario);

export default router