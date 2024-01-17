import * as fs from 'fs';
import * as path from 'path';

export const saveImageToPublic = (imageName: string, imageBuffer: Buffer) => {
    const rootFolderPath = path.resolve(__dirname, '../../../public/images/');
    const imagePath = path.join(rootFolderPath, imageName);

    fs.writeFileSync(imagePath, imageBuffer);
    return imageName;
};
