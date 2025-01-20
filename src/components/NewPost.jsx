import { useState } from 'react';
const NewPost = ({addFunc, posts}) => {
  const [postInsert, setPostInsert] = useState({ autore: "Fabio", titolo: "", contenuto: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostInsert(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const lastId = posts.reduce((last, post) => (post.id > last ? post.id : last), 0);
    const newPost = {...postInsert,
        data: new Date().toLocaleDateString(),
        id: lastId + 1
    };
    addFunc(newPost)
  };

  return (
    <>
      <form className="col-2 border border-2 rounded p-4 m-4 h-50" onSubmit={handleSubmit}>
        <h4 className="mb-4">Inserisci un nuovo articolo</h4>
        <div className="form-group">
          <label htmlFor="autore">Autore</label>
          <select className="form-control" id="autore" name="autore" value={postInsert.autore} onChange={handleChange} required>
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
        <button type="submit" className="btn btn-primary w-100">Invia</button>
      </form>
    </>
  );
};

export default NewPost;