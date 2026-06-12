import ToDoItem from './ToDoItem'

function ToDoList({ todos, onDelete, onToggle, onEdit }) {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">◎</span>
        <p>No tasks yet. Start adding some!</p>
      </div>
    )
  }

  const active = todos.filter(t => !t.completed)
  const done = todos.filter(t => t.completed)

  return (
    <div className="todo-list">
      {active.length > 0 && (
        <div className="list-section">
          <span className="list-label">Active — {active.length}</span>
          {active.map(todo => (
            <ToDoItem
              key={todo.id}
              todo={todo}
              onDelete={onDelete}
              onToggle={onToggle}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}

      {done.length > 0 && (
        <div className="list-section">
          <span className="list-label">Completed — {done.length}</span>
          {done.map(todo => (
            <ToDoItem
              key={todo.id}
              todo={todo}
              onDelete={onDelete}
              onToggle={onToggle}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ToDoList
