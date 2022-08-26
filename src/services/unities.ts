import Services from './services'

class UnitiesServices extends Services {
    constructor() {
        super({
            url: '/unities',
            config: {
                baseURL: "http://localhost:3000"
            }
        })
    }
}

export default new UnitiesServices()
