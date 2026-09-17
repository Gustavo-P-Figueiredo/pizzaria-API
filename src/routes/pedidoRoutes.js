import express from 'express';
import * as pedidoController from '../controllers/pedidoController.js';
import validade from '../middlewares/validate.js';
import { pedidoCreateSchema, pedidoUpdateSchema } from '../controllers/pedidoController.js'

const router = express.Router();

router.post('/', validade(pedidoCreateSchema), pedidoController.adicionaPedido);
router.get('/', pedidoController.listarPedidos);
router.put('/:idPedido', validade(pedidoUpdateSchema), pedidoController.atualizarPedido);
router.delete('/:idPedido', pedidoController.deletarPedido);

export default router