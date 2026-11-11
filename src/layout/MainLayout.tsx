
import { Link, Outlet } from 'react-router-dom'

export default function MainLayout() {
    const isLoading=localStorage.getItem('token')
  return <>
  <nav className='bg-slate-900 text-white'>
    <ul>
        {isLoading ?<>
            <li><Link to={'/login'}>Login</Link></li>
            <li><Link to={'/register'}>register</Link></li>
        </>:<>
        <li><Link to={'/profile'}>profile</Link></li>
        <li><Link to={'/posts'}>posts</Link></li>
        </>}
    </ul>
  </nav>
  <Outlet/>
  
  </>
}

