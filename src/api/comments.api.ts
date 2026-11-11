import api from "./axios";



export interface CommentsResponse{
  success: boolean
  message: string
  data: Data
  meta: Meta
}

export interface Data {
  comments: Comment[]
}

export interface Comment {
  _id: string
  content: string
  image: string
  commentCreator: CommentCreator
  post: string
  parentComment: any
  likes: any[]
  createdAt: string
  repliesCount: number
}

export interface CommentCreator {
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
  limit: number
  total: number
  numberOfPages: number
  nextPage: number
}



export async function getComments(postId:string,page:number,limit:number)
{
    const {data} = await api.get<CommentsResponse>(`/posts/${postId}/comments`,{
    headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        },
        params:{
            page,limit
        }
  })
  console.log(data );
  
  return data
}




export interface craeteCommentResponse {
  success: boolean
  message: string
  data: Data
}

export interface Data {
  comment: Comment
}

export interface Comment {
  _id: string
  content: string
  image: string
  commentCreator: CommentCreator
  post: string
  parentComment: any
  likes: any[]
  createdAt: string
  likesCount: number
  isReply: boolean
  id: string
}

export interface CommentCreator {
  _id: string
  name: string
  username: string
  photo: string
  followersCount: number
  followingCount: number
  bookmarksCount: number
  id: string
}




export async function createComments(postId:string,formData:FormData)
{
    const {data} = await api.post<craeteCommentResponse>(`/posts/${postId}/comments`,formData,{
    headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        },
        
  })
  console.log(data , "mycomment");
  
  return data
}


export interface deleteResponse {
  success: boolean
  message: string
  data: Data
}

export interface Data {}

export async function deleteComment(postId:string,commentId:string) {
    const {data} = await api.delete<deleteResponse>(`posts/${postId}/comments/${commentId}`,{
    headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        },
        
  })
  console.log(data);
  
  return data
}