import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import type { RootState, AppDispatch } from '../store/store';
import { addComment, editComment } from '../store/commentsSlice';
import type { Comment, CommentFormData } from '../types/comment';

const AddComment: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { comments } = useSelector((state: RootState) => state.comments);
  
  const isEditing = Boolean(id);
  const commentId = id ? parseInt(id, 10) : null;
  
  const [formData, setFormData] = useState<CommentFormData>({
    name: '',
    email: '',
    body: ''
  });

  useEffect(() => {
    if (isEditing && commentId) {
      const existingComment = comments.find(comment => comment.id === commentId);
      if (existingComment) {
        setFormData({
          name: existingComment.name,
          email: existingComment.email,
          body: existingComment.body
        });
      }
    }
  }, [isEditing, commentId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && commentId) {
      const updatedComment: Comment = {
        id: commentId,
        name: formData.name,
        email: formData.email,
        body: formData.body
      };
      dispatch(editComment(updatedComment));
    } else {
      const maxExistingId = Math.max(...comments.map(c => c.id), 0);
      const newComment: Comment = {
        id: maxExistingId + 1,
        name: formData.name,
        email: formData.email,
        body: formData.body
      };
      dispatch(addComment(newComment));
    }
    
    navigate('/');
  };

  return (
    <div>
      <h1>{isEditing ? 'Editar Comentario' : 'Agregar Nuevo Comentario'}</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label htmlFor="body">Comentario:</label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleInputChange}
            required
            rows={4}
            cols={50}
          />
        </div>
        
        <div>
          <button type="submit">
            {isEditing ? 'Actualizar Comentario' : 'Agregar Comentario'}
          </button>
          <button type="button" onClick={() => navigate('/')}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddComment;
