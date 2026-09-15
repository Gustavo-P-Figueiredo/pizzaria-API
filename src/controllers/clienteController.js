import * as clienteService from "../services/clienteService.js";
import Joi from "joi";

export const usuarioCreateSchema = Joi.object({
    cpf: Joi.string().length(11).required(),
    nome: Joi.string().required().max(100),
    endereco: Joi.string().required().max(100),
    bairro: Joi.string().max(30),
    cidade: Joi.string().max(30),
    cep: Joi.string().length(8).required(),
    telefone: Joi.number().required(),
    email: Joi.string().required().max(50),
    senha: Joi.string().required().max(100),
    tipo: Joi.string().required().max(10)
});

export const usuarioUpdateSchema = Joi.object({
    nome: Joi.string().max(100),
    endereco: Joi.string().max(100),
    bairro: Joi.string().max(30),
    cidade: Joi.string().max(30),
    cep: Joi.string().length(8),
    telefone: Joi.number(),
    email: Joi.string().max(50),
    senha: Joi.string().max(100)
}).min(1);

export const listarUsuarios = async (req, res) => {
    try {
        const { cpf, nome, email} = req.query;
        const usuario = await clienteService.findAll(cpf, nome, email);

        res.json(usuario);
    } catch (err) {
        console.error('Erro ao buscar usuario: ', err);
    }
}

export const adicionaUsuario = async (req, res) => {
    try {
        const novoCliente = await clienteService.create(req.body);
        res.status(201).json({message: 'Cliente adicionado com sucesso', data: novoCliente});
    } catch (err) {
        console.error('Erro ao adicionar usuario: ', err);
        if (err.code === 'ER_DUP_ENRTY') {
            return res.status(409).json({ error: 'CPF já cadastrado.'});
        }
    res.status(500).json({ error: 'Erro ao adicionar cliente'})    
    }
}

export const atualizarUsuario = async(req, res) => {
    try {
        const { cpf } = req.params;
        const update = await clienteService.update(cpf, req.body);
        
        if(!update) {
            return res.status(404).json({error: 'Usuario não encontrado'});
        }
        res.status(200).json({ message: 'Usuario atualizado com sucesso'})
    } catch (err) {
        console.error('Erro ao atualizar usuario', err);
        res.status(500).json({error: 'Erro ao atualizar usuario'});
    }
}

export const deletarUsuario = async(req, res) => {
    try {
        const { cpf } = req.params;
        const deleted = await clienteService.remove(cpf);
        if(!deleted) {
            return res.status(404).json({error: 'Usuario não encontrado'});
        }
        res.status(200).json({ message: 'Usuario deletado com sucesso'})
    } catch (err) {
        console.error('Erro ao deletado usuario', err);
        res.status(500).json({error: 'Erro ao deletado usuario'});
    }
} 