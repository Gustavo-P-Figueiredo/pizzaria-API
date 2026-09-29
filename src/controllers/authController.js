import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as clienteService from '../services/clienteService.js';

export const login = async (req, res) => {
    const { cpf, senha } = req.body;
try {
    const clientes = await clienteService.findAll(cpf);
    const cliente = clientes[0];

    if (!cliente) {
        return res.status(401).json({ message: 'CPF ou senha inválidos' });
    }

    const senhaValida = await bcrypt.compare(senha, cliente.senha);
    if (!senhaValida) {
        return res.status(401).json({ message: 'CPF ou senha inválidos' });
    }

    const payload = { cpf: cliente.cpf, email: cliente.email };

    const token = jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.json({ message: 'Login bem-sucedido', token: token });
} catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
}
