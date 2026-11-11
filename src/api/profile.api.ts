import api from "./axios";

export interface ProfileResponse {
  success: boolean
  message: string
  data: Data
}

export interface Data {
  user: User
}

export interface User {
  _id: string
  name: string
  username: string
  email: string
  dateOfBirth: string
  gender: string
  photo: string
  cover: string
  bookmarks: any[]
  followers: string[]
  following: any[]
  createdAt: string
  followersCount: number
  followingCount: number
  bookmarksCount: number
  id: string
}


export async function getProfile() {
    const {data} = await api.get<ProfileResponse>(`/users/profile-data`,{
    headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        },
        
  })
  console.log(data);
  
  return data
}

