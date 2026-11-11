import { getSinglePost } from '@/api/posts.api'
import PostCard from '@/feature/posts/components/PostCard'
import PostCardSkeleton from '@/feature/posts/components/PostCardSkeleton'
import { useQuery } from '@tanstack/react-query'

import { useParams } from 'react-router-dom'
import { Comments } from '../components/Comments'
import AddComment from '../components/AddComment'

export default function CommentsPage() {

    const {id:postId} =useParams()

   const {isLoading,data:singlePost} =useQuery({
        queryKey:['post',postId],
        queryFn:()=>getSinglePost(postId)

    })
    
    if(isLoading){
        return(<PostCardSkeleton></PostCardSkeleton>)
    }
  return <>
  {singlePost && <PostCard post={singlePost.data.post}/>}
  <Comments postId={postId}></Comments>
  <AddComment postId={postId}/>
  </>
}
