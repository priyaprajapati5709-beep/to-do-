import { useState } from 'react'
import Header from './components/Header'
import ToDoList from './components/ToDoList'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  const validate = (text) => {
    const trimmed = text.trim()
    if (!trimmed) return 'Task cannot be empty.'
    if (trimmed.length < 3) return 'Task must be at least 3 characters.'
    if (trimmed.length > 200) return 'Task cannot exceed 200 characters.'
    if (todos.some(t => t.text.toLowerCase() === trimmed.toLowerCase())) {
      return 'This task already exists.'
    }
    return null
  }

  const addTodo = () => {
    const err = validate(input)
    if (err) { setError(err); return }

    setTodos(prev => [
      ...prev,
      { id: crypto.randomUUID(), text: input.trim(), completed: false }
    ])
    setInput('')
    setError('')
  }

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
    )
  }

  const editTodo = (id, newText) => {
    const trimmed = newText.trim()
    if (!trimmed || trimmed.length < 3 || trimmed.length > 200) return false
    setTodos(prev =>
      prev.map(t => t.id === id ? { ...t, text: trimmed } : t)
    )
    return true
  }

  const completedCount = todos.filter(t => t.completed).length

  return (
    <div className="app">
      <Header total={todos.length} completed={completedCount} />

      <div className="input-section">
        <div className="input-row">
          <input
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError('') }}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="What needs to be done?"
            className={`task-input ${error ? 'is-error' : ''}`}
            maxLength={200}
          />
          <button onClick={addTodo} className="add-btn">Add</button>
        </div>
        <div className="input-footer">
          {error
            ? <p className="error-msg">{error}</p>
            : <span className="char-count">{input.length}/200</span>
          }
        </div>
      </div>

      <ToDoList
        todos={todos}
        onDelete={deleteTodo}
        onToggle={toggleTodo}
        onEdit={editTodo}
      />
    </div>
  )
}

export default App
