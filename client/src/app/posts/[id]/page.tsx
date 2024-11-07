'use client';

import {fetchPost} from "@/app/api/post.api";
import DeleteButton from "@/app/components/DeleteButton";
import {useState, useEffect} from 'react';
import EditButton from "@/app/components/EditButton";
import Loading from "@/app/loading";

interface PostPageProps {
    params: Promise<{ id: string }>;
}

const PostPage = ({params}: PostPageProps) => {
    const [postId, setPostId] = useState<string | null>(null);
    const [post, setPost] = useState<any | null>(null);

    useEffect(() => {
        const unwrapParams = async () => {
            const {id} = await params;
            setPostId(id);
        }

        unwrapParams();
    }, [params]);

    useEffect(() => {
        if (postId) {
            const loadPost = async () => {
                try {
                    const fetchedPost = await fetchPost(postId);
                    setPost(fetchedPost);
                } catch (error) {
                    console.error('Failed to load post:', error);
                }
            };

            loadPost();
        }
    }, [postId]);

    if (!post) return <Loading />;

    const mimeType = post.image?.mimeType || 'image/jpeg';
    const base64Image = `data:${mimeType};base64,${Buffer.from(post.image?.buffer).toString('base64')}`;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white p-6 shadow-lg rounded-lg relative">
                <DeleteButton postId={postId} />
                <EditButton
                    postId={postId}
                    initialTitle={post.title}
                    initialDescription={post.description}
                    initialImageId={post.imageId}
                />
                <div>
                    <h1 className="text-4xl font-bold mb-2 break-words">{post.title}</h1>
                    <p className="text-gray-500 text-sm mb-4">Updated: {new Date(post.updatedAt).toLocaleString()}</p>
                    <div className="mb-6">
                        <img src={base64Image} alt={post.title} className="w-full max-h-96 object-contain rounded-md" />
                    </div>
                    <div className="prose prose-xl break-words overflow-wrap text-lg" dangerouslySetInnerHTML={{ __html: post.description }}></div>
                </div>
            </div>
        </div>
    );
};

export default PostPage;
