import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import connectToDatabase from './db.js';
import {
    registerValidation,
    loginValidation,
    postCreateValidation,
} from './validations/validation.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';
import { UserController, PostController } from './controllers/index.js';
import cors from 'cors';

dotenv.config();
const app = express();
connectToDatabase();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.post(
    '/auth/register',
    registerValidation,
    handleValidationErrors,
    UserController.register
);

app.post(
    '/auth/login',
    loginValidation,
    handleValidationErrors,
    UserController.login
);

app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.get('/tags', PostController.getLastTags);
app.get('/posts', PostController.getAll);
app.get('/posts/tags', PostController.getLastTags);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateValidation, PostController.createPost);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch(
    '/posts/:id',
    checkAuth,
    postCreateValidation,
    handleValidationErrors,
    PostController.update
);

app.listen(process.env.PORT || 5000, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Server started on port 5000');
});
