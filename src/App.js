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
    const [characters, setCharacters] = useState([])
    const [filteredCharacters, setFilteredCharacters] = useState([])
    const mass = document.getElementById('mass');
    const height = document.getElementById('height');

    useEffect(() => {
        const getTasks = async () => {
            const charactersFromServer = await fetchTasks()
            setCharacters(charactersFromServer)
            setFilteredCharacters(charactersFromServer)
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

        setFilteredCharacters([...filteredCharacters, data])

        setCharacters([...characters, data])
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
        setFilteredCharacters(
            characters.filter(it => it.mass.includes(mass.value) && it.height.includes(height.value)
            )
        )
    }

    const onSortChange = (e) => {
        setFilteredCharacters(
            e.target.value === 'height' ?
                [...filteredCharacters.sort((a, b) => a.height - b.height)] :
                [...filteredCharacters.sort((a, b) => a.mass - b.mass)]
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
                                {filteredCharacters.length > 0 ? (
                                    <Tasks
                                        tasks={filteredCharacters}
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
