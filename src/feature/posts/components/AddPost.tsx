import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImagePlus, Send } from "lucide-react";
import { useRef, useState } from "react";
import { CraetePost } from "@/api/posts.api";

import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";





export default function AddPost() {
  const [imgPrev, setImgPrev] = useState<null | string>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  

  function handleInputPost() {
    inputRef.current?.click();
  }

  function handleAddPost() {
    const isBodyExist = bodyRef.current?.value;
    const isImageExist = inputRef.current?.files?.[0];
    const formData = new FormData();

    if (isBodyExist) {
      formData.append("body", isBodyExist);
    }
    if (isImageExist) {
      formData.append("image", isImageExist);
    }
    if (!isBodyExist && !isImageExist) {
      return 
    }
    return CraetePost(formData);
  }
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: handleAddPost,
    onSuccess: () => {
    //   Swal.fire({
    //     title: "Good job!",
    //     text: "You clicked the button!",
    //     icon: "success",
    //   });
    console.log('success');
    queryClient.invalidateQueries({queryKey:['AllPosts']})
    
    },
    onError:(err)=>{
        console.log(err.message);
        

    },
    
      
   
  });

  return (
    <Card className="container mt-10">
      <CardHeader>
        <CardTitle>Create post</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label htmlFor="post-body">What's on your mind?</Label>
          <Textarea
            ref={bodyRef}
            id="post-body"
            placeholder="Write something..."
            className="min-h-28 resize-none"
          />

          <Input
            className="hidden"
            ref={inputRef}
            id="post-image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              const reder = new FileReader();
              const isFileExist = e.target.files?.[0];
              if (isFileExist) {
                reder.readAsDataURL(e.target.files[0]);
                reder.onload = function () {
                  setImgPrev(reder.result);
                };
              }
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="post-image" className="flex items-center gap-2">
            {imgPrev && <img src={imgPrev} alt="" />}
            <ImagePlus className="size-4" />
            <button onClick={handleInputPost}>add image</button>
          </Label>
        </div>
      </CardContent>

      <CardFooter className="justify-end">
        <Button
          onClick={() => {
            mutate();
          }}
        >
          <Send className="size-4" />
          Post
        </Button>
      </CardFooter>
    </Card>
  );
}
