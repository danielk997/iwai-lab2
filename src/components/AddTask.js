import {useState} from 'react'

const AddTask = ({onAdd}) => {

    const [name, setName] = useState('')
    const [height, setHeight] = useState('')
    const [mass, setMass] = useState('')
    const [eyeColor, setEyeColor] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        onAdd({name, height, mass, eye_color: eyeColor})
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Name</label>
                <input
                    type='text'
                    placeholder='Add Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className='form-control'>
                <label>Height</label>
                <input
                    type='text'
                    placeholder='Height'
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                />
            </div>
          <div className='form-control'>
            <label>Mass</label>
            <input
                type='text'
                placeholder='mass'
                value={mass}
                onChange={(e) => setMass(e.target.value)}
            />
          </div>
            <div className='form-control'>
                <label>Eye color</label>
                <select onChange={(e) => setEyeColor(e.target.value)}>
                    <option value="blue">blue</option>
                    <option value="brown">brown</option>
                    <option value="green">green</option>
                </select>
            </div>

            <input type='submit' value='Save Task' className='btn btn-block'/>
        </form>
    )
}

export default AddTask
