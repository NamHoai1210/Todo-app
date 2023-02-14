import React, {memo, useState} from 'react';
import instance from '../auth';
const AddTask = memo(
    (props) => {
      const [title, setTitle] = useState('');
      const [desc, setDesc] = useState('');
      const {addTodo} = props;
      function onAddTodo(e) {
        e.preventDefault();
        instance.post('/todo', {title, desc, action: 'add'})
            .then((response) => {
              if (response.data.id) {
                addTodo(
                    response.data,
                );
              } else {
                alert('Can\'t add this todo! There are something wrong!');
              }
              setTitle('');
              setDesc('');
            });
      }
      return (
        <section>
          <form className="mb-5 p-2" onSubmit={(e) => onAddTodo(e)}>
            <div className="d-flex justify-content-center align-items-center mb-3">
              <div className="flex-fill me-2">
                <div className="form-outline">
                  <input type="text" id="title" name="title" className="form-control" required
                    value={title} onChange={(e) => setTitle(e.target.value)} />
                  <label className="form-label" htmlFor="title">New task...</label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary ms-2">
                <b>ADD</b>
              </button>
            </div>
            <div className="form-outline">
              <input type="text" id="desc" name="desc" className="form-control" required
                value={desc} onChange={(e) => setDesc(e.target.value)} />
              <label className="form-label" htmlFor="desc">Description for new task...</label>
            </div>
            <input type="hidden" name="action" value="add" />
          </form>
        </section>
      );
    },
);
export default AddTask;
