import express from 'express'
import { ProductManager } from './main.js'

const app = express()
app.use(express.json())

const pm = new ProductManager({ ruta: '../db/Products.json' })

// app.get('/products', async (req, res) => {
//     res.json({ productos: await pm.getProduct() })
// })

app.get('/products', async (req, res) => {

    const limit = req.query.limit;
    const allProducts = await pm.getProduct()

    if (limit) {
        const limitValue = parseInt(limit)
        const limitedProducts = allProducts.slice(0, limitValue);
        res.json( limitedProducts );

    } else {  
        res.json({ productos: await pm.getProduct() });
    }
})

app.get('/products/:id', async (req, res) => {
    const idProducts = parseInt(req.params['id'])
    const search = await pm.getProductById(idProducts)
    res.json({ productos: await search })
})


app.get('/', (req, res) => {
    res.sendFile('index.html', { root: '../views' })
})

app.listen(27015, () => {
    console.log('listening on port 27015')
})
