function fazerPizzas(sabor) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        resolve(`Pizza de ${sabor} pronta!`)    
        }, 5000);
    })
}

export async function pedirPizza() {
   console.log('Pedido enviado para a cozinha');
   try {
    const pedidoPizza = await fazerPizzas('Frango')

    console.log(`Finalmente chegou, ${pedidoPizza}`);
   } catch (error) {
    console.log(`Deu ruim: ${error.message}`);
    
   }
}