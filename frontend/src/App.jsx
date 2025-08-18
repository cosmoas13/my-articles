import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')
  const [greeting, setGreeting] = useState('')
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.body.className = theme
  }, [theme])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      setGreeting(`Halo, ${name}!`)
    }
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className={`app-container ${theme}`}>
      <header>
        <h1>Aplikasi React Sederhana</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? '🌙 Mode Gelap' : '☀️ Mode Terang'}
        </button>
      </header>
      
      <main>
        <div className="card">
          <h2>Counter Sederhana</h2>
          <p>Nilai saat ini: {count}</p>
          <div className="button-group">
            <button onClick={() => setCount(count - 1)}>Kurang</button>
            <button onClick={() => setCount(count + 1)}>Tambah</button>
            <button onClick={() => setCount(0)}>Reset</button>
          </div>
        </div>

        <div className="card form-card">
          <h2>Form Sederhana</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nama:</label>
              <input 
                type="text" 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Masukkan nama Anda"
              />
            </div>
            <button type="submit">Kirim</button>
          </form>
          {greeting && <p className="greeting">{greeting}</p>}
        </div>
      </main>
      
      <footer>
        <p>Dibuat dengan React dan Vite</p>
      </footer>
    </div>
  )
}

export default App
