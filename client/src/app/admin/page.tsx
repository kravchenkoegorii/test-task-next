'use client';

import {useEffect, useState} from 'react';
import {fetchPosts, bulkDeletePosts, bulkUpdatePosts} from "@/app/api/post.api";

const AdminPage = () => {
    const [posts, setPosts] = useState<any[]>([]);
    const [selectedPosts, setSelectedPosts] = useState<string[]>([]);
    const [editedPosts, setEditedPosts] = useState<Record<string, { title: string, description: string }>>({});

    useEffect(() => {
        const loadPosts = async () => {
            const response = await fetchPosts();
            setPosts(response);
        };

        loadPosts();
    }, []);

    const handleSelectPost = (postId: string) => {
        setSelectedPosts(prev =>
            prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
        );
    };

    const handleEditChange = (postId: string, field: 'title' | 'description', value: string) => {
        setEditedPosts(prev => ({
            ...prev,
            [postId]: {
                ...prev[postId],
                [field]: value
            }
        }));
    };

    const handleDeleteSelected = async () => {
        if (setEditedPosts.length > 0) {
            await bulkDeletePosts(selectedPosts);
            setSelectedPosts([]);
            alert('Posts deleted successfully');

            const updatedPosts = await fetchPosts();
            setPosts(updatedPosts);
        }
    };

    const handleSaveEdits = async () => {
        const updates = Object.entries(editedPosts).map(([id, updateData]) => ({
            id,
            updateData,
        }));

        if (updates.length > 0) {
            await bulkUpdatePosts(updates);
            setEditedPosts({});
            alert('Posts updated successfully.');

            const updatedPosts = await fetchPosts();
            setPosts(updatedPosts);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
            <table className="w-full border-collapse border border-gray-300 mb-4">
                <thead>
                <tr>
                    <th className="border p-2">Select</th>
                    <th className="border p-2">Title</th>
                </tr>
                </thead>
                <tbody>
                {posts.map(post => (
                    <tr key={post._id}>
                        <td className="border p-2 text-center">
                            <input
                                type="checkbox"
                                checked={selectedPosts.includes(post._id)}
                                onChange={() => handleSelectPost(post._id)}
                            />
                        </td>
                        <td className="border p-2">
                            <input
                                type="text"
                                value={editedPosts[post._id]?.title ?? post.title}
                                onChange={(e) => handleEditChange(post._id, 'title', e.target.value)}
                                className="w-full border rounded p-1"
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="flex justify-between">
                <button
                    onClick={handleDeleteSelected}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 min-w-[120px]"
                    disabled={selectedPosts.length === 0}
                >
                    Delete
                </button>
                <div className="flex justify-end w-full">
                    <button
                        onClick={handleSaveEdits}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 min-w-[120px]"
                        disabled={Object.keys(editedPosts).length === 0}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
