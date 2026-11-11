import {createBrowserRouter}from 'react-router-dom'
import Loginpage from './feature/auth/pages/Loginpage'
import RegisterPage from './feature/auth/pages/RegisterPage'
import PostPage from './feature/posts/pages/PostPage'
import AuthGuard from './guard/AuthGuard'
import Guard from './guard/Guard'
import ProfilePage from './feature/profiles/pages/ProfilePage'
import MainLayout from './layout/MainLayout'
import CommentsPage from './feature/comments/pages/CommentsPage'



const routes = createBrowserRouter([

    {path:'/',element:<MainLayout/>,children:[
        {path:'/' ,element:<AuthGuard> <Loginpage/> </AuthGuard>},
        {path:'/login' ,element:<AuthGuard> <Loginpage/> </AuthGuard>},
        {path:'/register',element:<AuthGuard> <RegisterPage/></AuthGuard>},
        {path:'/posts',element:<Guard> <PostPage/></Guard>},
        {path:'/profile',element:<Guard><ProfilePage/></Guard>},
        {path:'/comments/:id',element:<Guard><CommentsPage/></Guard>}
    ]}

])

export default routes