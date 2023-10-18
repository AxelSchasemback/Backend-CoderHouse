class Product {
    id
    title
    description
    price
    thumsbnail
    code
    stock
    constructor( id, title, description, price, thumsbnail, code, stock ) {
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

    dataProduct

    static #ultimoId = 0

    constructor() {
        this.dataProduct = [];
    }

static generarNuevoID() {
    return ++ProductManager.#ultimoId;
}

addProduct( { title, description, price, thumbnail, code, stock } ) {

    const codRepeat = this.dataProduct.find((codigo) => codigo.code === code)

    if (!codRepeat) {
        const id = ProductManager.generarNuevoID();       
        const producto = new Product( id, title, description, price, thumbnail, code, stock )
        console.log(producto)
        this.dataProduct.push( producto )
        return producto;
    } else {

        return console.log(`El codigo está repetido, no se puede agregar este producto`)

    }
};

getProduct() {
    return this.dataProduct;
};

getProductById (id) {
    const searxhId = this.dataProduct.find((search) => search.id === id)
    if (!searxhId) {
        console.error(`la ID "${id}" solicitada no Existe`)
    }
    return searxhId;
}

delProduct(id) {
    const deleteProduct = this.dataProduct.filter((borrar) => borrar.id !== id);
    return this.dataProduct = deleteProduct;
}}

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

console.log(pm.getProductById(2))
console.log(pm.delProduct(2))
console.log(pm.getProduct())