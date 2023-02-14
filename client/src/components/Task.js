import React, {memo} from 'react';

const Task = memo(
    (props) => {
      const {task, updateTodo, deleteTodo} = props;
      return (
        <>
          <li className="list-group-item d-flex align-items-center justify-content-between p-2"
            style={{
              border: 'none',
              borderBottom: '1px solid lightgrey',
            }}
          >
            <div className="d-flex align-items-center">
              <input className="form-check-input mx-2" type="checkbox" value="" id="flexCheckChecked"
                checked={task.is_done} onChange={() => updateTodo(task)} />
              <button className="btn btn-link text-decoration-none text-black"
                type="button" title="Click to see description"
                data-bs-toggle="collapse" data-bs-target={`#collapse${task.id}`}
                aria-expanded="false" aria-controls={`collapse${task.id}`}>
                <span className={task.is_done ? 'text-decoration-line-through' : ''}>{task.title}</span>
              </button>
            </div>
            <div className="d-flex align-items-center">
              <a href={`/todo/${task.id}`} className="btn btn-success me-2" >
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </a>
              <button type="button" className="btn btn-danger" onClick={() => deleteTodo(task)}>
                <i className="fa fa-trash-o" aria-hidden="true"></i>
              </button>
            </div>
          </li >
          <div className="collapse" id={`collapse${task.id}`}>
            <div className="px-5 card-body"
              style={{
                color: 'grey',
                backgroundColor: '#f2f2f2',
              }}
            >
              {task.desc}
            </div>
          </div>
        </>
      );
    },
);

export default Task;
