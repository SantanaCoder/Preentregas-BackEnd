const fs = require('fs');

const crearjson = () => {
    const Data = [];
    
    try {
        fs.writeFileSync("products.json", JSON.stringify(Data));
        console.log("Archivo 'products.json' creado correctamente.");
    } catch (error) {
        console.error("No se ha creado el archivo 'products.json'.");
    }
}

crearjson();



class ProductManager {
    constructor() {
        this.products = this.loadProducts();
        this.productIdCounter = this.calculateProductIdCounter();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync('products.json', 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    calculateProductIdCounter() {
        return this.products.reduce((maxId, product) => Math.max(maxId, product.id), 0) + 1;
    }

    saveProducts() {
        fs.writeFileSync('products.json', JSON.stringify(this.products, null, 2));
    }

    addProduct(productData) {
        const { title, description, price, thumbnail, code, stock } = productData;

        if (title && description && price && thumbnail && code && stock) {
            const existingProduct = this.products.find(product => product.code === code);
            if (existingProduct) {
                console.log("Ya existe un producto con este código");
                return;
            }

            const newProduct = {
                id: this.productIdCounter++,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            };

            this.products.push(newProduct);
            this.saveProducts();
        } else {
            console.log("Todos los campos son obligatorios");
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            console.log("Producto no encontrado");
        }
        return product;
    }

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            this.products[productIndex] = { ...this.products[productIndex], ...updatedFields };
            this.saveProducts();
        } else {
            console.log("Producto no encontrado");
        }
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
            this.saveProducts();
        } else {
            console.log("Producto no encontrado");
        }
    }
}

const productManager = new ProductManager();

productManager.addProduct({
    title: "peras",
    description: "frescas y deliciosas",
    price: 100,
    thumbnail: "img1.jpg",
    code: "CODE1",
    stock: 10
});

productManager.addProduct({
    title: "manzanas",
    description: "fruta de temporada",
    price: 200,
    thumbnail: "img2.jpg",
    code: "CODE2",
    stock: 20
});

productManager.addProduct({
    title: "papayas",
    description: "importadas de centroamerica",
    price: 300,
    thumbnail: "img3.jpg",
    code: "CODE3",
    stock: 30
});

productManager.addProduct({
    title: "papayas",
    description: "importadas de centroamerica",
    price: 300,
    thumbnail: "img4.jpg",
    code: "CODE4",
    stock: 30
});

const products = productManager.getProducts();
console.log("Productos:", products);

const productById = productManager.getProductById(3);
console.log("Producto con ID 3:", productById);

productManager.updateProduct(3, { price: 350 });

productManager.deleteProduct(4);
