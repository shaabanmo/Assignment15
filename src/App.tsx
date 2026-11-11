
import {  RouterProvider } from 'react-router-dom'
import routes from './route'
import AuthContextProvider from './context/authContext/AuthContextProvider'
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
export default function App() {
  return <>

   <QueryClientProvider client={queryClient}>
  <AuthContextProvider>
  <RouterProvider router={routes}/>
  </AuthContextProvider>
   </QueryClientProvider>
  </>
}

