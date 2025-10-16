import type { Comment } from '../types/comment';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchComments = async (): Promise<Comment[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/1/comments`);
    if (!response.ok) {
      throw new Error('Error al cargar los comentarios');
    }
    const comments: Comment[] = await response.json();
    return comments;
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    throw error;
  }
};
