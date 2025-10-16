import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Comment } from '../types/comment';

interface CommentsState {
  comments: Comment[];
  error: string | null;
}

const initialState: CommentsState = {
  comments: [],
  error: null,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
      state.error = null;
    },
    addComment: (state, action: PayloadAction<Comment>) => {
      state.comments.push(action.payload);
    },
    editComment: (state, action: PayloadAction<Comment>) => {
      const index = state.comments.findIndex(comment => comment.id === action.payload.id);
      if (index !== -1) {
        state.comments[index] = action.payload;
      }
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setComments,
  addComment,
  editComment,
  setError,
} = commentsSlice.actions;

export default commentsSlice.reducer;
