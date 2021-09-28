const express = require('express');
const routes = express.Router();

const ProductController = require('./controllers/ProductController');

// Root endpoint
routes.get("/api/product/", ProductController.read);
routes.get("/api/product/:id", ProductController.readById);
routes.post("/api/product/", ProductController.create);
routes.post("/api/projetos/expedicao", ProductController.cubagem);
routes.delete("/api/product/:id", ProductController.delete);
routes.put("/api/product/:id", ProductController.update);
routes.put("/api/product/status/:id", ProductController.updateStatus);



module.exports = routes;