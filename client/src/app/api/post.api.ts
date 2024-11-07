import {API_URL} from "@/app/shared/constants/app";

export const fetchPosts = async (): Promise<any[]> => {
    try {
        const res = await fetch(`${API_URL}/posts`);
        return res.json();
    } catch (e) {
        console.error('Failed to fetch posts.', e);
        return [];
    }
};

export const fetchPost = async (id: string): Promise<any> => {
    try {
        const res = await fetch(`${API_URL}/posts/${id}`);
        return res.json();
    } catch (e) {
        console.error('Failed to fetch post', e);
        return [];
    }
};

export const deletePost = async (id: string): Promise<any> => {
    try {
        await fetch(`${API_URL}/posts/${id}`, {
            method: 'DELETE',
        });
    } catch (error) {
        console.error('Failed to delete the post', error);
    }
}
