'use client';

import {fetchPost} from "@/app/api/post.api";
import DeleteButton from "@/app/components/DeleteButton";
import {useState, useEffect} from 'react';
import EditPostForm from '@/app/components/EditPostForm';
import Loading from "@/app/loading";

interface PostPageProps {
    params: Promise<{ id: string }>
}

const PostPage = ({params}: PostPageProps) => {
    const [postId, setPostId] = useState<string | null>(null);
    const [post, setPost] = useState<any | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [image, setImage] = useState<string | null>(null);

    useEffect(() => {
        const unwrapParams = async () => {
            const {id} = await params;
            setPostId(id);
        };

        unwrapParams();
    }, [params]);

    useEffect(() => {
        if (postId) {
            const loadPost = async () => {
                try {
                    const fetchedPost = await fetchPost(postId);
                    setPost(fetchedPost);

                    const mimeType = fetchedPost?.image?.mimeType || 'image/jpeg';
                    const base64Image = `data:${mimeType};base64,${Buffer.from(fetchedPost?.image?.buffer).toString('base64')}`;
                    setImage(base64Image);
                } catch (error) {
                    console.error('Failed to load post:', error);
                }
            };

            loadPost();
        }
    }, [postId]);

    if (!post) return <Loading/>;

    return (
        <div className="container mx-auto px-4 py-8">
            {!isEditing ? (
                <div className="bg-white p-6 shadow-lg rounded-lg relative">
                    <DeleteButton postId={postId}/>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="p-2 hover:bg-gray-100 rounded transition duration-200 absolute top-2 right-10"
                    >
                        <svg
                            fill="#000000"
                            version="1.1"
                            id="Capa_1"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 528.899 528.899"
                            className="w-6 h-6"
                        >
                            <g>
                                <path
                                    d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981 c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611 C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069 L27.473,390.597L0.3,512.69z"></path>
                            </g>
                        </svg>
                    </button>
                    <div>
                        <h1 className="text-4xl font-bold mb-2 break-words">{post.title}</h1>
                        <p className="text-gray-500 text-sm mb-4">Updated: {new Date(post.updatedAt).toLocaleString()}</p>
                        <div className="mb-6">
                            <img src={image ? image : undefined} alt={post.title}
                                 className="w-full max-h-96 object-contain rounded-md"/>
                        </div>
                        <div className="prose prose-xl break-words overflow-wrap text-lg"
                             dangerouslySetInnerHTML={{__html: post.description}}></div>
                    </div>
                </div>
            ) : (
                <EditPostForm
                    post={post}
                    initialImage={image}
                    onCancel={() => setIsEditing(false)}
                    onSave={() => {
                        setIsEditing(false);
                        window.location.reload();
                    }}
                />
            )}
        </div>
    );
};

export default PostPage;
