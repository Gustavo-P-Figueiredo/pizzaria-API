import express from 'express';
import * as entregadorController from '../controllers/entregadorController.js';
import { entregadorCreateSchema, entregadorUpdateSchema } from '../controllers/entregadorController.js';
import validate from '../middlewares/validate.js';
 
const router = express.Router();
 
//rota de criar
router.post('/', validate(entregadorCreateSchema), entregadorController.adicionarEntregador);
 
router.get('/', entregadorController.listarEntregadores);
 
router.put('/:idEntregador', validate(entregadorUpdateSchema), entregadorController.atualizarEntregador);
 
router.delete('/:idEntregador', entregadorController.removerEntregador);
 
export default router;