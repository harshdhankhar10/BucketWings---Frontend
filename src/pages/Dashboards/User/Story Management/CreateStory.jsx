import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';
import ImageResize from 'quill-image-resize-module-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CreateStory = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); 
  const [isPublic, setIsPublic] = useState(false);

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
        setImage(response.data.imageUrl);
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

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ align: [] }],
      ['link', 'image', 'video'],
      [{ color: [] }, { background: [] }],
      ['clean'],
    ],
    imageResize: {
      modules: ['Resize', 'DisplaySize', 'Toolbar'],
    },
  };

  const formats = [
    'header',
    'font',
    'list',
    'bullet',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'align',
    'link',
    'image',
    'video',
    'color',
    'background',
  ];

  const handleSubmit =async  (e) => {
    e.preventDefault();
    const dateSubmitted = new Date().toISOString();
    const storyData = {
      title,
      content : content.replace(/<[^>]*>?/gm, ''),
      image,
      isPublic,
      dateSubmitted,
    };
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/stories/create`, storyData);
      if(response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Story Created',
          text: 'Your story has been created successfully',
        });
        setTitle('');
        setContent('');
        setImage(null);
        setImagePreview(null);
        setIsPublic(false);

      }else{
        Swal.fire({
          icon: 'error',
          title: response.data.message,
          text: 'An error occurred while creating the story',
        });
      }

    } catch (error) {
      console.error('Error creating story:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred while creating the story',
      });
    }
  
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-8 space-y-6 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Create Your Story</h2>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            placeholder="Enter your story title"
            required
          />
        </div>

        <div className='pb-10'>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 ">Content</label>
          <ReactQuill
                  value={content}
                  onChange={setContent}
                  formats={formats}
                  modules={modules}
                  className="rounded-lg bg-gray-100 border-transparent h-72 focus:border-indigo-500 focus:bg-white focus:ring-0 transition duration-200"
                />
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Banner Image</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Camera className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="image-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="image-upload"
                    name="image-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e)}
                    required
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 10MB</p>
            </div>
          </div>
        </div>

        {/* Image Preview Section */}
        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700">Preview:</p>
            <img src={imagePreview} alt="Preview" className="mt-2 max-h-64 mx-auto shadow-lg border rounded-md" />
          </div>
        )}

        <div className="flex items-center">
          <input
            type="checkbox"
            id="isPublic"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
          />
          <label htmlFor="isPublic" className="ml-2 block text-sm text-gray-900">
            Make this story public
          </label>
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition"
          >
            Create Story
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStory;
