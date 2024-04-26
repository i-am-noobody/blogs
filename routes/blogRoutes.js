const express = require("express")
const { addBlog, getAllBlogs, getBlog, updateBlog, deleteBlog } = require("../controllers/blogControllers")

const router = express.Router()

router.post("/add", addBlog)
router.get("/get", getAllBlogs)
router.get("/get/:id", getBlog)
router.put("/update/:id", updateBlog)
router.delete("/delete/:id", deleteBlog)

module.exports = router