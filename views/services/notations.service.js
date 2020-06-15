import api from "./api.service";

class NotationsService {
    publishStrategy = {
        create: () => ({
            method: 'post',
            url: 'notations',
        }),
        update: (id) => ({
            method: 'put',
            url: `notations/${id}`
        })
    };

    constructor(api) {
        this.api = api;
    }

    fetchAllNotations = () => {
        return this.api.privateGet({url: '/notations'})
    };

    fetchNotation = (id) => {
        return this.api.privateGet({url: `notations/${id}`})
    };

    createNotation = (data) => {
        return this.api.privateRequest({method: 'post', url: 'notations', data});
    };

    updateNotation = (data) => {
        const id = data._id;
        return this.api.privateRequest({method: 'put', url: `notations/${id}`, data});
    };

    deleteNotation = (id) => {
        return this.api.privateDelete({url: `notations/${id}`})
    }
}

const notationService = new NotationsService(api);

export default notationService;