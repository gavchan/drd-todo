import React, { Component } from 'react';

// Generate several default todoItems
const todoItems = [
  {
    "id": 1,
    "task": "Buy groceries",
    "description": "Eggs, ham, vegetables",
    "completed": true,
    "created_at": "06/02/2020 09:30:24",
    "completed_at": "08/02/2020 09:30:24"
  },
  {
    "id": 2,
    "task": "Wash car",
    "description": "Make sure to clean inside",
    "completed": false,
    "created_at": "07/02/2020 19:30:24",
    "completed_at": null
  },
  {
    "id": 3,
    "task": "Prepare presentation",
    "description": "Conference in in March",
    "completed": false,
    "created_at": "08/02/2020 10:01:01",
    "completed_at": null
  }
]

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewCompleted: false,
      todoList: todoItems
    };
  }

  displayCompleted = status=> {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };

  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incomplete
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(
      item => item.completed == viewCompleted
    );
    return newItems.map(item => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewCompleted ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.task}
        </span>
        <span>
          <button className="btn btn-secondary mr-2"> Edit </button>
          <button className="btn btn-danger"> Delete </button>
        </span>
      </li>
    ));
  };
  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button className="btn btn-primary"> Add task </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
      </main>
    )
  }
}
export default App;
