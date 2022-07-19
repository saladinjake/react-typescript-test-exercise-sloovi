import React, { Component } from "react";
import { connect } from "react-redux";
import { updateTask, deleteTask } from "../../actions";
import SlooveeCrudeApiService from "../../services/crudeapi.service";

class Task extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.gettask = this.gettask.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removetask = this.removetask.bind(this);

    this.state = {
      currentTask: {
        id: null,
        title: "",
        description: "",
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.gettask(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentTask: {
          ...prevState.currentTask,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentTask: {
        ...prevState.currentTask,
        description: description,
      },
    }));
  }

  gettask(id) {
    SlooveeCrudeApiService.getTask(id)
      .then((response) => {
        this.setState({
          currentTask: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      id: this.state.currentTask.id,
      title: this.state.currentTask.title,
      description: this.state.currentTask.description,
      published: status,
    };

    this.props
      .updatetask(this.state.currentTask.id, data)
      .then((reponse) => {
        console.log(reponse);

        this.setState((prevState) => ({
          currentTask: {
            ...prevState.currentTask,
            published: status,
          },
        }));

        this.setState({ message: "The status was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updatetask(this.state.currentTask.id, this.state.currentTask)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The task was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removetask() {
    this.props
      .deletetask(this.state.currentTask.id)
      .then(() => {
        this.props.history.push("/task");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentTask } = this.state;

    return (
      <div>
        {currentTask ? (
          <div className="edit-form">
            <h4>task</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentTask.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentTask.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentTask.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentTask.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updateStatus(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.removetask}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateContent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a task...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updatetask, deletetask })(task);
