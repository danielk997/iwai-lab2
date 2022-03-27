const Sorter = ({onSortChange: onSortChange}) => {

    return (
        <form className='add-form'>
            <h2>Sorts</h2>
            <div className='form-control'>
                <label>Sort By</label>
                <select onChange={(e) => onSortChange(e)}>
                    <option value="mass">mass</option>
                    <option value="height">height</option>
                </select>
            </div>
        </form>
    )
}

export default Sorter
