import fs from 'fs'
import imageKit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/comment.js';
import main from '../configs/gemini.js';

export const AddBlog = async (req, res) => {
    try {
        const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog);
      
        const imageFile = req.file;

        //check all fields are provided
        if(!title || !description || !category || !imageFile){
            return res.json({message: 'All required fields must be provided', success:false})
        }
        const Filebuffer = fs.readFileSync(imageFile.path)

        // upload image to imagekit
          const response = await imageKit.upload({
      file: Filebuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });


        //  optimaizeImaeUrl
        const optimizedImageUrl = imageKit.url({
            path: response.filePath,
            transformation:[
                
                   { quality: 'auto'}, // auto compression
                   {format: 'webp'}, //convert to moredern formate
                   {width: '1280'} // resize width
            ]
        });

        const image = optimizedImageUrl;

        // save blog to db
       await Blog.create({title, subTitle, description, category, image, isPublished});

       res.json({message: 'Blog added successfully', success:true})

    } catch (error) {
        res.json({message: 'Error adding blog', success:false, error:error.message})
    }
};


export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({isPublished:true})
        res.json({blogs, success:true})
    } catch (error) {
        res.json({message: 'Error fetching blogs', success:false, error:error.message});
    }
};

export const getBlogById = async (req, res) => {
    try {
        const {blogId} = req.params;
        const blog = await Blog.findById(blogId)
        if(!blog){
            return res.json({message: 'Blog not found', success:false})
        }
        res.json({blog, success:true})
    } catch (error) {
        res.json({message: 'Error fetching blog', success:false, error:error.message});
    }
};

export const deleteBlogById = async (req, res) => {
    try {
        const {id} = req.body;
        await Blog.findByIdAndDelete(id);
        
        // Delete all comments associated with the blog
          await Comment.deleteMany({ blog: id});

        res.json({message: 'Blog deleted successfully', success:true})
    } catch (error) {
        res.json({message: 'Error deleting blog', success:false, error:error.message});
    }
};

export const toggelePuvlish = async (req, res) => {
    try {
        const {id} = req.body;
        const blog = await Blog.findById(id);
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({message: 'Blog publish status toggled', success:true})
    } catch (error) {
        res.json({message: 'Error toggling publish status', success:false, error:error.message});
    }
};

export const addComment = async (req, res) => {
  try {
    const { blogId, name, content } = req.body;

    if (!blogId || !name || !content) {
      return res.json({ success: false, message: "All fields are required" });
    }

    await Comment.create({
      blog: blogId,
      name,
      content,
    });

    res.json({ success: true, message: "Comment added successfully" });
  } catch (error) {
    res.json({ message: "Error adding comment", success: false, error: error.message });
  }
};


export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;

    if (!blogId) {
      return res.json({ success: false, message: "Blog ID required" });
    }

    const comments = await Comment.find({
      blog: blogId,
      isApproved: true,
    }).sort({ createdAt: -1 });

    res.json({ success: true, comments });

  } catch (error) {
    res.json({ message: "Error fetching comments", success: false, error: error.message });
  }
};

export const  generateContent = async (req, res) => { 
  try {
     const { prompt } = req.body;
    const content = await main(prompt + 'Generate a blog content for this topic in sample text formate')
    res.json({ success: true, content });
  } catch (error) {
    res.json({ message: "Error generating content", success: false, error: error.message
  })
};
};