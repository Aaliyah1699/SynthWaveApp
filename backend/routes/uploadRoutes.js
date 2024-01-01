import path from 'path';
import multer from 'multer';
import express from 'express';
const router = express.Router();

// Store the image in a file
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/'); // null is for error
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        );
    },
});

// Check file types
function filterFile(req, file, cb) {
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

    const extname = filetypes.test(
        path.extname(file.originalname).toLowerCase()
    );
    const mimetype = mimetypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Images only!'), false);
    }
}

const upload = multer({ storage, filterFile });
const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
    uploadSingleImage(req, res, function (err) {
        if (err) {
            return res.status(400).send({ message: err.message });
        }

        res.status(200).send({
            message: 'Image uploaded successfully',
            image: `/${req.file.path}`,
        });
    });
});

export default router;
