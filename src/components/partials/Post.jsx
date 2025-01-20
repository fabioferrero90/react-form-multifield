import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

function Post({ id, title, content, date, author, removeFunc, updateFunc }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPost, setEditPost] = useState({ title, content, author });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditPost(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateFunc(id, editPost);
    closeModal();
  };

  return (
    <>
      <li className="row my-1 p-3 border rounded border-2 d-flex justify-content-between">
        <div className="col-2 d-flex flex-column justify-content-around">
          <span><strong>Autore:</strong><br/>{author}</span>
          <span><strong>Data:</strong><br/>{date}</span>
        </div>
        <div className="col-9 d-flex flex-column justify-content-around">
          <h4>{title}</h4>
          <span>{content}</span>
        </div>
        <div className="col-1 d-flex flex-column justify-content-around">
          <button type="button" className="edit-button btn btn-primary btn-sm" onClick={openModal}><FontAwesomeIcon icon={faEdit} /></button>
          <button type="button" className="remove-button btn btn-danger btn-sm" onClick={() => removeFunc(id)}><FontAwesomeIcon icon={faTrash} /></button>
        </div>
      </li>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Edit Post" ariaHideApp={false}>
        <h2>Modifica Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="author">Autore</label>
            <input type="text" className="form-control" id="author" name="author" value={editPost.author} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="title">Titolo</label>
            <input type="text" className="form-control" id="title" name="title" value={editPost.title} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="content">Contenuto</label>
            <textarea className="form-control" id="content" name="content" value={editPost.content} onChange={handleChange} rows="3" required></textarea>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Salva</button>
          <button type="button" className="btn btn-secondary" onClick={closeModal}>Annulla</button>
        </form>
      </Modal>
    </>
  );
}

export default Post;