import axios from "axios";

import React,{useEffect, useState} from "react";



function Createuser() {

const [showModal, setShowModal] = useState(false);
const [name,setname]= useState("")
const [email,setemail]=useState("")
const [age,setage]=useState()
const [userdata,getuserdata]=useState([])
const [deleteuser,setdeleteuser]=useState()
const [count,setcound]=useState(0)

const [editModal, setEditModal] = useState(false);

const [selecteduser,setselecteduser]=useState({})
const [edituser,setediteuser]=useState()



useEffect(() => {
  fetchdata();
}, [deleteuser,edituser]);



const handledelete =async (email)=>{

  const response = await axios.delete(`http://localhost:6001/admin/deleteuser?email=${email}`)
  if(response.data){
   setdeleteuser(count)
  }else{

  }

  const temp = count
  setcound(temp+1)

}


const handleeditsubmit = async (e) => {
  e.preventDefault();

  const oldemail = selecteduser.email;

  const response = await axios.post(
    "http://localhost:6001/admin/edituser",
    { name, email, age, oldemail }
  );

  if (response.data) {
    const newcount = count + 1;
    setcound(newcount);
    setediteuser(newcount);
    setEditModal(false);
  }
};



const handleedit = (users) => {
  setname(users.name);
  setemail(users.email);
  setage(users.age);
  setselecteduser(users);
  setEditModal(true);
};

const handleCancel = () => {
  setname(selecteduser.name);
  setemail(selecteduser.email);
  setage(selecteduser.age);
  setEditModal(false);
};


const handlecreate=async(e)=>{

  e.preventDefault();
  
const response = await axios.post("http://localhost:6001/admin/createuser",{name,email,age})


console.log(response.data);
if (response.data.success==true) {
  setShowModal(false)
  

}


}

const fetchdata = async () => {
  try {
    const response = await axios.get("http://localhost:6001/admin/getuser");
    getuserdata(response.data);
    console.log(userdata);
  } catch (error) {
    console.error("Error fetching users", error);
  }
};




  return (
    <>
      <div className="w-[100%]">
        <div className="w-full flex justify-center h-[70px]">
          <div className="h-[40px] w-[80%]   flex shadow-2xl  justify-between items-center">
            <button
            onClick={() =>setShowModal(true)}
              className="w-[250px] mt-4 shadow-md text-sm font-semibold text-stone-100 bg-gradient-to-r from-stone-700 via-stone-600 to-stone-800 px-6 py-2 rounded-md hover:scale-105 hover:shadow-lg hover:from-stone-600 hover:to-stone-900 active:scale-95 transition-all duration-300"
            >
             
              + ADD USERS
            </button>
          </div>
        </div>
        <div className="w-[100%] flex justify-center items-center ">
        <table className="w-[80%] border-collapse shadow-lg  ">
    <thead>
      <tr className="bg-gradient-to-r from-stone-700 via-stone-600 to-stone-800 text-white h-[45px]">
        <th className="text-left pl-6 w-[10%]">NO</th>
        <th className="text-left w-[25%]">Name</th>
        <th className="text-left w-[25%]">Email</th>
        <th className="text-left w-[20%]">Age</th>
        <th className="text-left w-[20%]">Action</th>
      </tr>
    </thead>

    <tbody>
      {userdata.map((users,index)=>(
     
      <tr  key={index}
      className="border-b hover:bg-stone-100 transition-all duration-300">
        <td className="pl-6 py-3">{index + 1}</td>
        <td>{users.name}</td>
        <td>{users.email} </td>
        <td>{users.age}</td>
        <td>
          <div className="flex gap-3">
            <button
            onClick={()=>handleedit(users)}
             className="bg-gradient-to-r from-stone-700 via-stone-600 to-stone-800 h-[30px] w-[80px] text-sm text-white font-bold rounded-sm hover:scale-105 transition">
              EDIT
            </button>
            <button
          onClick={()=>handledelete(users.email)}
             className="bg-red-700 h-[30px] w-[80px] text-sm text-white font-bold rounded-sm hover:scale-105 transition">
              DELETE
            </button>
          </div>
        </td>
      </tr>
      ))}

    
    
    </tbody>
  </table>
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-[400px] p-6 relative">
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
              >
                ✕
              </button>

              <h2 className="text-lg font-bold mb-4 text-stone-700 text-center">
                Create New User
              </h2>

              <form  className="flex flex-col gap-3">
                <input
                onChange={(e)=>setname(e.target.value)}
                  type="text"
                  name="name"
                  placeholder="Enter Name"
                  
                  
                  required
                  className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-stone-500"
                />
                <input
                 onChange={(e)=>setemail(e.target.value)}
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                 
                
                  required
                  className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-stone-500"
                />
                <input
                onChange={(e)=>setage(e.target.value)}
                  type="number"
                  name="age"
                  placeholder="Enter your age"
                  
                  
                  required
                  className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-stone-500"
                />

                <button
                 onClick={(e)=>handlecreate(e)}
                  type="button"
                  className="bg-gradient-to-r from-stone-700 via-stone-600 to-stone-800 text-white font-semibold py-2 rounded-md hover:scale-105 transition-all duration-300"
                >
                  Create User
                </button>
              </form>
            </div>
          </div>
        )}
        {editModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white rounded-lg shadow-xl w-[400px] p-6 relative">
      {/* Close Button */}
      <button
     
        onClick={() => setEditModal(false)}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl"
      >
        ✕
      </button>

      <h2 className="text-lg font-bold mb-4 text-stone-700 text-center">
        Edit User
      </h2>

      <form onSubmit={handleeditsubmit} className="flex flex-col gap-3">

        <input
          type="text"
          defaultValue={selecteduser.name}
          onChange={(e)=>setname(e.target.value)}
          placeholder={selecteduser.name}
          required
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-stone-500"
        />
        <input
          type="email"
         onChange={(e)=>setemail(e.target.value)}
         defaultValue={selecteduser.email}
          placeholder={selecteduser.email}
          required
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-stone-500"
        />
        <input
          type="number"
         onChange={(e)=>setage(e.target.value)}
         defaultValue={selecteduser.age}
          placeholder={selecteduser.age}
          required
          className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-stone-500"
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-stone-700 via-stone-600 to-stone-800 text-white font-semibold py-2 rounded-md hover:scale-105 transition-all duration-300"
        >
          update
        </button>
        <button
          onClick={handleCancel}
          type="submit"
          className="bg-gradient-to-r from-stone-700 via-stone-600 to-stone-800 text-white font-semibold py-2 rounded-md hover:scale-105 transition-all duration-300"
        >
          cancel
        </button>
      </form>
    </div>
  </div>
)}
      </div>

     
      
      
    </>
  );
}

export default Createuser;
