import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from "axios"
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const CreateBlog = () => {
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');

  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = async (e) => {
    try {
      const file = e.target.files[0]; 
      const formDataImage = new FormData();
      formDataImage.append('image', file);
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/upload`, formDataImage, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setImageUrl(response.data.imageUrl);
        setImagePreview(URL.createObjectURL(file)); 
        toast.success('Image uploaded successfully');
      } else {
        toast.error('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('An error occurred during the upload');
    }
  };


  const handleSubmit = async(e) => {
    e.preventDefault();
    const blogData = {
      title,
      shortDescription,
      description: description.replace(/<[^>]*>?/gm, ''),
      imageUrl,
      category,
      tags: tags.split(',').map((tag) => tag.trim()),
      isFeatured,
      isPublic,
      metaTitle,
      metaDescription,
      metaKeywords:  metaKeywords.split(',').map((keyword) => keyword.trim()),
    };
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/blogs/create`, blogData);
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Blog created successfully!',
          
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
      
    } catch (error) {
      console.log("Something went wrong", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image', 'video'],
      ['clean'],
      ['code-block'],
    ],
  };

  const formats = [
    'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike',
    'blockquote', 'list', 'bullet', 'link', 'image', 'video', 'code-block',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-purple-800 text-center">Create Blog Post</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="shortDescription">
              Short Description
            </label>
            <input
              type="text"
              id="shortDescription"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              required
            />
          </div>

          <div className=''>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="description">
              Description
            </label>
            <ReactQuill
              value={description}
              onChange={setDescription}
              modules={modules}
              formats={formats}
              className="border border-gray-300 rounded-md"
            />
          </div>

          <div className=''>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="imageUrl">
              Thumbnail
            </label>
            <input
              type="file"
              id="imageUrl"
              accept='image/*'
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              onChange={(e) => handleImageChange(e)}
              required
            />
            {imagePreview && (
              <img src={imagePreview} alt="Thumbnail" className="mt-2 rounded-md h-80" style={{ width: '100%'}} />
            )}

          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="category">
                Category
              </label>
              <input
                type="text"
                id="category"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="tags">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                id="tags"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="tag1, tag2, tag3"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="metaTitle">
              Meta Title
            </label>
            <input
              type="text"
              id="metaTitle"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="metaDescription">
              Meta Description
            </label>
            <input
              type="text"
              id="metaDescription"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="metaKeywords">
              Meta Keywords
            </label>
            <input
              type="text"
              id="metaKeywords"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={metaKeywords}
              onChange={(e) => setMetaKeywords(e.target.value)}
              required
            />
          </div>

          <div className="flex space-x-4">
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                className="form-checkbox text-purple-600"
                checked={isFeatured}
                onChange={() => setIsFeatured(!isFeatured)}
              />
              <span>Featured</span>
            </label>
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                className="form-checkbox text-purple-600"
                checked={isPublic}
                onChange={() => setIsPublic(!isPublic)}
              />
              <span>Public</span>
            </label>
         
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-4 rounded-md hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300"
          >
            Submit Blog Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;