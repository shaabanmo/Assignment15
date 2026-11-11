import { useContext, useState } from 'react'
import {
  Field,
  
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"


import { Button } from "@/components/ui/button"

import {  useForm } from "react-hook-form"
import { login } from '@/api/auth.api'


import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoaderCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '@/context/authContext/Authcontext'

const loginSchema = z.object(
  {
    
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invaild Email"),
    
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Invaild Password"),
    
  }
)


export default function LoginForm() {
  type RegisterFormType = z.infer<typeof loginSchema>
  const [ msg , setMsg ] = useState <string | null>(null)
  const [loading ,setLoading]=useState<boolean>(false)
  const {setToken}=useContext(AuthContext)
  const navigate = useNavigate()
 const craeteAccNavigate= useNavigate()
  const { handleSubmit, register, formState: { errors } } = useForm<RegisterFormType>(
    {
      
      resolver: zodResolver(loginSchema),

    }
  )


  function handleLogin(values: RegisterFormType) {
    console.log(values)
    setLoading(true)
    login(values)
    .then((data)=> {
      setMsg(data.message)
      if(data.data?.token)
      {
        setToken(data.data?.token)
        localStorage.setItem('token',data.data?.token)
      }
      setTimeout(()=>navigate('/posts'),3000)
    })
    .catch((err)=>setMsg(err.reponse.data.message))
    .finally(()=> setLoading(false));
  }









  return <>
    <div className="container">
      <form onSubmit={handleSubmit(handleLogin)}>
        <FieldSet className="w-full max-w-xs ">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="Email">Email</FieldLabel>
              <Input
                id="Email"
                type="Email"
                placeholder="Max Leiter"
                {...register('email')} />
              {errors.email && (<p> {errors.email.message} </p>)}
            </Field>


            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                {...register('password')} />
              {errors.password && (<p> {errors.password.message}</p>)}
            </Field>





          </FieldGroup>
          <Button type='submit'>{ loading ? <LoaderCircle className='animate-spin' /> : 'login' } </Button>
          {
            msg &&  <p> { msg}</p>
          }


          <Button type='submit' onClick={()=> craeteAccNavigate('/register')}>
             Create New Account
          </Button>
        </FieldSet>

        
      </form>
    </div>
  </>
}
