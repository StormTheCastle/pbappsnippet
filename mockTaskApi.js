import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.
const idstasks = [{ id: "Ideas-Task-1", title: "Ideas Task 1", desc: "Description" },
                  { id: "Ideas-Task-2", title: "Ideas Task 2", desc: "Rando Desc" }, 
                  { id: "Ideas-Task-3", title: "Ideas Task 3", desc: "Blah Blah" }];
const edtasks = [{ id: "Edits-Task-1", title: "Edits Task 1", desc: "Description" },
                 { id: "Edits-Task-2", title: "Edits Task 2", desc: "Rando Desc" }, 
                 { id: "Edits-Task-3", title: "Edits Task 3", desc: "Blah Blah" }];
const artasks = [{ id: "Art-Task-1", title: "Art Task 1", desc: "Description" },
                 { id: "Art-Task-2", title: "Art Task 2", desc: "Rando Desc" }, 
                 { id: "Art-Task-3", title: "Art Task 3", desc: "Blah Blah" }];
const letasks = [{ id: "Legal-Task-1", title: "Legal Task 1", desc: "Description" },
                 { id: "Legal-Task-2", title: "Legal Task 2", desc: "Rando Desc" }, 
                 { id: "Legal-Task-3", title: "Legal Task 3", desc: "Blah Blah" }];
const mitasks = [{ id: "Misc-Task-1", title: "Misc Task 1", desc: "Description" },
                 { id: "Misc-Task-2", title: "Misc Task 2", desc: "Rando Desc" }, 
                 { id: "Misc-Task-3", title: "Misc Task 3", desc: "Blah Blah" }];

const tasklists = [
  {
    id: "ideas-col",
    title: "Ideas",
    tasks: [...idstasks],
    authorId: "cory-house"
  },
  {
    id: "edits-col",
    title: "Edits",
    tasks: [...edtasks],
    authorId: "cory-house"
  },
  {
    id: "art-col",
    title: "Art",
    tasks: [...artasks],
    authorId: "cory-house"
  },
  {
    id: "legal-col",
    title: "Legal",
    tasks: [...letasks],
    authorId: "cory-house"
  },
  {
    id: "misc-col",
    title: "Misc",
    tasks: [...mitasks],
    authorId: "cory-house"
  }
];

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (task) => {
  return replaceAll(task.title, ' ', '-');
};

/** Website task list API stand-in for a back-end**/
class TaskApi {
  static getAllTasks() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign([], tasklists));
      }, delay);
    });
  }

  static saveTask(task) {
    task = Object.assign({}, task); // to avoid manipulating object passed in.
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minTaskTitleLength = 1;
        if (task.title.length < minTaskTitleLength) {
          reject(`Title must be at least ${minTaskTitleLength} characters.`);
        }

        if (task.id) {
          const existingTaskId = tasklists.findIndex(a => a.id == task.id);
          tasklists.splice(existingTaskId, 1, task);
        } else {
          //Just simulating creation here.
          //Cloning so copy returned is passed by value rather than by reference.
          task.id = generateId(task);
          tasklists.push(task);
        }

        resolve(task);
      }, delay);
    });
  }

  static deleteTask(taskId) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const indexOfTaskToDelete = tasklists.findIndex(task=> {
          return task.id == taskId;
        });
        tasklists.splice(indexOfTaskToDelete, 1);
        resolve();
      }, delay);
    });
  }
}

export default TaskApi;