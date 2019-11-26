import multer from 'multer';
import path from 'path';
import { get } from 'lodash';

const configMulter = {
    storage: multer.diskStorage({
        destination: __dirname + '/../public/uploads',
        filename: (req, file, next) => {
            console.log('req-file', file);
            console.log('user', req.user);

            const filename = Date.now() + '-' + file.originalname;
            console.log('file', filename);
            next(null, filename);
        }
    })
};

export const uploadImageFile = multer(configMulter).single('avatar');
