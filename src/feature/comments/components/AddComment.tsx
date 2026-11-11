import { createComments } from "@/api/comments.api"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ImagePlus, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { getProfile } from "@/api/profile.api"


// inside the component

export default function AddComment({ postId }: { postId: string }) {
    const [imgPrev, setImgPrev] = useState<string | null>(null)
    const commentImageRef = useRef<HTMLInputElement>(null)
    const commentBodyRef = useRef<HTMLTextAreaElement>(null)
    const queryClient = useQueryClient()
    
    // Clear the form (used after success and on Cancel)
    function resetForm() {
        if (commentBodyRef.current) commentBodyRef.current.value = ""
        if (commentImageRef.current) commentImageRef.current.value = ""
        setImgPrev(null)
    }
   const { data: me } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile, // no postId needed now
    staleTime: Infinity,
})
    
    const { mutate, data, isPending } = useMutation({
        // The FormData is built in handleSubmit and passed to mutate()
        mutationFn: (formData: FormData) => createComments(postId, formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", postId] })
            resetForm()
        },
        onError: (err) => {
            console.log(err.message)
        },
    })

    function handleSubmit() {
        const body = commentBodyRef.current?.value.trim()
        const image = commentImageRef.current?.files?.[0]

        // Nothing to send: stop here (don't call the API)
        if (!body && !image) return

        const formData = new FormData()
        // NOTE: check your API docs for the exact field name ("content" or "body")
        if (body) formData.append("content", body)
        if (image) formData.append("image", image)

        mutate(formData)
    }
    

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        // Picker cancelled: clear the preview
        setImgPrev(file ? URL.createObjectURL(file) : null)
    }

    function removeImage() {
        if (commentImageRef.current) commentImageRef.current.value = ""
        setImgPrev(null)
    }

    // Free the blob URL when the preview changes or the component unmounts
    useEffect(() => {
        return () => {
            if (imgPrev) URL.revokeObjectURL(imgPrev)
        }
    }, [imgPrev])

    return (
        <section className="container">
            <div className="flex gap-3">
                <Avatar className="size-9">
                    <AvatarImage src={me?.data.user.photo} alt="You" />
                    <AvatarFallback>{me?.data.user.name.slice(0,2)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                    <div className="flex gap-3">
                        <Textarea
                            ref={commentBodyRef}
                            placeholder="Write a comment..."
                            className="min-h-15 resize-none"
                        />

                        {/* Hidden file input, opened by the button below */}
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={commentImageRef}
                            onChange={handleImageChange}
                        />

                        <div className="flex flex-col gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => commentImageRef.current?.click()}
                            >
                                <ImagePlus className="size-4" />
                                Add image
                            </Button>
                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    size="sm"
                                    disabled={isPending}
                                    onClick={handleSubmit}
                                >
                                    {isPending ? "Sending..." : "Comment"}
                                </Button>
                                <Button
                                    type="button"
                                    variant="secondary"
                                    size="sm"
                                    disabled={isPending}
                                    onClick={resetForm}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Image preview with a remove button */}
                    {imgPrev && (
                        <div className="relative w-fit">
                            <img src={imgPrev} alt="Preview" className="max-h-40 rounded-md" />
                            <Button
                                type="button"
                                variant="secondary"
                                size="icon"
                                className="absolute right-1 top-1 size-6"
                                onClick={removeImage}
                            >
                                <X className="size-3" />
                                <span className="sr-only">Remove image</span>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}