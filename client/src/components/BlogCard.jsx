import React from 'react'
import parse from "html-react-parser";
import { useNavigate } from 'react-router-dom';

const BlogCard = ({blog}) => {
  const navigate =  useNavigate()
 const {title,description, category,image,_id}=blog;
  return ( 
    <div onClick={()=> navigate(`/blog/${_id}`)} className='w-full rounded-lg overflow shadow hover:scale-102 hover:shadow-primary/25 duration-300 cursor-pointer'>
       <img src={image} alt="" className='aspect-video' />
       <span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary/20 rounded-full text-primary text-xs'>{category}</span>
     <div className='p-5'>
        <h5 className='mb-2 front-medium text-gray-900'>{title}</h5>
        <div className='mb-3 text-xs text-gray-600'>{parse(description.slice(0, 80))}</div>

     </div>
    </div>
  )
}

export default BlogCard
