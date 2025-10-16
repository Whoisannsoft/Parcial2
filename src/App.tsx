import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import CommentList from './components/CommentList';
import AddComment from './components/AddComment';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<CommentList />} />
            <Route path="/add" element={<AddComment />} />
            <Route path="/edit/:id" element={<AddComment />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;