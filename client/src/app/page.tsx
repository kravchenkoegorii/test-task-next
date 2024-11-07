import {fetchPosts} from "@/app/api/post.api";
import ClientSidePagination from "@/app/components/Pagination";

const HomePage = async () => {
    const postsResponse = await fetchPosts(3, 1);

    return (
        <div>
            <ClientSidePagination initialPosts={postsResponse.data} initialTotalPages={postsResponse.totalPages} />
        </div>
    );
};

export default HomePage;
