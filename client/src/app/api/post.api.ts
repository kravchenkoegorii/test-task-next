import {API_URL} from "@/app/shared/constants/app";

export const fetchPosts = async (): Promise<any[]> => {
    try {
        const res = await fetch(`${API_URL}/posts`);
        return await res.json();
    } catch (e) {
        console.error('Failed to fetch posts.', e);
        return [];
    }
};

export const fetchPost = async (id: string): Promise<any> => {
    try {
        const res = await fetch(`${API_URL}/posts/${id}`);
        return await res.json();
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

export const uploadImage = async (formData: FormData): Promise<any> => {
    try {
        console.log(formData);
        const imageResponse = await fetch(`${API_URL}/images`, {
            method: 'POST',
            body: formData,
        });
        return await imageResponse.json()
    } catch (error) {
        console.error('Failed to upload image', error);
        throw error;
    }
}

export const createPost = async (post: any): Promise<any> => {
    try {
        console.log(post);
        const postResponse = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        });
        return await postResponse.json();
    } catch (error) {
        console.error('Failed to create post', error);
        throw error;
    }
}
