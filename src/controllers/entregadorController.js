import * as entregadorService from '../services/entregadorService.js'
import Joi from 'joi'
 
 
export const entregadorCreateSchema = Joi.object({
    idEntregador: Joi.number().required(),
    nomeEntregador: Joi.string().required().max(100),
    telefone: Joi.number().required()
});
 
export const entregadorUpdateSchema = Joi.object({
    nomeEntregador: Joi.string().required().max(100),
    telefone: Joi.number().required()
}).min(1);
 
export const listarEntregadores = async (req, res) => {
    try{
        const { idEntregador, nomeEntregador, telefone} = req.query;
 
        const entregadores = await entregadorService.findAll(idEntregador, nomeEntregador, telefone);
 
        res.json(entregadores);
    } catch (err){
        console.error('Erro ao buscar entregadores', err);
        res.status(500).json({message: 'Erro ao buscar entregadores'});
    }
}
 
export const adicionarEntregador = async (req, res) =>{
    try{
        const novoEntregador = await entregadorService.criar(req.body);
        res.status(201).json({message: 'Entregador adicionado com sucesso'});
    } catch(err){
        console.error('Erro ao adicionar entregador', err);
        res.status(500).json({message: 'Erro ao adicionar entregador'});
    }
}
 
export const atualizarEntregador = async (req, res) => {
    try {
        const {idEntregador} = req.params;
        const updated = await entregadorService.update(req.body, idEntregador);
 
        if (!updated){
            res.status(404).json({message: 'Entregador não encotrado'});
        }
        res.json({ message: 'Entregador atualizado.'})
    } catch (err){
        console.log('Erro ao atualizar entregador', err);
        res.status(500).json({message: 'Erro ao atualizar entregador.'});
    }
}
 
export const removerEntregador = async (req, res) => {
    try{
        const {idEntregador} = req.params;
        const removed = await entregadorService.remover(idEntregador)
        if (!removed){
            res.status(404).json({message: ''})
        }
    } catch (err){
        console.error('Erro ao remover entregador:', err);
        res.status(500).json({message: 'Erro ao remover entregador'});
    }
}