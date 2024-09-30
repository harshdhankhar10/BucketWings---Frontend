import React, { useState } from 'react';
import { PlusCircle, Calendar, Image as ImageIcon } from 'lucide-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Quill } from 'react-quill';
import axios from 'axios';
import ImageResize from 'quill-image-resize-module-react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

Quill.register('modules/imageResize', ImageResize);

const CreateGoal = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    deadline: '',
    image: null, 
    progress: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      description: value,
    }));
  };

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
        setFormData((prevState) => ({
          ...prevState,
          image: response.data.imageUrl,
        }));
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
      ['clean'], // Remove formatting
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

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/goals/create`, formData);
        if (response.data.success) {
            Swal.fire({
                title: 'Goal created successfully',
                icon: 'success',
                showCancelButton: false,
                showConfirmButton: false,
                timer: 1500,
            });
            setFormData({
                title: '',
                description: '',
                category: '',
                deadline: '',
                image: null,
                progress: 0,
            });
        } else {
            Swal.fire({
                title: 'An error occurred',
                text: response.data.message,
                icon: 'error',
                showCancelButton: false,
                showConfirmButton: false,
                timer: 1500,
            });
        }
        
    } catch (error) {
        console.error('Error creating goal:', error);
        toast.error('An error occurred while creating the goal');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-purple-600 font-semibold mb-1">BucketWings</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Goal</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter title"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <ReactQuill
                value={formData.description}
                onChange={handleDescriptionChange}
                modules={modules}
                formats={formats}
                theme="snow"
                className="mt-1 block w-full"
                style={{ height: '150px' }}
              />
            </div>
            <br />

            <div>
              <label htmlFor="category" className="mt-8 block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                required
                placeholder="Enter category"
              />
            </div>

            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                Deadline
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  name="deadline"
                  id="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="block w-full pl-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <div className="mt-1 flex items-center">
                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  {formData.image ? (
                    <img src={formData.image} alt="Goal" className="h-full w-full object-cover" />
                  ) : (
                    <ImageIcon className="h-full w-full text-gray-300" />
                  )}
                </span>
                <label
                  htmlFor="image-upload"
                  className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  <span>
                    { formData.image ? 'Change Image' : 'Upload Image'}
                  </span>
                  <input
                    id="image-upload"
                    name="image"
                    type="file"
                    className="sr-only"
                    onChange={handleImageChange}
                    accept="image/*"
                  />
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="progress" className="block text-sm font-medium text-gray-700">
                Progress
              </label>
              <input
                type="range"
                name="progress"
                id="progress"
                min="0"
                max="100"
                value={formData.progress}
                onChange={handleChange}
                className="mt-1 block w-full"
              />
              <div className="text-center mt-2">{formData.progress}%</div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <PlusCircle className="h-5 w-5 mr-2" />
                Create Goal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGoal;
