class Product {
    title
    description
    price
    thumsbnail
    code
    stock
    constructor(id, { title, description, price, thumsbnail, code, stock }) {
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
    static #ultimoId = 0
    #getProduct = [];

static #generarNuevoID() {
    return ++ProductManager.#ultimoId;
}

    getProduct() {
        return this.#getProduct;
    };

    addProduct(id, datos) {
        const ap = new product(datos)
        this.#getProduct.push(ap)
    };
}

const pm = new ProductManager()
pm.addProduct({
    title: 'producto prueba',
    description: 'Este es un producto prueba',
    price: 200,
    thumbnail: 'Sin imagen',
    code: 'abc123',
    stock: 25
})
