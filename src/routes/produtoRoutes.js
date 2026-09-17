import express from 'express';
import * as produtoController from '../controllers/produtoController.js';
import validade from '../middlewares/validate.js';
import { produtoCreateSchema, produtoUpdateSchema } from '../controllers/produtoController.js'

const router = express.Router();

router.post('/', validade(produtoCreateSchema), produtoController.adicionaProduto);
router.get('/', produtoController.listarProdutos);
router.put('/:idProduto', validade(produtoUpdateSchema), produtoController.atualizarProduto);
router.delete('/:idProduto', produtoController.deletarProduto);

export default router