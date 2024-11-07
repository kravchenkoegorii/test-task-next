import React from 'react';
import {PostCardProps} from "@/app/shared/types/post-card-props";
import {truncateHtml} from "@/app/shared/utils/truncate.html";

const PostCard: React.FC<PostCardProps> = ({post}) => {
    const base64Image = `data:${post?.image?.mimeType};base64,${Buffer.from(post?.image?.buffer).toString('base64')}`;
    const shortDescription = truncateHtml(post.description);

    return (
        <div className="border rounded-lg overflow-hidden shadow-lg h-62">
            <img src={base64Image} alt={post.title}
                 className="h-48 w-full flex items-center justify-center bg-gray-100"/>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2 overflow-hidden overflow-ellipsis whitespace-nowrap">{post.title}</h2>
                <p className="text-gray-700 overflow-hidden overflow-ellipsis whitespace-nowrap max-h-16">{shortDescription}</p>
            </div>
        </div>
    );
};

export default PostCard;
