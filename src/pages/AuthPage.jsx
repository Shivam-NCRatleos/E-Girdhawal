import React, { useState, useContext } from 'react'
import { AuthContext } from '../main' // Import context from main.jsx
import { useNavigate } from 'react-router-dom'

const AuthPage = () => {
  const { login, signup } = useContext(AuthContext)
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'farmer'
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    try {
      if (isLogin) {
        await login(form.email, form.password, form.userType)
      } else {
        await signup(form.name, form.email, form.password, form.userType)
      }
      navigate('/') // Redirect on successful login/signup
    } catch (err) {
      setError(err?.response?.data?.message || 'Authentication failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96 space-y-6">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {!isLogin && (
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        )}
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">User Type</label>
          <select
            name="userType"
            value={form.userType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="farmer">Farmer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        <p className="text-sm text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            className="text-blue-600 ml-2"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </form>
    </div>
  )
}

export default AuthPage