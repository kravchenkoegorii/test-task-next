'use client';

import {useState, useEffect} from 'react';
import dynamic from "next/dynamic";
import {deleteImage, updatePost, uploadImage} from "@/app/api/post.api";

const Editor = dynamic(() => import( '@/app/components/Editor' ), {ssr: false});

interface EditPostFormProps {
    post: any;
    initialImage: string | null;
    onCancel: () => void;
    onSave: () => void;
}

const EditPostForm: React.FC<EditPostFormProps> = ({post, initialImage, onCancel, onSave}) => {
    const [title, setTitle] = useState(post.title);
    const [description, setDescription] = useState(post.description);
    const [newImage, setNewImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(initialImage);

    useEffect(() => {
        if (newImage) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImage(e.target?.result as string);
            };
            reader.readAsDataURL(newImage);
        }
    }, [newImage]);

    const handleSave = async () => {
        try {
            if (newImage) {
                await deleteImage(post.image._id);

                const formData = new FormData();
                formData.append('file', newImage);
                const newImageId = await uploadImage(formData);

                await updatePost(post._id, {
                    title,
                    description,
                    image: newImageId,
                });
            } else {
                await updatePost(post._id, {
                    title,
                    description,
                });
            }

            onSave();
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    return (
        <div className="bg-white p-6 shadow-lg rounded-lg space-y-4">
            <p className="font-semibold">Title</p>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded"
            />
            <div>
                <p className="font-semibold">Current Image Preview:</p>
                <img src={previewImage ? previewImage : undefined} alt="Current preview"
                     className="w-full max-h-64 object-contain rounded-lg my-4"/>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewImage(e.target.files ? e.target.files[0] : null)}
                />
            </div>
            <p className="font-semibold">Description</p>
            <Editor description={description} onChange={(desc: string) => setDescription(desc)}/>
            <div className="flex space-x-2">
                <button
                    onClick={handleSave}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                    Save
                </button>
                <button
                    onClick={onCancel}
                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default EditPostForm;
