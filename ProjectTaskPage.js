import React from 'react';
import TaskColumn from './TaskColumn';
import TaskForm from './TaskForm';

import defaultstuff from './TaskData';

let emptyt = { name: "", desc: "" }; //default empty task

/** Task Page for pbapp which has lists of tasks that can be added to, deleted, or edited. **/
class ProjectTaskPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dispform: "none",
      alltasks: defaultstuff,
      currtask: { name: "", desc: "" }, currcol: ""
    };
    this.toggleF = this.toggleF.bind(this);
    this.editTasks = this.editTasks.bind(this);
    this.setCurrT = this.setCurrT.bind(this);
  }

  /* Toggle view for the form displaying current task */
  toggleF() {
    const newdisp = this.state.dispform == "none" ? "block" : "none";
    this.setState({ dispform: newdisp });
  }

  /* Set current task and display the form with given task's data */
  setCurrT(newt, newtc) {
    let nnewt = Object.assign({}, newt);
    this.setState({ currtask: nnewt, currcol: newtc });
    this.toggleF();
  }

  /* Find task column index given current column from state*/
  getTCIdx() {
    let tlist = this.state.alltasks;
    let i = 0;
    for ( ; i < tlist.length; i++) {
      if (tlist[i].title === this.state.currcol) {
        return i;
      }
    }
  }

  /* Delete task (and remove from view) */
  deleteTask(newt, newd) {
    let newdlist = [...this.state.alltasks];
    let i = 0, dl = 0;
    let ll = [], curr;

    //Find the task column
    dl = this.getTCIdx();
    ll = this.state.alltasks[dl].tasks;

    //Find the actual task within the column
    for (i = 0; i < ll.length; i++) {
      curr = ll[i];
      if (curr.name == newt && curr.desc == newd) {
        //delete
        newdlist[dl].tasks.splice(i, 1);
        break;
      }
    }
    this.setState({ alltasks: newdlist }); //update state
  }

  /* Change task name or description or both */
  updateData(newt, newd, old) {
    let newdlist = [...this.state.alltasks];
    let i = 0;
    let dl = [...this.state.alltasks];
    let ll = [], curr;

    let newobj = {name:newt, desc:newd};

    //Don't mod if given nothing in box
    if(newt === "")
      newt = old.name;
    if(newd === "")
      newd = old.desc;

    //Find task column and index
    let x = this.getTCIdx();
    ll = this.state.alltasks[x].tasks;

    for (i = 0; i < ll.length; i++) {
      curr = ll[i];
      if (curr.name === old.name && curr.desc === old.desc && newdlist[x].title === this.state.currcol) {
        newdlist[x].tasks[i] = newobj;
        break;
      }
    }

    this.setState({ alltasks: newdlist });
  }

  /* Get event and choose what to do */
  editTasks(typ, newt, newd, old) {
    if (typ == 2) {
      //Delete Task
      this.deleteTask(newt, newd);
    } else if (typ == 1) {
      //Modify
      this.updateData(newt, newd, old);
    }

    //Clear the form module and close it
    let d = emptyt;
    this.setState({ currtask: d, dispform: "none" });
  }

  /* Render task page */
  render() {
    return (
      <div>
        <div style={{ float: "right" }}>View: All Tasks</div>
        <br />

        <div className="totaltask">
          {this.state.alltasks.map((l, i) =>
            <TaskColumn key={i} taskl={l} setct={this.setCurrT} />
          )}
        </div>

        <TaskForm disp={this.state.dispform}
          currT={this.state.currtask} sendVals={this.editTasks} />
      </div>
    );
  }
}

export default ProjectTaskPage;
