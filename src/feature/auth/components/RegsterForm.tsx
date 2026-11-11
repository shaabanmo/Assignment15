import React, { useState } from 'react'
import {
  Field,
  
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"


import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


import { Controller, useForm } from "react-hook-form"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { signup } from '@/api/auth.api'


import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { differenceInYears } from 'date-fns'
import { LoaderCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const redisterSchema = z.object(
  {
    name: z.string().min(3, "min number of character is 3").max(10, "max number of character is 10"),
    username: z.string().min(3, "min number of character is 3").max(20, "max number of character is 20"),
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invaild Email"),
    dateOfBirth: z.string().refine((value) => new Date(value) <= new Date(), "invaild Date").refine((value) => differenceInYears(new Date(), new Date(value)) >= 18, "Must be Older than 16 years"),
    gender: z.enum(['male', 'female']),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Invaild Password"),
    rePassword: z.string().min(3, "min"),
  }
).refine((FormValues) => FormValues.rePassword === FormValues.password, {
  path: ["rePassword"],
  message: "Must match with Password",
})


export default function RegsterForm() {
  type RegisterFormType = z.infer<typeof redisterSchema>
  const [open, setOpen] = React.useState(false)
  const [ msg , setMsg ] = useState <string | null>(null)
  const [loading ,setLoading]=useState<boolean>(false)
 const navigate = useNavigate()
  const { handleSubmit, register, formState: { errors }, control } = useForm<RegisterFormType>(
    {
      defaultValues: {
        gender:'male',
        dateOfBirth: ''
      },
      resolver: zodResolver(redisterSchema),

    }
  )


  function handleRegister(values: RegisterFormType) {
    console.log(values)
    setLoading(true)
    signup(values)
    .then((data)=> {
      setMsg(data.message)
      setTimeout(()=>navigate('/'),3000)
    })
    .catch((err)=>setMsg(err.reponse.data.message))
    .finally(()=> setLoading(false));
  }









  return <>
    <div className="container">
      <form onSubmit={handleSubmit(handleRegister)}>



        <FieldSet className="w-full max-w-xs ">
          <FieldGroup>


            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="Max Leiter"
                {...register('name')} />
              {
                errors.name && (<p> {errors.name.message} </p>)
              }
            </Field>




            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input
                id="username"
                type="text"
                placeholder="Max Leiter"
                {...register('username')} />
              {errors.username && (<p> {errors.username.message} </p>)}
            </Field>






            <Field>
              <FieldLabel htmlFor="Email">Email</FieldLabel>
              <Input
                id="Email"
                type="Email"
                placeholder="Max Leiter"
                {...register('email')} />
              {errors.email && (<p> {errors.email.message} </p>)}
            </Field>


            <Field className="mx-auto w-44">
              <FieldLabel htmlFor="date">Date of birth</FieldLabel>

              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => {
                  const selected = field.value ? new Date(field.value) : undefined
                  return (
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger
                        render={
                          <Button variant="outline" id="date" type="button" className="justify-start font-normal">
                            {selected ? selected.toLocaleDateString() : "Select date"}
                          </Button>
                        }
                      />
                      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selected}
                          defaultMonth={selected}
                          captionLayout="dropdown"
                          startMonth={new Date(1920, 0)}
                          endMonth={new Date()}
                          disabled={{ after: new Date() }}
                          onSelect={(d) => {
                            field.onChange(d ? d.toISOString() : '')
                            setOpen(false)
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  )
                }}
              />

              {errors.dateOfBirth && <p>{errors.dateOfBirth.message}</p>}
            </Field>





            <Controller
              name='gender'
              control={control}
              render={({ field }) =>
                <RadioGroup onValueChange={field.onChange} value={field.value} className="w-fit">
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="male" id="r1" />
                    <Label htmlFor="r1">Male</Label>
                  </div>
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="female" id="r2" />
                    <Label htmlFor="r2">Female</Label>
                  </div>
                </RadioGroup>
              } />


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



            <Field>
              <FieldLabel htmlFor="rePassword">Repassword</FieldLabel>
              <Input
                id="rePassword"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                {...register('rePassword')} />
              {errors.rePassword && (<p> {errors.rePassword.message} </p>)}
            </Field>




          </FieldGroup>
          <Button type='submit'>{ loading ? <LoaderCircle className='animate-spin' /> : 'submit' } </Button>
          {
            msg &&  <p> { msg}</p>
          }
        </FieldSet>
      </form>
    </div>
  </>
}
