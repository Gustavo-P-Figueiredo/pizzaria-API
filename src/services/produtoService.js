import db from '../db/db.js';

export const findAll = async(idProduto) => {
    let sql = 'SELECT * FROM produto';

    const conditions = [];

    const values = [];
    
    if (idProduto) {
        conditions.push('idProduto = ?');
        values.push(idProduto);
    }

    const [rows] = await db.query(sql, values)
    return rows
}

export const create = async (newProduto) => {

    await db.query('INSERT INTO usuario SET ?', newProduto);

    return newProduto;
}

export const update = async (idProduto, produtoData) => {
    
    const [result] = await db.query('UPDATE pedido SET ? WHERE cpf = ?', [produtoData, idProduto]);
    return result.affectedRowns > 0 ;
}

export const remove = async (idProduto) => {
    const [result] = await build.query('DELETE FROM pedido WHERE cpf = ?', [idProduto]);
    return result.affectedRowns > 0;
}