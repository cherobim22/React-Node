## Projeto Solar
- Front-end React.
- Back-end Node + sqlite3.

#### Começando

Inicializando o back-end
```sh
- cd back-end
- npm install
- npx knex migrate:latest
- npm run start
```

Inicializando o Front-end
```sh
- cd front-end
- npm install
- npm run start
```

EndPoints (API)
```sh
- BaseUrl -> localhost:3333
- GET ("/api/product/")
- GET ("/api/product/:id")
- POST ("/api/product/")
- POST ("/api/projetos/expedicao")
- DELETE ("/api/product/:id")
- PUT ("/api/product/:id")
- PUT ("/api/product/status/:id")
```

POST, PUT 
```sh
{
    "nome": "Interfone",
    "GTIN": "xx33xx33xx33xx33xx33xx33x",
    "altura":"1,5",
    "largura":"1,5",
    "profundidade":"1,5",
    "peso_bruto": "1",
    "peso_liquido": "1,7",
    "status": true,
    "grupo": "Conectores e Baterias",
    "segmento": "Offgrid"
}
```

Cubagem
```sh
{
    "id": "PR_1632779254920",
    "quantidade": "10"
}
```

GET Query Parameters
```sh
- status: 1
- page: 2
- string:Inter
- segmento: Ongrid
- grupo: Modulo
- start: 25-09-2021 00:00:00
- end: 26-09-2021 20:00:00
```




Requisitos
```sh
- Node
- Npm
```
