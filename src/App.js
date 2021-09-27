import React, { useState, useEffect } from "react";
import { TaskRow } from './components/TaskRow'
import { TaskBanner } from './components/TaskBanner';
import { TaskCreator } from "./components/TaskCreator";
import { VisibilityControl } from "./components/VisibilityControl";

function App() {
  const [userName, setUserName] = useState('')
  const [taskItems, setTaskItems] = useState([
    { name: 'Study', done: false },
    { name: 'Shopping', done: false },
    { name: 'Read a book', done: true },
    { name: 'Doing sports', done: false }
  ])
  const [showCompleted, setShowCompleted] = useState(true)
  //equivalente al componenttDidMount
  useEffect(() => {
    //si existe la propiedad guardo en una variable
    let data = localStorage.getItem('tasks')
    if (data != null){
      setTaskItems(JSON.parse(data))
    }else{
      setUserName('')
      setTaskItems([
        { name: 'To study', done: false },
        { name: 'Go to the supermarket', done: false },
        { name: 'Sort the books', done: true },
        { name: 'Go for a run', done: false }
      ])
      setShowCompleted(true)
    }
  }, [])

  //guardo
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskItems))
  }, [])

  const createNewTask = taskName => {
    if (!taskItems.find(t => t.name === taskName)) {
      //significa que no ha sido agregada previamente
      setTaskItems([...taskItems, { name: taskName, done: false }])
    }
  }
  const toggleTask = task =>
    setTaskItems(taskItems.map(t => (t.name === task.name ? { ...t, done: !t.done } : t)))

  const taskTableRows = (doneValue) => (
    taskItems
      .filter(task => task.done == doneValue)
      .map(task => (
        <TaskRow task={task} key={task.name} toggleTask={toggleTask} />
      ))
  )
  return (
    <div>
      <TaskBanner userName={userName} taskItems={taskItems} />
      <TaskCreator callback={createNewTask} />
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Done</th>
          </tr>
        </thead>
        <tbody>
          {taskTableRows(false)}
        </tbody>
      </table>
      <div className="col bg-default text-white p-1">
        <VisibilityControl
          description="Completed Tasks"
          isChecked={showCompleted}
          callback={checked => setShowCompleted(checked)}
        />
      </div>
      {
        showCompleted && (
          <table className='table table-striped table-bordered'>
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              {
                taskTableRows(true)
              }

            </tbody>
          </table>
        )
      }
    </div>
  );
}

export default App;
