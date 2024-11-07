'use client';

import {useEffect, useState} from 'react';
import PostCard from "@/app/components/PostCard";
import Link from "next/link";
import CreatePostButton from "@/app/components/CreatePostButton";
import {fetchPosts} from "@/app/api/post.api";

interface ClientSidePaginationProps {
    initialPosts: any[];
    initialTotalPages: number;
}

const ClientSidePagination = ({initialPosts, initialTotalPages}: ClientSidePaginationProps) => {
    const [posts, setPosts] = useState(initialPosts);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);
    const [totalPages, setTotalPages] = useState(initialTotalPages);

    useEffect(() => {
        const loadPosts = async () => {
            const response = await fetchPosts(limit, page);
            setPosts(response.data);
            setTotalPages(response.totalPages);
        };

        loadPosts();
    }, [page, limit]);

    const handleNextPage = () => {
        if (page < totalPages) setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLimit(parseInt(e.target.value, 10));
        setPage(1);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Blog Posts</h1>
                <CreatePostButton/>
            </div>
            <div className="mb-4">
                <label htmlFor="limit" className="mr-2">Posts per page:</label>
                <select
                    id="limit"
                    value={limit}
                    onChange={handleLimitChange}
                    className="border p-2 rounded"
                >
                    <option value={3}>3</option>
                    <option value={9}>9</option>
                    <option value={18}>18</option>
                </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <Link href={`/posts/${post._id}`} key={post._id}>
                        <PostCard post={post}/>
                    </Link>
                ))}
            </div>
            <div className="flex justify-between mt-4">
                <button
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                    Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default ClientSidePagination;
