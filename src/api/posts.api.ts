import api from "./axios";

export interface AuthAllPosts {
  success: boolean
  message: string
  data: Data
  meta: Meta
}

export interface Data {
  posts: Post[]
}

export interface Post {
  _id: string
  body?: string
  image?: string
  privacy: string
  user: User
  sharedPost?: SharedPost
  likes: string[]
  createdAt: string
  commentsCount: number
  topComment?: TopComment2
  sharesCount: number
  likesCount: number
  isShare: boolean
  id: string
  bookmarked: boolean
}

export interface User {
  _id: string
  name: string
  username: string
  photo: string
}

export interface SharedPost {
  _id: string
  body?: string
  image: string
  privacy: string
  user: User2
  sharedPost: any
  likes: string[]
  createdAt: string
  commentsCount: number
  topComment: TopComment
  sharesCount: number
  likesCount: number
  isShare: boolean
  id: string
}

export interface User2 {
  _id: string
  name: string
  username: string
  photo: string
}

export interface TopComment {
  _id: string
  content: string
  commentCreator: CommentCreator
  post: string
  parentComment: any
  likes: any[]
  createdAt: string
}

export interface CommentCreator {
  _id: string
  name: string
  username: string
  photo: string
}

export interface TopComment2 {
  _id: string
  content: string
  commentCreator: CommentCreator2
  post: string
  parentComment: any
  likes: string[]
  createdAt: string
}

export interface CommentCreator2 {
  _id: string
  name: string
  username: string
  photo: string
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  currentPage: number
  numberOfPages: number
  limit: number
  nextPage: number
  total: number
}

 export async function getAllPosts(page:number,limit:number){
    const {data}= await api.get<AuthAllPosts>('/posts',{
        headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        },
        params:{
          limit,
          page,
        }
        
    })
    return data
}

export async function CraetePost(FormData:FormData){
   
  const {data}=await api.post('/posts',FormData,{

    headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        },
  })
  console.log(data,'response data')

  return data
}




export async function DeletePost(postId:string){
   
  const {data}=await api.delete(`/posts/${postId}`,{

    headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        },
  })
  console.log(data,'response delete data')

  return data
}

export async function UpdatePost(postId:string,formData:FormData){
   
  const {data}=await api.put(`/posts/${postId}`,formData,{

    headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        },
  })
  console.log(data,'response update data')

  return data
}

export interface SinglePostResponse {
  success: boolean
  message: string
  data: Data
}

export interface Data {
  post: Post
}

export interface Post {
  _id: string
  bodys: string
  images: string
  privacy: string
  user: User
  sharedPosts: any
  likes: string[]
  createdAt: string
  commentsCount: number
  topComments: any
  sharesCount: number
  likesCount: number
  isShare: boolean
  id: string
  bookmarked: boolean
}

export interface User {
  _id: string
  name: string
  username: string
  photo: string
}


export async function getSinglePost(postId:string){
   
  const {data}=await api.get<SinglePostResponse>(`/posts/${postId}`,{

    headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        },
  })
  console.log(data,'response delete data')

  return data
}