export interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface CommentFormData {
  name: string;
  email: string;
  body: string;
}
