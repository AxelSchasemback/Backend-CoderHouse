class Product {
    id
    title
    description
    price
    thumsbnail
    code
    stock
    constructor(id, title, description, price, thumsbnail, code, stock) {
        this.id = id
        this.title = title
        this.description = description
        this.price = price
        this.thumsbnail = thumsbnail
        this.code = code
        this.stock = stock
    }
}

class ProductManager {

    Products

    static #ultimoId = 0

    constructor() {
        this.Products = [];
    }

    static generarNuevoID() {
        return ++ProductManager.#ultimoId;
    }

    addProduct({ title, description, price, thumbnail, code, stock }) {

        const codRepeat = this.Products.find((codigo) => codigo.code === code)
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("todos los campos son obligatorios")
        }
            if (!codRepeat) {
                const id = ProductManager.generarNuevoID();
                const producto = new Product(id, title, description, price, thumbnail, code, stock)
                console.log(producto)
                this.Products.push(producto)
                return producto;
            } else {

                return console.log(`El codigo está repetido, no se puede agregar este producto`)

            }
        
    };

    getProduct() {
        return this.Products;
    };

    getProductById(id) {
        const searxhId = this.Products.find((search) => search.id === id)
        if (!searxhId) {
            console.error(`la ID "${id}" solicitada no Existe`)
        }
        return searxhId;
    }

    delProduct(id) {
        const deleteProduct = this.Products.filter((borrar) => borrar.id !== id);
        return this.Products = deleteProduct;
    }
}

const pm = new ProductManager()
const p1 = pm.addProduct({
    title: 'producto prueba1',
    description: 'Este es un producto prueba1',
    price: 100,
    thumbnail: 'Sin imagen1',
    code: 'abc1231',
    stock: 10
})

const p2 = pm.addProduct({
    title: 'producto prueba2',
    description: 'Este es un producto prueba2',
    price: 200,
    thumbnail: 'Sin imagen2',
    code: 'abc1232',
    stock: 20
})

const p3 = pm.addProduct({
    title: 'producto prueba3',
    description: 'Este es un producto prueba3',
    price: 300,
    thumbnail: 'Sin imagen3',
    code: 'abc1233',
    stock: 30
})

const p4 = pm.addProduct({
    title: '',
    description: 'Este es un producto prueba4',
    price: 400,
    thumbnail: 'Sin imagen4',
    code: 'abc1233',
    stock: 40
})

console.log(pm.getProductById(2))
console.log(pm.delProduct(2))
console.log(pm.getProduct())
