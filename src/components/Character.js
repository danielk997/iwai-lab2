import { FaTimes } from 'react-icons/fa'

const Character = ({ character, onDelete, onToggle }) => {
  return (
    <div
      className={`task ${character.reminder && 'reminder'}`}
      onDoubleClick={() => onToggle(character.id)}
    >
      <h3>
        {character.name}{' '}
        <FaTimes
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(character.id)}
        />
      </h3>
      <p>Height: {character.height}{' '}</p>
      <p>Mass: {character.mass}{' '}</p>
      <p>Eye color: {character.eye_color}{' '}</p>
      <p>Gender: {character.gender}{' '}</p>
    </div>
  )
}

export default Character
