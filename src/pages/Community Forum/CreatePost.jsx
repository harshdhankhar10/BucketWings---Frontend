import React, { useEffect, useState } from 'react';
import { X, Plus, Image as ImageIcon, Check } from 'lucide-react';
import ReactQuill from 'react-quill'; 
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import {useAuth} from '../../context/AuthContext';
import {useNavigate} from 'react-router-dom';
import {storage}  from  "../../Firebase/Firebase"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toast } from 'react-toastify';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [attachment, setAttachment] = useState(null);
  const [category, setCategory] = useState('');
  const [pollQuestion, setPollQuestion] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();  
  const navigate = useNavigate();

  useEffect(() => {
    if(JSON.parse(localStorage.getItem('auth'))) {
      window.location.href = '/community';
    }
  }, []);



  const handleAddTag = (event) => {
    if (event.key === 'Enter' && event.target.value) {
      setTags([...tags, event.target.value]);
      event.target.value = '';
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/community/create-post`, {
        title,
        tags,
        category,
        attachment,
        content: content.replace(/<[^>]*>?/gm, '')
    });
    
      if(response.data.success){
        setLoading(false);
        Swal.fire({
          icon: 'success',
          title: 'Post Created Successfully',
          showConfirmButton: false,
          timer: 1500
        });
        setTitle('');
        setContent('');
        setTags([]);
        setCategory('');
        setImage(null);
      }
      else{
        setLoading(false);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message,
        });
      }
      
    } catch (error) {
      console.error(error);
    }
  
  };
  const handleAttachment = async (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `Community_Forum_attachments/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress);
    }, (error) => {
      console.error(error);
      toast.error('An error occurred while uploading the attachment');
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setAttachment(downloadURL);
        toast.success('Attachment uploaded successfully');
      });
    });
  };


  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

  return (
   <>
   <Helmet>
        <title>Create Post - Community Forum | BucketWings</title>
   </Helmet>
     <div className="max-w-4xl mx-auto  p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden">
  <ReactQuill
    value={content}
    onChange={setContent}
    modules={modules}
    formats={formats}
    placeholder="Write your post content here..."
    className=" rounded-lg h-64 focus:outline-none"
  />
</div>

        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <span key={index} className="bg-purple-100 text-purple-800 text-sm px-2 py-1 rounded-full flex items-center">
                {tag}
                <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-1 text-purple-600 hover:text-purple-800">
                  <X size={14} />
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            onKeyPress={handleAddTag}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            placeholder="Type and press Enter to add tags"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            required
          >
            <option value="">Select a category</option>
            <option value="General">General</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Attachment (Optional)</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="space-y-1 text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className={`sr-only ${attachment ? 'disabled:opacity-0' : ''}`

                  } onChange={handleAttachment}/>
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">All file types accepted</p>
            </div>
          </div>
        </div>
        {
          uploadProgress > 0  && (
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">{uploadProgress}% Uploaded</label>
              <progress value={uploadProgress} max="100" className="w-full"></progress>
            </div>
          )
        }

        <div>
         {auth.user && (
            <button type="submit" className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition duration-300">
              {loading ? 'Creating Post...' : 'Create Post'}
            </button>
         )
         }
        </div>
      </form>
    </div>
   </>
  );
};

export default CreatePost;
