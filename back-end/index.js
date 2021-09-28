// //index.js
// (async () => {
//     const database = require('./database');
//     const Produto = require('./models/produto.js');
    
//     //CONECT
//     try {
//         const resultado = await database.sync();
//         console.log(resultado);
//     } catch (error) {
//         console.log(error);
//     }

//     //CREATE
//     try {
//         const resultado = await database.sync();
//         console.log(resultado);
 
//         const resultadoCreate = await Produto.create({
//             nome: 'mouse',
//             preco: 10,
//             descricao: 'Um mouse USB bonitão'
//         })
//         console.log(resultadoCreate);
//     } catch (error) {
//         console.log(error);
//     }

//     //READ
//     const produtos = await Produto.findAll();
//     // const produto = await Produto.findByPk(1);
//     console.log(produtos)

//     //UPDATE
//     const produto = await Produto.findByPk(1);
//     //console.log(produto);
//     produto.nome = "Mouse Top";
    
//     const resultadoSave = await produto.save();

//     //DELETE
//     //assim
//     Produto.destroy({ where: { id: 1 }});
    
//     //ou assim
//     const produto = await Produto.findByPk(1);
//     produto.destroy();

// })();
