import React, { useState } from 'react'
import GetBlogs from '../components/GetBlogs'
import toast, { Toaster } from "react-hot-toast"

const Home = () => {
    const [data, setData] = useState({
        title: "",
        content: ""
    })

    const addBlog = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:3002/blog/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            console.log(response.json())

            toast.success("Blog added Successfully")
            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    const handleInput = (e) => {

        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    return (
        <div className='flex flex-col '>
            <div className='flex flex-row justify-between bg-yellow w-full h-cover py-4  px-12 '>
                <h2 className='text-2xl font-semibold'>Hamro blogss</h2>

            </div>
            <div className='flex flex-row justify-evenly'>
                <div className='flex flex-col gap-4 mt-6 items-center'>
                    <GetBlogs />
                </div>
                <div className='flex flex-col'>
                    <h2 className='text-[1.2rem] text-green font-semibold mt-4'>Add blogs</h2>
                    <form onSubmit={addBlog} className='flex flex-col gap-2'>
                        <input type='text' value={data.title} name='title' placeholder='Enter the title' onChange={handleInput} />
                        <input type='text' value={data.content} name='content' placeholder='Enter the blog contents' onChange={handleInput} className='h-[5rem]' />
                        <div className='max-w-["100px"]'>
                            <Toaster />
                            <button className='bg-green px-4 py-1 rounded-md text-white font-semibold mt-2'>Add blog</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default Home 