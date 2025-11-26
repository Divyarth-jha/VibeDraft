import express from 'express';
import { AddBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComments, toggelePuvlish } from '../controllers/blogcontroller.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const blogRouter = express.Router();

blogRouter.post('/add',upload.single('image'),auth, AddBlog)
blogRouter.get('/all', getAllBlogs);
blogRouter.get('/:blogId', getBlogById);
blogRouter.post('/delete',auth, deleteBlogById);
blogRouter.post('/toggle-publish',auth, toggelePuvlish);
blogRouter.post('/add-comment', addComment);
blogRouter.post('/comments', getBlogComments);
blogRouter.post('/generate',auth,generateContent);



export default blogRouter;
