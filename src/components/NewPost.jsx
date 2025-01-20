import React, { useState } from 'react';

const NewPost = ({ addFunc, posts }) => {
  const [postInsert, setPostInsert] = useState({
    autore: '',
    titolo: '',
    contenuto: '',
    image: '',
    category: '',
    tags: [],
    status: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setPostInsert((prevState) => {
        if (checked) {
          return { ...prevState, tags: [...prevState.tags, value] };
        } else {
          return { ...prevState, tags: prevState.tags.filter((tag) => tag !== value) };
        }
      });
    } else {
      setPostInsert({ ...postInsert, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const lastId = posts.reduce((last, post) => (post.id > last ? post.id : last), 0);
    const newPost = {...postInsert,
        data: new Date().toLocaleDateString(),
        id: lastId + 1
    };
    addFunc(newPost);
    setPostInsert({
      autore: '',
      titolo: '',
      contenuto: '',
      image: '',
      category: '',
      tags: [],
      status: ''
    });
  };

  return (
    <>
      <form className="col-2 border border-2 rounded p-4 m-4 h-50" onSubmit={handleSubmit}>
        <h4 className="mb-4">Inserisci un nuovo articolo</h4>
        <div className="form-group">
          <label htmlFor="autore">Autore</label>
          <select className="form-control" id="autore" name="autore" value={postInsert.autore} onChange={handleChange} required>
            <option value="">Seleziona Autore</option>
            <option>Fabio</option>
            <option>Stefano</option>
            <option>Ugo</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="titolo">Titolo</label>
          <input type="text" className="form-control" id="titolo" name="titolo" value={postInsert.titolo} onChange={handleChange} placeholder="Titolo" required />
        </div>
        <div className="form-group">
          <label htmlFor="contenuto">Contenuto</label>
          <textarea className="form-control" id="contenuto" name="contenuto" value={postInsert.contenuto} onChange={handleChange} rows="3" placeholder="Contenuto" required></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Immagine</label>
          <input type="text" className="form-control" id="image" name="image" value={postInsert.image} onChange={handleChange} placeholder="URL Immagine" required />
        </div>
        <div className="form-group">
          <label htmlFor="category">Categoria</label>
          <select className="form-control" id="category" name="category" value={postInsert.category} onChange={handleChange} required>
            <option value="">Seleziona Categoria</option>
            <option>JavaScript</option>
            <option>Programmazione</option>
            <option>React</option>
          </select>
        </div>
        <div className="form-group">
          <label>Tags</label>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="tag1" name="tags" value="React" onChange={handleChange} />
            <label className="form-check-label" htmlFor="tag1">React</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="tag2" name="tags" value="JavaScript" onChange={handleChange} />
            <label className="form-check-label" htmlFor="tag2">JavaScript</label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="tag3" name="tags" value="CSS" onChange={handleChange} />
            <label className="form-check-label" htmlFor="tag3">CSS</label>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="status">Stato</label>
          <select className="form-control" id="status" name="status" value={postInsert.status} onChange={handleChange} required>
            <option value="">Seleziona Stato</option>
            <option>Pubblicato</option>
            <option>Bozza</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary w-100">Invia</button>
      </form>
    </>
  );
};

export default NewPost;