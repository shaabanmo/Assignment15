import api from "./axios"

export interface RegData {
  name: string
  username: string
  email: string
  dateOfBirth: string
  gender: string
  password: string
  rePassword: string
}
export interface ResponseAuth {
  success: boolean
  message: string
  data?: Data
  error?:string
  
}

export interface Data {
  token: string
  tokenType: string
  expiresIn: string
  user: User
}

export interface User {
  _id: string
  name: string
  username: string
  email: string
  photo: string
  cover: string
}



export interface LoginData {
  email: string
  password: string
}


export async function signup(Redata:RegData){
    const { data } = await api.post<ResponseAuth>("/users/signup",Redata);
    return data;
}

export async function login(LoginData:LoginData){

    const {data}=await api.post<ResponseAuth>("/users/signin",LoginData)

    return data
}