import React from 'react'
import MainRouters from './pages'
import NetworkStatus from './components/network-status/NetworkStatus'

const App = () => {
  
  return (
    <div>
      <NetworkStatus/>
      <MainRouters/>
    </div>
  )
}

export default App