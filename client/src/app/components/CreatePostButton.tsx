'use client';

import {useState} from 'react';
import {createPost, uploadImage} from "@/app/api/post.api";

const CreatePostButton: React.FC = () => {
    const [showDialog, setShowDialog] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleCreatePost = async () => {
        if (!title || !description || !imageFile) {
            alert('All fields are required.');
            return;
        }

        if (title.length >= 75) {
            alert('Title can not be longer than 75 symbols.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', imageFile);
            const image = await uploadImage(formData);

            const postResponse = await createPost({
                title,
                description,
                image,
            });

            if (postResponse) {
                setShowDialog(false);
                window.location.reload();
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div>
            <button
                onClick={() => setShowDialog(true)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
                Create Post
            </button>
            {showDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
                        <h2 className="text-2xl font-bold mb-4">Create New Post</h2>
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border rounded mb-4"
                        />
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border rounded mb-4"
                        ></textarea>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)}
                            className="w-full mb-4"
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={async () => await handleCreatePost()}
                                className="bg-green-600 text-white px-4 py-2 rounded mr-2 hover:bg-green-700"
                            >
                                Create
                            </button>
                            <button
                                onClick={() => setShowDialog(false)}
                                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreatePostButton;
