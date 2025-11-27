import React, { useEffect, useRef, useState } from 'react'
import { assets, blogCategories } from '../../assets/assets'
import Quill from 'quill';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import { parse } from 'marked';
import { useNavigate } from "react-router-dom";

const AddBlog = () => {

  const { axios } = useAppContext()
  const navigate = useNavigate()

  const [isAdding, setIsAdding] = useState(false)
  const [loading, setLoading] = useState(false)

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const [image, setImage] = useState(null)
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [category, setCategory] = useState('Startup')
  const [isPublished, setIsPublished] = useState(false)

  const generateContent = async () => {
    if (!title.trim()) return toast.error('Please enter a title')
    try {
      setLoading(true)
      const { data } = await axios.post('/api/blog/generate', { prompt: title })
      if (data.success) {
        quillRef.current.root.innerHTML = parse(data.content)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!quillRef.current.root.innerHTML.trim()) {
      return toast.error("Please add blog content")
    }
    if (!image) {
      return toast.error("Please upload a thumbnail")
    }

    try {
      setIsAdding(true)

      const formData = new FormData()
      formData.append("title", title)
      formData.append("subTitle", subTitle)
      formData.append("description", quillRef.current.root.innerHTML)
      formData.append("category", category)
      formData.append("isPublished", isPublished)
      formData.append("image", image)

      const { data } = await axios.post("/api/blog/add", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      })

      if (data.success) {
        toast.success(data.message)

        setImage(null)
        setTitle("")
        setSubTitle("")
        quillRef.current.root.innerHTML = ""
        setCategory("Startup")
        setIsPublished(false)

        navigate("/admin/dashboard")
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message)
    } finally {
      setIsAdding(false)
    }
  }

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: 'snow' })
    }
  }, [])

  return (
    <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
      <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>

        <p>Upload thumbnail</p>
        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt=""
            className='mt-2 h-16 rounded cursor-pointer'
          />
          <input type="file" id="image" hidden required accept="image/*"
            onChange={(e) => setImage(e.target.files[0])} />
        </label>

        <p className='mt-4'>Blog title</p>
        <input type="text" placeholder='Type here' required
          className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
          value={title} onChange={(e) => setTitle(e.target.value)}
        />

        <p className='mt-4'>Sub title</p>
        <input type="text" placeholder='Type here' required
          className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded'
          value={subTitle} onChange={(e) => setSubTitle(e.target.value)}
        />

        <p className='mt-4'>Blog Description</p>
        <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
          <div ref={editorRef}></div>

          {loading && (
            <div className='absolute inset-0 flex items-center justify-center bg-black/10'>
              <div className='w-8 h-8 rounded-full border-2 border-t-white animate-spin'></div>
            </div>
          )}

          <button type="button" disabled={loading}
            onClick={generateContent}
            className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded cursor-pointer hover:underline'>
            Generate with AI
          </button>
        </div>

        <p className='mt-4'>Blog category</p>
        <select name="category"
          className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'
          value={category} onChange={(e) => setCategory(e.target.value)}
        >
          {blogCategories.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>

        <div className='flex gap-2 mt-4'>
          <p>Publish Now</p>
          <input type="checkbox"
            className='scale-125 cursor-pointer'
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
        </div>

        <button type="submit" disabled={isAdding}
          className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer text-sm'>
          {isAdding ? "Adding..." : "Add Blog"}
        </button>

      </div>
    </form>
  )
}

export default AddBlog
