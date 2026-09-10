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
        console.error('Erro ao buscar usuario')
    }
}