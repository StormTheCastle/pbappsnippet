import React, { PropTypes } from 'react';
import Task from './Task';

/* TaskColumn Component that displays a list of tasks and also a button at the end 
* for the creation of new ones. */
class TaskColumn extends React.Component {
    constructor(props) {
        super(props);
        this.state = { tl: this.props.taskl, currcol: this.props.taskl.title };
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            tl: newProps.taskl,
            currcol: newProps.taskl.title
        });
    }

    render() {
        return (
            <div className="taskmenu">
                <h3 className="titlecenter">{this.state.currcol}</h3>
                {this.state.tl.tasks.map((t, i) =>
                    <Task key={this.state.tl.title + i} t={t} setct={this.props.setct} tcol={this.state.currcol} />
                )}
                <button className="tmenuelmt watcher hidebtn">Create New Task</button>
            </div>
        );
    }
}

TaskColumn.propTypes = {
    taskl: PropTypes.object.isRequired,
    setct: PropTypes.func.isRequired
};

export default TaskColumn;