
import { Request, Response} from 'express';
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';

import * as Yup from 'yup';

import orphanageView from '../views/orphanages_view';

export default {
    async index(request: Request, response: Response) {
        const orphanagesRepo = getRepository(Orphanage);

        const orphanages = await orphanagesRepo.find({
            relations: ['images']
        });

        return response.json(orphanageView.renderMany(orphanages))
    },

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const orphanagesRepo = getRepository(Orphanage);

        const orphanage = await orphanagesRepo.findOneOrFail(id, {
            relations: ['images']
        });

        return response.json(orphanageView.render(orphanage))
    },

    async create(request: Request, response: Response) {

        const {
            name, 
            latitude,
            longitude,
            about, 
            instructions,
            opening_hours, 
            open_on_weekends
        } = request.body;
    
        const orphanagesRepo = getRepository(Orphanage);

        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename }
        });

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours, 
            open_on_weekends: open_on_weekends === 'true',
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required('Campo obrigatório'),
            latitude: Yup.number().typeError('Campo numérico').required('Campo obrigatório'),
            longitude: Yup.number().typeError('Campo numérico').required('Campo obrigatório'),
            about: Yup.string().required('Campo obrigatório').max(300, 'Máximo 300 caracteres'),
            instructions: Yup.string().required('Campo obrigatório'),
            opening_hours: Yup.string().required('Campo obrigatório'),
            open_on_weekends: Yup.boolean().required('Campo obrigatório'),
            images: Yup.array(Yup.object().shape({
                path: Yup.string().required('Campo obrigatório')
            }))
        });

        await schema.validate(data, {
            abortEarly: false //check all erros
        });

        const orphanage = orphanagesRepo.create(data as any );

        await orphanagesRepo.save(orphanage);

        return response.status(201).json(orphanage);
    }
}