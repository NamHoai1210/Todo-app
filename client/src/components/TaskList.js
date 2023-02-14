import React, {memo} from 'react';
import Task from './Task';
const TaskList = memo(
    (props) => {
      const {todosList, updateTodo, deleteTodo} = props;
      return (
        <section>
          <div className="tab-content" id="ex1-content">
            <div className="tab-pane fade show active" id="ex1-tabs-1" role="tabpanel"
              aria-labelledby="ex1-tab-1">
              <ul className="list-group mb-0 overflow-auto"
                style={{
                  maxHeight: '384px',
                  minHeight: '240px',
                }}>

                {
                  todosList.map((task) => (
                    <Task key={`task${task.id}`}
                      task={task}
                      updateTodo={updateTodo}
                      deleteTodo={deleteTodo}/>
                  ))
                }
              </ul>
            </div>
          </div>
        </section>
      );
    });

export default TaskList;
