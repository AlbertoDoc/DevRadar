const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/ParseStringAsArray');

// index, show, store, update, 

// index: mostrar uma lista deste recurso, que no caso são devs
// show: mostrar um único dev
// store: criar um dev
// update: alterar um dev
// destroy: deletar dev

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const {github_username, techs, latitude, longitude} = request.body;

        let dev = await Dev.findOne({ github_username });

        if(!dev){
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
        
            // Nesta parte irá buscar o nome na api do github, como o nome não é obrigatório
            // O igual possibilita que caso o nome não exista ele busque o login, que neste caso é obrigatório
            const { name = login, avatar_url, bio } = apiResponse.data;
    
            const techsArray = parseStringAsArray(techs);
    
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
    
             dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            });
        }

        return response.json(dev);
    },

    async update() {

    },

    async destroy() {

    },
    //implementar essas duas funcoes
};