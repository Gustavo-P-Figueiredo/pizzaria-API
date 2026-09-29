import jwt from 'jsonwebtoken';
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    const token = authHeader.split(' ');
    if (token.length !== 2) {
        return res.status(401).json({ message: 'Token inválido' });
    }

    const [scheme, tokenValue] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ message: 'Token mal informado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.userCpf = decoded.cpf;
        req.userEmail = decoded.email;
        return next();
    });
}

export default authMiddleware;