import Chat from './chat'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Chat />} />
    </Routes>
  )
}
export default App
