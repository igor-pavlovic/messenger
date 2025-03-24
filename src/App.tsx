import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { Messenger } from '@/views'
import '@/App.css';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Messenger />
    </Provider>
  )
}

export default App
