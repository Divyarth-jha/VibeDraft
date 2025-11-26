import jwt from "jsonwebtoken";
import Blog from "../models/Blog.js";
import Comment from "../models/comment.js";

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching blogs", error: error.message });
    }
};

export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find({}).sort({ createdAt: -1 });
        res.status(200).json({ success: true, comments });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching comments", error: error.message });
    }
};

export const getDashboard = async (req, res) => {
    try {
        const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comment.countDocuments();
        const drafts = await Blog.countDocuments({ isPublished: false });

        res.status(200).json({
            success: true,
            dashboardData: { blogs, comments, drafts, recentBlogs }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching dashboard data", error: error.message });
    }
};

export const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) return res.status(400).json({ success: false, message: "ID required" });

        await Comment.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting comment", error: error.message });
    }
};

export const approveCommentById = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) return res.status(400).json({ success: false, message: "ID required" });

        await Comment.findByIdAndUpdate(id, { isApproved: true });
        res.status(200).json({ success: true, message: "Comment updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating comment", error: error.message });
    }
};
