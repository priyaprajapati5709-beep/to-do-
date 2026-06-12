import { useState } from 'react'

function ToDoItem({ todo, onDelete, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)
  const [editError, setEditError] = useState('')

  const handleEditSave = () => {
    const success = onEdit(todo.id, editText)
    if (success) {
      setIsEditing(false)
      setEditError('')
    } else {
      setEditError('Min 3 characters required.')
    }
  }

  const handleEditCancel = () => {
    setEditText(todo.text)
    setEditError('')
    setIsEditing(false)
  }

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') handleEditSave()
    if (e.key === 'Escape') handleEditCancel()
  }

  return (
    <div className={`todo-item ${todo.completed ? 'todo-item--done' : ''}`}>
      <button
        className={`check-btn ${todo.completed ? 'check-btn--checked' : ''}`}
        onClick={() => onToggle(todo.id)}
        aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
      >
        {todo.completed && (
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M1 5L4.5 8.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>

      <div className="todo-content">
        {isEditing ? (
          <div className="edit-wrapper">
            <input
              autoFocus
              type="text"
              value={editText}
              onChange={(e) => { setEditText(e.target.value); setEditError('') }}
              onKeyDown={handleEditKeyDown}
              className={`edit-input ${editError ? 'is-error' : ''}`}
              maxLength={200}
            />
            {editError && <span className="edit-error">{editError}</span>}
            <div className="edit-actions">
              <button className="save-btn" onClick={handleEditSave}>Save</button>
              <button className="cancel-btn" onClick={handleEditCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <span className="todo-text">{todo.text}</span>
        )}
      </div>

      {!isEditing && (
        <div className="item-actions">
          <button
            className="icon-btn edit-icon-btn"
            onClick={() => { setEditText(todo.text); setIsEditing(true) }}
            aria-label="Edit task"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9.5 1.5L12.5 4.5L5 12H2V9L9.5 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className="icon-btn delete-icon-btn"
            onClick={() => onDelete(todo.id)}
            aria-label="Delete task"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 3.5H12M5.5 3.5V2H8.5V3.5M5 6V11M9 6V11M3.5 3.5L4 12H10L10.5 3.5H3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

export default ToDoItem
