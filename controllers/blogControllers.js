const blogModel = require("../models/blogModel")

const addBlog = async (req, res) => {
    try {
        const newBlog = new blogModel({
            title: req.body.title,
            content: req.body.content
        })
        if (!newBlog) {
            return res.status(400).json({
                success: false,
                message: "Couldnot add the blog"
            })
        }
        await newBlog.save()
        return res.status(201).json({
            success: true,
            message: "Blog added successfully",
            newBlog
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find()
        if (!blogs) {
            return res.status(404).json({
                success: false,
                message: "Couldnot get the blogs"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Blogs fetched successfully",
            blogs
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: true,
            message: error.message
        })
    }
}

const getBlog = async (req, res) => {
    try {
        const blog = await blogModel.findById(req.params.id)
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Couldnot get the blog"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Blog successfully fetched",
            blog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: true,
            message: error.message
        })
    }
}

const updateBlog = async (req, res) => {
    try {
        const blog = await blogModel.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            content: req.body.content
        }, { new: true })
        if (!blog) {
            return res.status(400).json({
                success: false,
                message: "Couldnot update blog"
            })
        }
        await blog.save()
        return res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            blog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: true,
            message: error.message
        })
    }
}

const deleteBlog = async (req, res) => {
    try {
        const blog = await blogModel.findByIdAndDelete(req.params.id)
        if (!blog) {
            return res.status(400).json({
                success: false,
                message: "Couldnot delete the blog"
            })
        }
        return res.status(200).json({
            success: false,
            message: "Blog deleted successfully",
            blog
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            success: true,
            message: error.message
        })
    }
}


module.exports = { addBlog, getAllBlogs, getBlog, updateBlog, deleteBlog }