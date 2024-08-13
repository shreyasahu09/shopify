import { useState } from 'react'
import { useEffect } from 'react'
import { useAuth } from '../../context/auth'
import React  from 'react'
import AdminMenu from '../../Components/Layout/AdminMenu'
import Layout from '../../Components/Layout/layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../Components/Form/CategoryForm'
import { Modal } from "antd";


const CreateCategory = () => {
  const [auth] = useAuth();
  const [categories, setcategories] = useState([]);
  const [name,setName]= useState("")
  const [visible,setVisible]=useState(false);
  const [selected,setSelected]=useState(null);
  const [updatedname,setUpdatedname]=useState("");
  //handle  form
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                '/api/v1/category/create-category',
                { name },
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}` // Include the token in the headers
                    }
                }
            );
            if (data?.success) {
                toast.success(`${name} is created`);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in input form");
        }
    }
  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category');
      if (data.success) {
        // Set the state with the array of categories
        setcategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //update category
  const handleUpdate = async(e)=>{
  try {
    e.preventDefault();
    const { data } = await axios.put(
      `/api/v1/category/update-category/${selected._id}`,
      { name: updatedname },
      {
        headers: {
          Authorization: `Bearer ${auth.token}` // Include the token in the headers
        }
      }
    );
    if(data.success){

      toast.success(`${updatedname} is created`);
      setSelected(null);
      setUpdatedname("");
      setVisible(false);
      getAllCategory();
    }
    else{
      console.log('error');
      toast.error(data.message);
    }
  } catch (error) {
    toast.error("Something went wrong");
  }
  }

   //Delete category
   const handleDelete = async(pId)=>{
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}` // Include the token in the headers
          }
        }
      );
      if(data.success){
        toast.success(`Category is Deleted`);
        getAllCategory();
      }
      else{
        console.log('error');
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    }
  
  return (
    <Layout title={'Dashboard-CreateCategory'}>
      <div className='container-fluid m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu/>
          </div>
          <div className='col-md-9'>
            <h1>Manage Category</h1>
            <div className='p-3 w-50'>
              <CategoryForm 
               handleSubmit={handleSubmit} 
               value={name} 
              setValue={setName}/>
            </div>
            <div  className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                  <>
                  <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <button className='btn btn-primary ms-2'
                         onClick={()=>{
                          setVisible(true);
                          setUpdatedname(c.name);
                          setSelected(c); }}>Edit</button>
                        <button className='btn btn-danger ms-2'
                         onClick={()=>{
                          handleDelete(c._id);
                        } }>Delete</button>
                      </td>
                  </tr>
                  </>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal onCancel={()=>setVisible(false)} footer={null} visible={visible}>
            <CategoryForm value={updatedname} setValue={setUpdatedname} handleSubmit={handleUpdate} />
          </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCategory;
