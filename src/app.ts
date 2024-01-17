import express, { Express, Request, Response, Application } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import { json, urlencoded } from 'body-parser';

import { routes } from './routes';
import { config } from './config';
import path from 'path';
import fs from 'fs';

const app: Application = express();
const port = config.PORT;

app.use(fileUpload());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors())

app.use('/api', routes);

// Define a route to serve an image
app.get('/file/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, '../public/images', imageName);
    console.log(imagePath);

    // Check if the file exists
    if (fs.existsSync(imagePath)) {
        // Send the image file
        res.sendFile(imagePath);
    } else {
        // Image not found
        res.status(404).send('Image not found');
    }
});

app.get('*', (req: Request, res: Response) => {
    res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});
