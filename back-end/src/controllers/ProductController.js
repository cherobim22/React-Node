const connection = require('../database/connection');
const knex = require('knex');

module.exports = {
    async create(req, res){
        let errors=[]
        const validate =  [ 'nome', 'GTIN', 'altura', 'largura', 'profundidade', 'peso_bruto', 'peso_liquido', 'grupo', 'segmento', 'status'] ;
        const body = Object.keys(req.body);
        let difference = validate.filter(x => !body.includes(x));
        let {nome, GTIN, altura, largura, profundidade, peso_bruto, peso_liquido, grupo, segmento, status } = req.body;
        let date = new Date();
        let id = 'PR_'+date.getTime();
        const data = date.toLocaleString();
        const regex = new RegExp('/', 'g');
        const created_at = data.replace(regex, '-');
        const updated_at = data.replace(regex, '-');

        difference.forEach(e => {
            errors.push("Especifique o campo"+e);
        });
    
        if (errors.length){
            res.status(400).json({"error":errors});
            return;
        }
    
        altura = altura.replace('.', ',')
        largura = largura.replace('.', ',')
        profundidade = profundidade.replace('.', ',')
        peso_bruto = peso_bruto.replace('.', ',')
        peso_liquido = peso_liquido.replace('.', ',')
      
        await connection('produtos').insert({id, nome, GTIN, altura, largura, profundidade, peso_bruto, peso_liquido, grupo, segmento, status, created_at, updated_at})
    
        return res.json({id});
    },
    async read(req, res){
        let date = new Date()
        const now = date.toLocaleString();
        let status = [0,1];
        let string = '';
        let grupo = ["Perfil", "Modulo", "Inversor", "Cabos", "Conectores e Baterias"]
        let segmento = ["Ongrid", "Offgrid"];
        let start = "01/01/2021 00:00:00"
        let end = now

        if(req.query.status){
            status = [req.query.status]
        }

        if(req.query.string){
            string = req.query.string
        }

        if(req.query.segmento){
            segmento = [req.query.segmento]
        }

        if(req.query.grupo){
            grupo = [req.query.grupo]
        }

        if(req.query.start && req.query.end){
           start = req.query.start
           end = req.query.end
        }

        const products = await connection('produtos').select('*').whereIn('status', status).
        andWhere((builder) => {
            builder.where('nome', 'like', `%${string}%`)
        })
        .andWhere((builder) => {
            builder.whereIn('grupo', grupo);
        })
        .andWhere((builder) => {
            builder.whereIn('segmento', segmento);
        })
        .andWhere((builder) => {
            builder.whereBetween('created_at', [start, end]);
        }).orderBy('created_at', 'desc');

        return res.json(products);
    },

    async readById(req, res){
        const { id } = req.params;
        const products = await connection('produtos').where('id', '=', id).first();

        return res.json(products);
    },
    async update(req, res){
        const { id } = req.params;
        let errors=[]
        const validate =  [ 'nome', 'GTIN', 'altura', 'largura', 'profundidade', 'peso_bruto', 'peso_liquido', 'grupo', 'segmento', 'status'] ;
        const body = Object.keys(req.body);
        let difference = validate.filter(x => !body.includes(x));
        let date = new Date()
        let data = date.toLocaleString();
        let regex = new RegExp('/', 'g');
        let updated_at = data.replace(regex, '-');
        
        let {nome, GTIN, altura, largura, profundidade, peso_bruto, peso_liquido, grupo, segmento, status } = req.body;     

        difference.forEach(e => {
            errors.push("Especifique o campo "+e);
        });
    
        if (errors.length){
            res.status(400).json({"error":errors});
            return;
        }

        altura = altura.replace('.', ',')
        largura = largura.replace('.', ',')
        profundidade = profundidade.replace('.', ',')
        peso_bruto = peso_bruto.replace('.', ',')
        peso_liquido = peso_liquido.replace('.', ',')
        
        await connection('produtos').where('id', '=', id).update({id, nome, GTIN, altura, largura, profundidade, peso_bruto, peso_liquido, grupo, segmento, status, updated_at})
    
        return res.json({ msg: 'atualizado com sucesso'});
    },
    async delete(req, res){
        const { id } = req.params;
        const product = await connection('produtos').where('id', id);
        
        let date = new Date()
        const deleted_at = date.toLocaleString();
        let status = 0
        
        if(product.length){
            await connection('produtos').where('id', id).update({status, deleted_at});
            return res.status(200).json({msg: 'removido com sucesso'});
        }else{
           return res.status(404).json({msg: 'nenhum produto encontrado com o id '+id});
        }
    },
    async updateStatus(req, res){
        const { id } = req.params;
        let status = true;
        await connection('produtos').where('id', '=', id).update({status})
        return res.json({ msg: 'atualizado com sucesso'});
    },
    async cubagem(req, res){
       
        const {id, quantidade} = req.body

        const product = await connection('produtos').where('id', id).first();

        const cubagem = (altura, largura, profundidade, peso_liquido, peso_bruto) => {

            altura = altura.replace(',', '.')
            largura = largura.replace(',', '.')
            profundidade = profundidade.replace(',', '.')
            peso_liquido = peso_liquido.replace(',', '.')
            peso_bruto = peso_bruto.replace(',', '.')
            
            let fator_cubagem = 300;
            let cubagem = (altura*largura*profundidade) * quantidade;
            let peso_cubado = (cubagem * fator_cubagem * quantidade);
            let peso_liquido_total = peso_liquido * quantidade;
            let peso_bruto_total = peso_bruto * quantidade;

            return {cubagem, peso_cubado, peso_liquido_total, peso_bruto_total}
        }   

        const resp = cubagem(product.altura, product.largura, product.profundidade, product.peso_liquido, product.peso_bruto);
      
        return res.json({ produto: product, cubagem: resp.cubagem, peso_cubado: resp.peso_cubado, peso_liquido: resp.peso_bruto_total, peso_bruto: resp.peso_bruto_total});
        
    }
};