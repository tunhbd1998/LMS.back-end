import path from 'path';
import fs from 'fs';
import {
    GoogleDriveClient, MIME_TYPES, GOOGLE_DRIVE_PERMISSION_ROLE, GOOGLE_DRIVE_PERMISSION_TYPE
} from 'google-drive-client/build/src';
import { LMSResponse } from '../defines/response';
import { LMSError } from '../defines/errors';
import { userService } from '../services';
// import { withAuth } from '../middlewares/with-auth-middleware';

export const uploadGoogleFile = (filename, mineType, fileUrl, avatarId = null) => {
    const ggdClient = new GoogleDriveClient({
        credentialsPath: __dirname + '/../credentials.json',
        tokenPath: __dirname + '/../token.json',
        scopes: [
          'https://www.googleapis.com/auth/drive',
          'https://www.googleapis.com/auth/drive.file',
          'https://www.googleapis.com/auth/drive.appfolder'
        ]
      });
    if (avatarId) {
        ggdClient.deleteFile(avatarId).catch(err => console.log(err));
    }
    return ggdClient.uploadFile({
        filename,
        mineType,
        fileUrl,
        folderId: null,
        toFolder: 'store-image-lms',
        permissions: [{
            role: GOOGLE_DRIVE_PERMISSION_ROLE.READER,
            type: GOOGLE_DRIVE_PERMISSION_TYPE.ANYONE
        }]
    });
};

export const uploadImage = (req, res) => {
    const { username, avatarId } = req.user;
    console.log('demo', req.user);
    const fileUrl = req.file.path;
    uploadGoogleFile(req.file.filename, req.file.mineType, fileUrl, avatarId)
        .then(ret => {
            fs.unlink(fileUrl, () => {});
            userService.updateOne(username, { avatarImage: ret.downloadUrl, avatarId: ret.fileId })
            .then(user => {
                console.log('response', user);
                res.status(200).send(new LMSResponse(null, user));
            })
            .catch(err => console.log(err) && res.status(200).send(new LMSError(401, 'Unauthorization'), null));
        });
};
