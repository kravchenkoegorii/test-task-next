import {API_URL} from "@/app/shared/constants/app";

export const fetchPosts = async (limit?: number, page?: number): Promise<any> => {
    try {
        let res;

        if (limit && page) {
            res = await fetch(`${API_URL}/posts?limit=${limit}&page=${page}`);
        } else {
            res = await fetch(`${API_URL}/posts`);
        }

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
        throw e;
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

export const bulkDeletePosts = async (ids: string[]): Promise<any> => {
    try {
        await fetch(`${API_URL}/posts/bulk-delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ids}),
        });
    } catch (error) {
        console.error('Error deleting posts:', error);
        throw error;
    }
}

export const uploadImage = async (formData: FormData): Promise<any> => {
    try {
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

export const deleteImage = async (id: string): Promise<any> => {
    try {
        await fetch(`${API_URL}/images/${id}`, {
            method: 'DELETE',
        });
    } catch (error) {
        console.error('Failed to delete image', error);
        throw error;
    }
}

export const createPost = async (post: any): Promise<any> => {
    try {
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

export const updatePost = async (id: string, post: any): Promise<any> => {
    try {
        const postResponse = await fetch(`${API_URL}/posts/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
        });
        return await postResponse.json();
    } catch (error) {
        console.error('Failed to update post', error);
        throw error;
    }
}

export const bulkUpdatePosts = async (updates: { id: string; updateData: any }[]): Promise<void> => {
    try {
        await fetch(`${API_URL}/posts/bulk-update`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
        });
    } catch (error) {
        console.error('Error updating posts:', error);
        throw error;
    }
};

