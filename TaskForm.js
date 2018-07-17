import React, { PropTypes } from 'react';

/* TaskForm Component that will display on click of a task and show its title and description.
 * Uses text boxes to allow modification and also has buttons for deletion. */
class TaskForm extends React.Component {
    //TaskForm displays title and description depending on task clicked
    constructor(props) {
        super(props);
        this.state = {
            currT: this.props.currT,
            newtitle: this.props.currT.name, newd: this.props.currT.desc
        };
        this.setTitle = this.setTitle.bind(this);
        this.setD = this.setD.bind(this);
        this.clearAndClose = this.clearAndClose.bind(this);
        this.updateP = this.updateP.bind(this);
        this.deleteT= this.deleteT.bind(this);
    }

    componentWillReceiveProps(newProps){
        this.setState({currT: newProps.currT, 
                        newtitle: newProps.currT.name,
                        newd: newProps.currT.desc});
    }

    setTitle(e) {
        let nt = e.target.value;
        this.setState({ newtitle: nt });
    }

    setD(e) {
        let nd = e.target.value;
        this.setState({ newd: nd });
    }

    clearAndClose(e) {
        e.preventDefault();
        this.props.sendVals(0, "", "", this.state.currT);
    }

    updateP(e) {
        e.preventDefault();
        this.props.sendVals(1, this.state.newtitle, this.state.newd, this.state.currT);
    }

    deleteT(e) {
        e.preventDefault();
        this.props.sendVals(2, this.state.newtitle, this.state.newd, this.state.currT);
    }

    render() {
        return (
            <div className="taskform" style={{ display: this.props.disp }}>
                <form className="taskform-content" onSubmit={this.updateP}>
                    <span><button type="button" onClick={this.clearAndClose}>&times;</button></span>
                    <span className="matchtext">Task Name:</span><br />
                    <input type="text" className="fillbox" placeholder={this.state.currT.name} onChange={this.setTitle}/><br />
                    <span className="matchtext">Description:</span><br />
                    <input type="text" className="fillbox" placeholder={this.state.currT.desc} onChange={this.setD}/>
                    <br />
                    <span><button type="button" onClick={this.deleteT}>Delete</button></span>
                    <span className="floright"> <button type="button" value="Modify" onClick={this.updateP}>Save</button></span>
                </form>
            </div>
        );
    }
}

TaskForm.propTypes = {
    disp: PropTypes.string.isRequired,
    currT: PropTypes.object.isRequired,
    sendVals: PropTypes.func.isRequired
};

export default TaskForm;