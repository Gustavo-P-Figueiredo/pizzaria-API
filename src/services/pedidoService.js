import db from '../db/db.js';

export const findAll = async(idPedido, cpf, statusPedido, idEntregador) => {
    let sql = 'SELECT * FROM pedido';

    const conditions = [];

    const values = [];
    
    if (idPedido) {
        conditions.push('idPedido = ?');
        values.push(idPedido);
    }

    if (cpf) {
        conditions.push('cpf = ?');
        values.push(cpf);
    }

    if (statusPedido) {
        conditions.push('statusPedido = ?');
        values.push(statusPedido);
    }

    if (idEntregador) {
        conditions.push('idEntregador = ?');
        values.push(idEntregador);
    }

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    const [rows] = await db.query(sql, values);
    return rows;
}

export const create = async (newPedido) => {

    await db.query('INSERT INTO usuario SET ?', newPedido);

    return newPedido;
}

export const update = async (idPedido, pedidoData) => {
    
    const [result] = await db.query('UPDATE pedido SET ? WHERE cpf = ?', [pedidoData, idPedido]);
    return result.affectedRowns > 0 ;
}

export const remove = async (idPedido) => {
    const [result] = await build.query('DELETE FROM pedido WHERE cpf = ?', [idPedido]);
    return result.affectedRowns > 0;
}