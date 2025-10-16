import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { RootState, AppDispatch } from '../store/store';
import { setComments, setError } from '../store/commentsSlice';
import { fetchComments } from '../services/commentsApi';
import type { Comment } from '../types/comment';

const CommentList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { comments, error } = useSelector((state: RootState) => state.comments);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const fetchedComments = await fetchComments();
        dispatch(setComments(fetchedComments));
      } catch (err) {
        dispatch(setError('Error al cargar los comentarios'));
      }
    };

    loadComments();
  }, [dispatch]);

  const handleEdit = (commentId: number) => {
    navigate(`/edit/${commentId}`);
  };



  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>SocialFeed - Comentarios</h1>
      <div>
        <button onClick={() => navigate('/add')}>Agregar Nuevo Comentario</button>
      </div>
      
      <div>
        {comments.map((comment: Comment) => (
          <div key={comment.id} style={{ 
            border: '1px solid #ccc', 
            margin: '10px 0', 
            padding: '10px'
          }}>
            <h3>{comment.name}</h3>
            <p><strong>Email:</strong> {comment.email}</p>
            <p><strong>Comentario:</strong> {comment.body}</p>
            <div>
              <button onClick={() => handleEdit(comment.id)}>Editar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentList;
