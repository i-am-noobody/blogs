import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { useParams } from 'react-router-dom';
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import UpdateBlog from './UpdateBlog'; // Assuming the UpdateModal component is in a separate file

const GetBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const params = useParams();

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const response = await fetch(`http://localhost:3002/blog/get`);
                const data = await response.json();
                setBlogs(data.blogs);
            } catch (error) {
                console.log(error);
            }
        };
        getBlogs();
    }, []);

    const deleteBlog = async (id) => {
        try {
            await axios.delete(`http://localhost:3002/blog/delete/${id}`);
            console.log("Blog deleted successfully");
            toast.success("Blog Deleted Successfully");
            // You may want to update the state here to reflect the deletion
        } catch (error) {
            console.log(error);
            toast.error("Error deleting blog");
        }
    };

    const openUpdateModal = (blog) => {
        setSelectedBlog(blog);
        setIsModalOpen(true);
    };

    const handleUpdate = async (updatedTitle, updatedContent) => {
        try {
            await axios.put(`http://localhost:3002/blog/update/${selectedBlog._id}`, { title: updatedTitle, content: updatedContent });
            console.log("Blog updated successfully");
            toast.success("Blog Updated Successfully");
            setIsModalOpen(false);
        } catch (error) {
            console.log(error);
            toast.error("Error updating blog");
        }
    };

    return (
        <div className='w-[600px] max-w-[600px] flex flex-col gap-3'>
            {blogs.map((blog, index) => (
                <div className='border-2 border-yellow px-4 py-2 flex flex-row justify-between items-center' key={index}>
                    <div>
                        <h2 className='text-[1.2rem] text-green font-semibold'>{blog.title}</h2>
                        <p>{blog.content}</p>
                    </div>
                    <div className='flex flex-row gap-2'>
                        <Toaster />
                        <MdDelete size={25} color='red' onClick={() => deleteBlog(blog._id)} />
                        <GrUpdate size={20} onClick={() => openUpdateModal(blog)} />
                    </div>
                </div>
            ))}
            <UpdateBlog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onUpdate={handleUpdate} />
        </div>
    );
};

export default GetBlogs;