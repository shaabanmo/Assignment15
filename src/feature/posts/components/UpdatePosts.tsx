import { UpdatePost, type Post } from "@/api/posts.api"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
interface updatePostProps {
    isOpen: boolean
    setIsOpen: (v: boolean) => void
    post: Post
}
export function UpdatePosts({ isOpen, setIsOpen, post }: updatePostProps) {
    const { body, image, id:postId } = post
    const [ imagePrv, setImagePrv ] = useState<string | undefined>(image)
    const bodyRef=useRef<HTMLTextAreaElement>(null)
    const imageRef =useRef<HTMLInputElement>(null)

    function handleUpdate(){

        const formData =new FormData()
        const isBodyExist=bodyRef.current?.value
        const isImageExist=imageRef?.current?.files?.[0]
        if(isBodyExist) {
            formData.append("body",isBodyExist)
        }
        if(isImageExist){
            formData.append("image",isImageExist)
        }
        
        
        return UpdatePost(postId,formData)
    }
    

    const queryClinte=useQueryClient()
    const {mutate,isPending} = useMutation({
        mutationFn:handleUpdate,
        onSuccess:()=>{
            console.log("success");
            queryClinte.invalidateQueries({queryKey:['AllPosts']})
            setIsOpen(false)
            
        },
        onError:(err)=>{
            console.log(err.message);
            
        }

    })


   useEffect(() => {
        if (!isOpen) setImagePrv(image)
    }, [isOpen, image])


    useEffect(() => {
        return () => {
            if (imagePrv?.startsWith("blob:")) URL.revokeObjectURL(imagePrv)
        }
    }, [imagePrv])


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <form>

                <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            {body && (
                                <>
                                    <Label htmlFor="name-1">Name</Label>
                                    <textarea ref={bodyRef} defaultValue={body} name="" id="body"></textarea>
                                </>

                            )
                            }
                        </Field>
                        <Field>
                            <input
                               

                                id="post-image"
                                ref={imageRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const reder = new FileReader();
                                    
                                    
                                        reder.readAsDataURL(e.target.files[0]);
                                        reder.onload = function () {
                                            setImagePrv(reder.result);
                                        };
                                    
                                }}
                            />
                            {
                                image && (
                                    <>
                                        <Label htmlFor="username-1">Username</Label>
                                        <img src={imagePrv} alt="" />
                                    </>
                                )
                            }
                        </Field>
                    </FieldGroup>
                    <DialogFooter>
                        <DialogClose render={<Button variant="outline">Cancel</Button>} />
                        <Button type="button" disabled={isPending} onClick={()=>mutate()}>
                        {isPending ? "Saving..." : "Save changes"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
