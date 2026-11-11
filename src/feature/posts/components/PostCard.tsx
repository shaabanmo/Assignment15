import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical, Forward, Heart, MessageCircle} from "lucide-react";
import { DeletePost, type Post } from "@/api/posts.api";
import { jwtDecode } from "jwt-decode";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdatePosts } from "./UpdatePosts";
import { useState } from "react";
import { Link } from "react-router-dom";




const token = localStorage.getItem("token")
   const userLoggedIn = token ? jwtDecode<{ user: string }>(token).user : null

export default function PostCard({post}:{post:Post}) {
    
    const {user:{name,photo,username,_id:craeteId},id:postId,commentsCount,likesCount,body,image:postImage,createdAt,sharesCount} = post
    function handleDelete(){
        return DeletePost(postId)
    }
    const queryClinte = useQueryClient()
    const {mutate:matateDelete} =useMutation({
        mutationFn:handleDelete,
        onSuccess:()=>{
            console.log('success');
            queryClinte.invalidateQueries({queryKey:['AllPosts']})
        },
        onError:(err)=>{
            console.log(err.message);
            
        }


    })

    const [isOpen,setIsOpen]=useState(false)
    
    return <>
        <Card className="container mt-10">
            <CardHeader>
                <div className="flex gap-3 justify-between">
                    <div className=" flex gap-4">
                    <Avatar>
                        <AvatarImage src={photo}
                        alt={name}/>
                        <AvatarFallback>{name.slice(0,2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <span className="block">
                            {name}
                        </span>
                        <span className="block">
                            {username}
                        </span>
                        <span>{createdAt}</span>

                    </div>
                    </div>
                    <div>
                        {
                        craeteId===userLoggedIn && <DropdownMenu>
                            <DropdownMenuTrigger render={<Button variant="outline" />}>
                                <EllipsisVertical />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>setting</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={()=>{matateDelete()}}>Delete</DropdownMenuItem>
                                    <DropdownMenuItem onClick={()=>setIsOpen(true)}>Update</DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />

                            </DropdownMenuContent>
                        </DropdownMenu>
                        }
                        
                    </div>
                </div>
            </CardHeader>


            <CardContent>
                <p>{body }</p>
                {postImage && <img className="w-full h-75 object-contain" src={postImage} alt="" />}
                
            </CardContent>


            <CardFooter className="justify-between">
                <div  className="flex gap-2 align-middle">
                    <Heart />
                    <p className="pt-1">{likesCount}</p>
                </div>
                <div className="flex gap-2 align-middle">
                    <Link to={`/comments/${postId}`}>
                    <MessageCircle />
                    <p className="pt-1">{commentsCount}</p>
                    </Link>
                </div>
                <div className="flex gap-2 align-middle">
                    <Forward />
                    <p className="pt-1">{sharesCount}</p>
                </div>
            </CardFooter>
        </Card>
        {craeteId===userLoggedIn && <UpdatePosts post={post} isOpen={isOpen} setIsOpen={setIsOpen} />}


    </>
}
