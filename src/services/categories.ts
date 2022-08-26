import Services from './services'

class CategoriesServices extends Services {
    constructor() {
        super({
            url: '/categories',
            config: {
                baseURL: "http://localhost:3000"
            }
        })
    }
}

export default new CategoriesServices()
