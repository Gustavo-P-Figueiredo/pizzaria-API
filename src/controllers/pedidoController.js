import * as pedidoService from "../services/pedidoService.js";
import Joi from "joi";

export const pedidoCreateSchema = Joi.object({
    ipPedido: Joi.number().required(),
    formaPagto: Joi.string().required().max(10),
    valorTotal: Joi.number().required(),
    idEntregador: Joi.number().required(),
    cpf: Joi.string().length(11).required(),
    statusPedido: Joi.string().required().max(10),  
    formaEntrega: Joi.string().required().max(10)
})

export const pedidoUpdateSchema = Joi.object({
    formaPagto: Joi.string().max(10),
    valorTotal: Joi.number().max(10),
    idEntregador: Joi.number(),
    cpf: Joi.string().length(11),
    statusPedido: Joi.string().max(10),  
    formaEntrega: Joi.string().max(10)
}).min(1);

export const listarPedidos = async (req, res) => {
    try {
        const { idPedido, cpf, statusPedido} = req.query;
        const pedido = await pedidoService.findAll(idPedido, cpf, statusPedido);    

        res.json(pedido);
    } catch (err) {
        console.error('Erro ao buscar pedido: ', err);
    }
}

    export const adicionaPedido = async (req, res) => {
        try {
            const novoPedido = await pedidoService.create(req.body);
            res.status(201).json({message: 'Pedido adicionado com sucesso', data: novoPedido});
        } catch (err) {
            console.error('Erro ao adicionar pedido: ', err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ error: 'Pedido já cadastrado.'});
            }
            res.status(500).json({ error: 'Erro ao adicionar pedido'});
        }
    }

export const atualizarPedido = async(req, res) => {
    try {
        const { idPedido } = req.params;
        const update = await pedidoService.update(idPedido, req.body);
        res.json({message: 'Pedido atualizado com sucesso', data: update});
    } catch (err) {
        console.error('Erro ao atualizar pedido: ', err);
        res.status(500).json({ error: 'Erro ao atualizar pedido'});
    }
}

export const deletarPedido = async(req, res) => {
    try {
        const { idPedido } = req.params;
        const deletado = await pedidoService.remove(idPedido);
        if(!deletado) {
            return res.status(404).json({error: 'Pedido não encontrado'});
        }
        res.status(200).json({message: 'Pedido deletado com sucesso'});
    } catch (err) {
        console.error('Erro ao deletar pedido: ', err);
        res.status(500).json({ error: 'Erro ao deletar pedido'});
    }
}