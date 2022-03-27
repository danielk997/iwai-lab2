const Filter = ({onMassChange: onMassChange, onHeightChange: onHeightChange}) => {

    return (
        <form className='add-form'>
            <div className='form-control'>
                <label>Height</label>
                <input
                    id="height"
                    type='text'
                    placeholder='Height'
                    onChange={(e) => onHeightChange(e)}
                />
            </div>
            <div className='form-control'>
                <label>Mass</label>
                <input
                    id="mass"
                    type='text'
                    placeholder='Mass'
                    onChange={(e) => onMassChange(e)}
                />
            </div>
        </form>
    )
}

export default Filter
