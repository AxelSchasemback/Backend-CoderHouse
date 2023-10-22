const { promises: fs } = require('fs')

class Product {
    id
    title
    description
    price
    thumsbnail
    code
    stock
    constructor({id, title, description, price, thumsbnail, code, stock}) {
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
    static #numId = 0;

    constructor({ ruta }) {
        this.ruta = ruta
        this.Products = [];
    }

    async init() {
        if (!this.Products.length) {
            await this.#writeProduct()
        } else {
            await this.#readProduct()
        }
    }

    async reset() {
        this.Products = []
        await this.#writeProduct()
    }

    async #readProduct() {
        const usersJson = await fs.readFile(this.ruta, 'utf-8')
        const usersArray = JSON.parse(usersJson)
        return this.Products = usersArray
    }

    async #writeProduct() {
        const usersJson = JSON.stringify(this.Products, null, 2)
        await fs.writeFile(this.ruta, usersJson)
    }

    static genNewId() {
        if (!this.Products) {
            return ++ProductManager.#numId;
        } else {
            return this.Products.id++
        }
    }

    async addProduct({ title, description, price, thumbnail, code, stock }) {
        await this.#readProduct()
        const codRepeat = this.Products.find((product) => product.code === code)
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("todos los campos son obligatorios")
        }
        if (!codRepeat) {
            const id = ProductManager.genNewId();
            const newProduct = new Product({id, title, description, price, thumbnail, code, stock})
            this.Products.push(newProduct)
            await this.#writeProduct()
            return newProduct;
        } else {

            return console.log(`El codigo está repetido, no se puede agregar este producto`)

        }

    };

    async getProduct() {
        await this.#readProduct();
        return this.Products;
    };

    async getProductById(id) {
        await this.#readProduct()
        const searxhId = this.Products.find((search) => search.id === id)
        if (!searxhId) {
            console.error(`la ID "${id}" solicitada no Existe`)
        }
        return searxhId;
    }

    async updateProduct(id, update) {
        await this.#readProduct()
        const item = this.Products.find(i => i.id === id)
        if (item) {
            const newArray = this.Products.filter(array => array.id !== id)
            const newUpdate = new Product({...item, ...update })
            this.Products = [...newArray, newUpdate]
            await this.#writeProduct()
            return newUpdate
        } else {
            throw new Error('error al actualizar: usuario no encontrado')
        }
    }

    async delProduct(id) {
        await this.#readProduct()
        const deleteProduct = this.Products.filter((del) => del.id !== id);
        if (deleteProduct) {
            this.Products = deleteProduct;
            await this.#writeProduct()
            return deleteProduct;
        } else {
            throw new Error('error al actualizar: usuario no encontrado')
        }
    }
}

async function main() {

    const pm = new ProductManager({ ruta: 'Products.json' })
    await pm.init();
    const p1 = await pm.addProduct({
        title: 'producto prueba1',
        description: 'Este es un producto prueba1',
        price: 100,
        thumbnail: 'Sin imagen1',
        code: 'abc1231',
        stock: 10
    })

    const p2 = await pm.addProduct({
        title: 'producto prueba2',
        description: 'Este es un producto prueba2',
        price: 200,
        thumbnail: 'Sin imagen2',
        code: 'abc1232',
        stock: 20
    })

    const p3 = await pm.addProduct({
        title: 'producto prueba3',
        description: 'Este es un producto prueba3',
        price: 300,
        thumbnail: 'Sin imagen3',
        code: 'abc1233',
        stock: 30
    })

    const p4 = await pm.addProduct({
        title: '',
        description: 'Este es un producto prueba4',
        price: 400,
        thumbnail: 'Sin imagen4',
        code: 'abc1233',
        stock: 40
    })

    const p5 = await pm.addProduct({
        title: '',
        description: 'Este es un producto prueba5',
        price: 500,
        thumbnail: 'Sin imagen5',
        code: 'abc123123123',
        stock: 50
    })

    console.log(await pm.getProductById(2))
    console.log(await pm.delProduct(2))
    console.log(await pm.updateProduct(4, {title: 'Update titulo'}))
    console.log(await pm.getProduct())
    // pm.reset()
}
main()
