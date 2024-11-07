import {fetchPost} from "@/app/api/post.api";
import DeleteButton from "@/app/components/DeleteButton";

interface PostPageProps {
    params: { id: string };
}

const PostPage = async ({params}: PostPageProps) => {
    const {id} = await params;
    const post = await fetchPost(id);

    const mimeType = post.image?.mimeType || 'image/jpeg';
    const base64Image = `data:${mimeType};base64,${Buffer.from(post.image?.buffer).toString('base64')}`;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white p-6 shadow-lg rounded-lg relative">
                <DeleteButton postId={id} />
                <h1 className="text-4xl font-bold mb-2 break-words">{post.title}</h1>
                <p className="text-gray-500 text-sm mb-4">Updated: {new Date(post.updatedAt).toLocaleString()}</p>
                <div className="mb-6">
                    <img src={base64Image} alt={post.title} className="w-full max-h-96 object-contain rounded-md"/>
                </div>
                <div className="prose prose-xl break-words overflow-wrap text-lg"
                     dangerouslySetInnerHTML={{__html: post.description}}></div>
            </div>
        </div>
    );
};

export default PostPage;
