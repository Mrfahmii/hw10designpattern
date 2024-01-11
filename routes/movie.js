const express = require('express')
const router = express.Router()
const MovieController = require('../controller/movie_controller')
const auth = require('../middleware/auth')
const multer = require('multer');
const path = require('path');

const fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: fileStorage });

router.get('/', MovieController.getSemua)
router.get('/:id', MovieController.getOne)
router.post('/', auth, MovieController.create)
router.put('/:id', auth , MovieController.update)
router.delete('/:id', auth , MovieController.delete)
router.post('/:id/upload', upload.single('file'), MovieController.upload)

module.exports = router;