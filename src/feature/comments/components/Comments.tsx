// Comments.tsx
import { deleteComment, getComments } from "@/api/comments.api"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"

import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { CommentsSkeleton } from "./CommentsSkeleton"

import { jwtDecode } from "jwt-decode"

export function Comments({ postId }: { postId: string }) {
    const queryClient = useQueryClient()

    // Read the token inside the component so it isn't stale after login/logout
    const token = localStorage.getItem("token")
    const userLoggedIn = token ? jwtDecode<{ user: string }>(token).user : null

    const { data, isLoading } = useInfiniteQuery({
        queryKey: ["comments", postId],
        queryFn: ({ pageParam }) => getComments(postId, pageParam, 10),
        initialPageParam: 1,
        getNextPageParam: (lastResponse) => {
            const { numberOfPages, nextPage, currentPage } = lastResponse.meta.pagination

            if (currentPage >= numberOfPages) {
                return undefined
            }
            return nextPage
        },
    })

    // `variables` holds the commentId currently being deleted
    const { mutate: removeComment, variables: deletingId, isPending } = useMutation({
        mutationFn: (commentId: string) => deleteComment(postId, commentId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", postId] })
        },
        onError: (err) => {
            console.log(err.message)
        },
    })

    if (isLoading) {
        return <CommentsSkeleton />
    }

    return (
        <section className="space-y-6 container">
            {/* ---------- Title ---------- */}
            <div className="space-y-4">
                <h3 className="text-base font-semibold">Comments</h3>
                <Separator />
            </div>

            {/* ---------- Comments list ---------- */}
            {data?.pages
                .flatMap((res) => res.data.comments)
                .map(
                    ({
                        content,
                        _id: commentId,   
                        image,
                        likes,
                        createdAt,
                        repliesCount,
                        commentCreator: { name: nameOfcomCre, photo, _id: creatorId },
                    }) => {
                        const isDeletingThis = isPending && deletingId === commentId

                        return (
                            <div key={commentId} className="flex gap-3">
                                <Avatar className="size-9">
                                    <AvatarImage src={photo} alt={nameOfcomCre} />
                                    <AvatarFallback>{nameOfcomCre.slice(0, 2)}</AvatarFallback>
                                </Avatar>

                                <div className="flex-1 space-y-1">
                                    {/* Header: name + time, and the options menu */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-sm font-medium">{nameOfcomCre}</span>
                                            <span className="text-xs text-muted-foreground">{createdAt}</span>
                                        </div>

                                        {creatorId === userLoggedIn && (
                                            <DropdownMenu>
                                                {/* Base UI version of shadcn: use render={<Button ... />} instead of asChild */}
                                                <DropdownMenuTrigger
                                                    render={<Button variant="ghost" size="icon" className="size-7" />}
                                                >
                                                    <span className="sr-only">Comment options</span>
                                                    ⋯
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>Edit</DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        variant="destructive"
                                                        disabled={isDeletingThis}
                                                        onClick={() => {
                                                            console.log("deleting:", commentId)
                                                            removeComment(commentId)
                                                        }}
                                                    >
                                                        {isDeletingThis ? "Deleting..." : "Delete"}
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        )}
                                    </div>

                                    {/* Comment text */}
                                    {content && <p className="text-sm leading-relaxed">{content}</p>}
                                    {image && <img className="h-50" src={image} alt="" />}

                                    {/* Actions */}
                                    <div className="flex items-center gap-1 pt-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 px-2 text-muted-foreground"
                                        >
                                            {`Likes ${likes.length}`}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-7 px-2 text-muted-foreground"
                                        >
                                            {`Reply ${repliesCount}`}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                )}
        </section>
    )
}