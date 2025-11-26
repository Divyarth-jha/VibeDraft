import React from 'react'
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const BlogTableItem = ({ blog, fetchBlogs, index }) => {

  const { title, createdAt } = blog;
  const blog_data = new Date(createdAt)
  const { axios } = useAppContext();

  const deleteBlog = async () => {
    const confirm = window.confirm("Are you sure you want to delete this blog?");
    if (!confirm) return;

    try {
      const { data } = await axios.post('/api/blog/delete', { id: blog._id });
      if (data.success) {
        toast.success("Blog deleted successfully");
        fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error deleting blog");
    }
  };

  const togglePublish = async () => {
    try {
      const { data } = await axios.post('/api/blog/toggle-publish', { id: blog._id });
      if (data.success) {
        toast.success("Blog publish status toggled");
        fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error toggling publish status");
    }
  };

  return (
    <tr className='border-y border-gray-300'>
      <th className='px-2 py-4'>{index + 1}</th>
      <td className='px-2 py-4'>{title}</td>
      <td className='px-2 py-4 max-sm:hidden'>{blog_data.toDateString()}</td>
      <td className='px-2 py-4 max-sm:hidden'>
        <p className={blog.isPublished ? "text-green-600" : "text-orange-700"}>
          {blog.isPublished ? 'Published' : 'Unpublished'}
        </p>
      </td>
      <td className='px-2 py-4 flex text-xs gap-3'>
        <button onClick={togglePublish} className='border px-2 py-0.5 mt-1 rounded cursor-pointer'>
          {blog.isPublished ? 'Unpublish' : 'Publish'}
        </button>
        <img
          src={assets.cross_icon}
          className="w-8 hover:scale-110 transition-all cursor-pointer"
          onClick={deleteBlog}
        />
      </td>
    </tr>
  );
};

export default BlogTableItem;






//its working  fine for admin blog list page
// import React from 'react'
// import { assets } from '../../assets/assets';
// import { useAppContext } from '../../context/AppContext';
// import toast from 'react-hot-toast';

// const BlogTableItem = ({ blog, fetchBlogs, index }) => {

//   const { title, createdAt } = blog;
//   const blog_data = new Date(createdAt)
//   const { axios } = useAppContext();

//   const deleteBlog = async () => {
//     const confirm = window.confirm("Are you sure you want to delete this blog?");
//     if (!confirm) return;

//     try {
//       const { data } = await axios.post('/api/blog/delete', { id: blog._id });
//       if (data.success) {
//         toast.success("Blog deleted successfully");
//         fetchBlogs();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error deleting blog");
//     }
//   };

//   const togglePublish = async () => {
//     try {
//       const { data } = await axios.post('/api/blog/toggle-publish', { id: blog._id });
//       if (data.success) {
//         toast.success("Blog publish status toggled");
//         fetchBlogs();
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error toggling publish status");
//     }
//   };

//   return (
//     <tr className='border-y border-gray-300'>
//       <th className='px-2 py-4'>{index + 1}</th>
//       <td className='px-2 py-4'>{title}</td>
//       <td className='px-2 py-4 max-sm:hidden'>{blog_data.toDateString()}</td>
//       <td className='px-2 py-4 max-sm:hidden'>
//         <p className={blog.isPublished ? "text-green-600" : "text-orange-700"}>
//           {blog.isPublished ? 'Published' : 'Unpublished'}
//         </p>
//       </td>
//       <td className='px-2 py-4 flex text-xs gap-3'>
//         <button onClick={togglePublish} className='border px-2 py-0.5 mt-1 rounded cursor-pointer'>
//           {blog.isPublished ? 'Unpublish' : 'Publish'}
//         </button>
//         <img
//           src={assets.cross_icon}
//           className="w-8 hover:scale-110 transition-all cursor-pointer"
//           onClick={deleteBlog}
//         />
//       </td>
//     </tr>
//   );
// };

// export default BlogTableItem;
