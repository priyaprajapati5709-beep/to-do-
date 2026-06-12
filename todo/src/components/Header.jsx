function Header({ total, completed }) {
  return (
    <header className="header">
      <div className="header-title-row">
        <span className="header-icon">✦</span>
        <h1 className="header-title">My Tasks</h1>
      </div>
      {total > 0 && (
        <p className="header-subtitle">
          {completed} of {total} completed
        </p>
      )}
      {total === 0 && (
        <p className="header-subtitle">Add your first task below</p>
      )}
    </header>
  )
}

export default Header
