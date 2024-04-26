import React, { useState } from 'react';

const UpdateBlog = ({ isOpen, onClose, onUpdate }) => {
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedContent, setUpdatedContent] = useState('');

    const handleUpdate = () => {
        onUpdate(updatedTitle, updatedContent);
        onClose();
    };

    return (
        <>
            {isOpen && (
                <div className="modal">
                    <div className="modal-content flex flex-col gap-3">
                        <span className="close" onClick={onClose}>&times;</span>
                        <h2>Update Blog</h2>
                        <input
                            type="text"
                            placeholder="Title"
                            value={updatedTitle}
                            onChange={(e) => setUpdatedTitle(e.target.value)}
                        />
                        <textarea
                            placeholder="Content"
                            value={updatedContent}
                            onChange={(e) => setUpdatedContent(e.target.value)}
                        ></textarea>
                        <div>
                            <button onClick={handleUpdate} className='bg-green px-4 py-1 rounded-md text-white font-semibold'>Update</button>

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default UpdateBlog;