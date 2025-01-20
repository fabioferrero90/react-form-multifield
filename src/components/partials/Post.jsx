import React, { useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const Post = ({ id, image, author, date, title, content, status, category, tags, updateFunc, removeFunc }) => {
  const postData = {
    id:id,
    image:image,
    author:author,
    date:date,
    title:title,
    content:content,
    status:status,
    category:category,
    tags:tags
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPost, setEditPost] = useState({ author, title, content, image, category, tags, status });

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const PublishPost = (postData) => {
    const postToPublish = { ...postData, status: 'Pubblicato'};
    updateFunc( postData.id, postToPublish);
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setEditPost((prevState) => {
        if (checked) {
          return { ...prevState, tags: [...prevState.tags, value] };
        } else {
          return { ...prevState, tags: prevState.tags.filter((tag) => tag !== value) };
        }
      });
    } else {
      setEditPost({ ...editPost, [name]: value });
    }
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
          <img className="postImage" src={image} alt="Post Image" />
        </div>
        <div className="col-2 d-flex flex-column justify-content-around">
          <span><strong>Autore:</strong><br/>{author}</span>
          <span><strong>Categoria:</strong><br/>{category}</span>
          <span><strong>Data:</strong><br/>{date}</span>
        </div>
        <div className="col-7 d-flex flex-column justify-content-around my-2">
          <p>Stato:<span className={`badge badge-primary w-10 mx-2 ${status === 'Pubblicato' ? 'bg-success' : 'bg-danger'}`}>{status}</span> {status !== 'Pubblicato' ? (
            <a className="publish-now" href="#" onClick={() => PublishPost(postData)}>Pubblica adesso</a>
            ) : ''}</p>
          <h4 className="my-0">{title}</h4>
          <span className="my-1">{content}</span>
          <div className="tagList">
            {tags.map((tag, i) => (
              <span key={i} className="badge badge-primary bg-secondary me-1">{tag}</span>
            ))}
          </div>
        </div>
        <div className="col-1 d-flex flex-column justify-content-around">
          <button type="button" className="edit-button btn btn-primary btn-sm h-100 my-2" onClick={openModal}><FontAwesomeIcon icon={faEdit} /></button>
          <button type="button" className="remove-button btn btn-danger btn-sm h-100 my-2" onClick={() => removeFunc(id)}><FontAwesomeIcon icon={faTrash} /></button>
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
          <div className="form-group">
            <label htmlFor="image">Immagine</label>
            <input type="text" className="form-control" id="image" name="image" value={editPost.image} onChange={handleChange} placeholder="URL Immagine" required />
          </div>
          <div className="form-group">
            <label htmlFor="category">Categoria</label>
            <select className="form-control" id="category" name="category" value={editPost.category} onChange={handleChange} required>
              <option value="">Seleziona Categoria</option>
              <option>JavaScript</option>
              <option>Programmazione</option>
              <option>React</option>
            </select>
          </div>
          <div className="form-group">
            <label>Tags</label>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="tag1" name="tags" value="React" checked={editPost.tags.includes('React')} onChange={handleChange} />
              <label className="form-check-label" htmlFor="tag1">React</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="tag2" name="tags" value="JavaScript" checked={editPost.tags.includes('JavaScript')} onChange={handleChange} />
              <label className="form-check-label" htmlFor="tag2">JavaScript</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="tag3" name="tags" value="CSS" checked={editPost.tags.includes('CSS')} onChange={handleChange} />
              <label className="form-check-label" htmlFor="tag3">CSS</label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="status">Stato</label>
            <select className="form-control" id="status" name="status" value={editPost.status} onChange={handleChange} required>
              <option value="">Seleziona Stato</option>
              <option>Pubblicato</option>
              <option>Bozza</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary my-2 me-2">Salva</button>
          <button type="button" className="btn btn-secondary" onClick={closeModal}>Annulla</button>
        </form>
      </Modal>
    </>
  );
}

export default Post;