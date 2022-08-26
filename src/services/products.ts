import Services from './services'

class ProductsServices extends Services {
    constructor() {
        super({
            url: '/products',
            config: {
                baseURL: "http://localhost:3000"
            }
        })
    }
}

export default new ProductsServices()
