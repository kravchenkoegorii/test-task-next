import PostCard from "@/app/components/PostCard";
import {fetchPosts} from "@/app/api/post.api";
import Link from "next/link";
import CreatePostButton from "@/app/components/CreatePostButton";

export default async function HomePage() {
    const posts = await fetchPosts();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="container mx-auto px-4 py-8 flex justify-between items-center">
                <h1 className="text-3xl font-bold">Blog Posts</h1>
                <CreatePostButton/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <Link href={`/posts/${post._id}`} key={post._id}>
                        <PostCard
                            key={post._id}
                            post={post}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};
