
import PostCard from "../components/PostCard"
import { getAllPosts } from "@/api/posts.api"
import { useInfiniteQuery } from "@tanstack/react-query"


import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import PostCardSkeleton from "../components/PostCardSkeleton";
import AddPost from "../components/AddPost";

export default function PostPage() {
  // const { token} =useContext(AuthContext)
  const {hasNextPage,isFetching,fetchNextPage,data,isLoading} = useInfiniteQuery(
    {
      queryKey:['AllPosts'],
      queryFn:({pageParam})=> getAllPosts(pageParam,10),
      initialPageParam:1,
      getNextPageParam:(lastResponse)=>{
        const {numberOfPages,nextPage,currentPage}=lastResponse.meta.pagination

        if(currentPage>=numberOfPages){
          return undefined

        }
        return nextPage
      },
      refetchOnWindowFocus:false,
      refetchOnMount:false,
    }

   
  )
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(()=>{

    if(inView&&hasNextPage)
    {
      fetchNextPage()
    }
  },[inView])

  if(isLoading){
    <PostCardSkeleton />
  }

  return <>
  <div>
    <AddPost/>
    {data?.pages.flatMap((res)=> res.data.posts).map((post)=> <PostCard key={post._id} post={post}></PostCard>)}
    <div ref={ref}>
    {isFetching && <PostCardSkeleton />}
    </div>
  </div>
  </>
    
  
}
