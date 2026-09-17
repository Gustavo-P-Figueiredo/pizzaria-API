import * as produtoService from "../services/produtoService.js";
import Joi from "joi";

export const produtoCreateSchema = Joi.object({
    idProduto: Joi.number().required(),
    nomeProduto: Joi.string().required().max(30),
    descricao: Joi.string().required().max(100),
    tipo: Joi.string().required().max(20),
    valor: Joi.number().required(),
    imagem: Joi.string().required().max(200)
})

export const produtoUpdateSchema = Joi.object({
    nomeProduto: Joi.string().max(30),
    descricao: Joi.string().max(100),
    tipo: Joi.string().max(20),
    valor: Joi.number(),
    imagem: Joi.string().max(200)
}).min(1);

export const listarProdutos = async (req, res) => {
    try {
        const { idProduto, nomeProduto, tipo } = req.query;
        const produto = await produtoService.findAll(idProduto, nomeProduto, tipo);

        res.json(produto);
    } catch (err) {
        console.error('Erro ao buscar produto: ', err);
    }
}

export const adicionaProduto = async (req, res) => {
    try {
        const novoProduto = await produtoService.create(req.body);
        res.status(201).json({message: 'Produto adicionado com sucesso', data: novoProduto});
    } catch (err) {
        console.error('Erro ao adicionar produto: ', err);
        res.status(500).json({ error: 'Erro ao adicionar produto' });
    }
}

export const atualizarProduto = async(req, res) => {
    try {
        const { idProduto } = req.params;
        const update = await produtoService.update(idProduto, req.body);
        res.json({message: 'Produto atualizado com sucesso', data: update});
    } catch (err) {
        console.error('Erro ao atualizar produto: ', err);
        res.status(500).json({ error: 'Erro ao atualizar produto'});
    }
}

export const deletarProduto = async(req, res) => {
    try {
        const { idProduto } = req.params;
        const deletado = await produtoService.remove(idProduto);
        if (!deletado) {
            res.status(404).json({error: 'Produto não encontrado'});
        } 
        res.json({message: 'Produto deletado com sucesso'});
    } catch (err) {
        console.error('Erro ao deletar produto: ', err);
        res.status(500).json({ error: 'Erro ao deletar produto'});
    }
}