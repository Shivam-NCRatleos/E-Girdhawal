import React from 'react'
import Navbar from './components/Navbar'     // Adjust path if needed
import Footer from './components/Footer'     // Adjust path if needed

const App = ({ children }) => {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: 'calc(100vh - 120px)' }}>
        {children}
      </div>
      <Footer />
    </>
  )
}

export default App;