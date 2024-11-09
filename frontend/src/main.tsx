import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


/**
 * Props 
 * conditional rendering
 * Hooks
 *  usestate ,
 *  useeffect -> when screen render
 *  useMeme -> caching 
 * react route dom
 * 
 * Redux : 
 *    global state : 
 *      store -> States -> Actions -> Reducers
 *    
 * Actions -> triggr reducer
 * reducer makes changes in store
 * useSelector getting the value of state
 * 
 */
