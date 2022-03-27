import {useEffect, useState} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import Filter from "./components/Filter";
import Sorter from "./components/Sorter";

const App = () => {
    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])
    const [filteredTasks, setFilteredTasks] = useState([])
    const mass = document.getElementById('mass');
    const height = document.getElementById('height');

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks()
            setTasks(tasksFromServer)
            setFilteredTasks(tasksFromServer)
        }

        getTasks()
    }, [])

    // Fetch Tasks
    const fetchTasks = async () => {
        const res = await fetch('http://localhost:5000/characters')
        const data = await res.json()

        return data
    }

    // Fetch Task
    const fetchTask = async (id) => {
        const res = await fetch(`http://localhost:5000/characters/${id}`)
        const data = await res.json()

        return data
    }

    // Add Task
    const addTask = async (task) => {
        const res = await fetch('http://localhost:5000/characters', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(task),
        })

        const data = await res.json()

        setFilteredTasks([...filteredTasks, data])

        setTasks([...tasks, data])
    }

    // Delete Task
    const deleteTask = async (id) => {
        const res = await fetch(`http://localhost:5000/characters/${id}`, {
            method: 'DELETE',
        })
        //We should control the response status to decide if we will change the state or not.
        // res.status === 200
        //     ? setFilteredTasks(filteredTasks.filter((task) => task.id !== id))
        //     : alert('Error Deleting This Task')
        //
        // res.status === 200
        //   ? setTasks(tasks.filter((task) => task.id !== id))
        //   : alert('Error Deleting This Task')
    }

    const filterTasks = (e) => {
        setFilteredTasks(
            tasks.filter(it => it.mass.includes(mass.value) && it.height.includes(height.value)
            )
        )
    }

    const onSortChange = (e) => {
        setFilteredTasks(
            e.target.value === 'height' ?
                [...filteredTasks.sort((a, b) => a.height - b.height)] :
                [...filteredTasks.sort((a, b) => a.mass - b.mass)]
        )
    }

    return (
        <Router>
            <div className='container'>
                <Header
                    onAdd={() => setShowAddTask(!showAddTask)}
                    showAdd={showAddTask}
                />
                <Routes>
                    <Route
                        path='/'
                        element={
                            <>
                                {showAddTask && <AddTask onAdd={addTask}/>}
                                <Filter
                                    onMassChange={(e) => filterTasks(e)}
                                    onHeightChange={(e) => filterTasks(e)}
                                />
                                <Sorter onSortChange={(e) => onSortChange(e)}/>
                                {filteredTasks.length > 0 ? (
                                    <Tasks
                                        tasks={filteredTasks}
                                        onDelete={deleteTask}
                                    />
                                ) : (
                                    'No Tasks To Show'
                                )}
                            </>
                        }
                    />
                    <Route path='/about' element={<About/>}/>
                </Routes>
                <Footer/>
            </div>
        </Router>
    )
}

export default App
