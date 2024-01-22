
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FiSend } from 'react-icons/fi';
import { ChangeEvent, FormEvent, useState } from 'react';
import { IProps } from '@/types/globalTypes';
import { useGetCommentQuery, usePostCommentMutation } from '@/redux/features/products/productApi';



export default function ProductReview({id}:IProps) {
  const {data} = useGetCommentQuery(id,{refetchOnMountOrArgChange:true, pollingInterval:30000})
  const [inputValue,setInputValue]=useState('');
  const [postComment,{isLoading,isError,isSuccess}]=usePostCommentMutation()
  console.log(isLoading,isError,isSuccess);
  const handleChange=(event:ChangeEvent<HTMLTextAreaElement>)=>{
    setInputValue(event.target.value)
  }
  const handleSubmit=(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    
    const option={
      id:id,
      data:{
        comment:inputValue
      }
    }
    postComment(option)
    setInputValue('');
  }

  return (
    <div className="max-w-7xl mx-auto mt-5">
      <div className="flex gap-5 items-center">
        <form className="flex gap-5 items-center" onSubmit={handleSubmit}>
        <Textarea
          className="min-h-[30px]"
          onChange={handleChange}
          value={inputValue}
        />
        <Button
          type="submit"
          className="rounded-full h-10 w-10 p-2 text-[25px]"
        >
          <FiSend />
        </Button>
      </form>
      </div>
      <div className="mt-10">
        {data?.comments?.map((comment:string, index:number) => (
          <div key={index} className="flex gap-3 items-center mb-5">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>{comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
