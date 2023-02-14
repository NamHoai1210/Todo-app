import {useEffect, useState} from 'react';

import {useNavigate, useParams} from 'react-router-dom';
import instance from '../../auth';
function EditTodo() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const {id} = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    instance.get(`/todo/${id}`)
        .then((response) => {
          setTitle(response.data.title);
          setDesc(response.data.desc);
        });
  }, []);
  function onEditTodo(e) {
    e.preventDefault();
    instance.post(`/todo/${id}`, {title, desc})
        .then(() => {
          console.log('OK');
          navigate('/todo');
        });
  }

  return (
    <section>
      <form className="mb-4 p-2" onSubmit={(e) => onEditTodo(e)}>
        <div className="d-flex justify-content-center align-items-center mb-3">
          <div className="flex-fill me-2">
            <div className="form-outline">
              <input type="text" id="title" name="title" className="form-control" required
                value={title} onChange={(e) => setTitle(e.target.value)} />
              <label className="form-label" htmlFor="title">New task...</label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary ms-2">
            <b>UPDATE</b>
          </button>
        </div>
        <div className="form-outline">
          <input type="text" id="desc" name="desc" className="form-control" required
            value={desc} onChange={(e) => setDesc(e.target.value)} />
          <label className="form-label" htmlFor="desc">Description for new task...</label>
        </div>
        <input type="hidden" name="action" value="add" />
      </form>
      <hr className="mb-6 border-t" />
      <div className="text-center">
        <a
          href="/todo"
        >
          Back to Todo Page
        </a>
      </div>
    </section>
  );
}
export default EditTodo;
