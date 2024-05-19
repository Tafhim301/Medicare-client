import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from 'react';
import Swal from "sweetalert2";



const Users = () => {
    const axiosSecure = useAxiosSecure();
    const [selectedUser, setSelectedUser] = useState(null)
    const { data: users = [], pending: isLoading,refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data
        }
    })
    const handleSeeInfo = user => {
        setSelectedUser(user);
        const modal = document.getElementById("my_modal_3");
        modal.showModal();

    }
    const handleChangeStatus = user =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You want to change the status of this user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
          }).then((result) => {
            if (result.isConfirmed) {
              
              axiosSecure.patch(`/users/status/${user._id}`)
              .then(res =>{
                  console.log(res.data)
                  if(res.data.modifiedCount > 0){
                      Swal.fire({
                        
                          icon: "success",
                          title: `${user.name}'s status has been changed successfully`,
                          showConfirmButton: false,
                          timer: 1500
                        });
                      refetch();
      
                  }
              })
            }
          });

    }
    const handleMakeAdmin = user =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You want to make this user an Admin!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
          }).then((result) => {
            if (result.isConfirmed) {
              
              axiosSecure.patch(`/users/admin/${user._id}`)
              .then(res =>{
                  console.log(res.data)
                  if(res.data.modifiedCount > 0){
                      Swal.fire({
                        
                          icon: "success",
                          title: `${user.name} is an Admin Now`,
                          showConfirmButton: false,
                          timer: 1500
                        });
                      refetch();
      
                  }
              })
            }
          });
        
    }
    if (isLoading) {
        return <div className="justify-center items-center flex mt-6 ">
            <span className="loading-spinner loading loading-md"></span>
        </div>
    }
    return (
        <div>
            {selectedUser && <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                 
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className=" flex h-96 flex-col">
                        <img className="w-full h-72" src={selectedUser.avatar} alt="" />
                        <div className="grid h-1/2 grid-cols-2">
                            <p>Name: {selectedUser.name}</p>
                            <p>Blood Group: {selectedUser.blood_group}</p>
                            <p >Status: {selectedUser.isActive ? "Active" : "Blocked"}</p>
                            <p>District: {selectedUser.district}</p>
                            <p>Upazilla: {selectedUser.upazilla}</p>
                        </div>

                    </div>
                </div>
            </dialog>
            }

            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                No.
                            </th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th>Blood Group</th>
                            <th>Status</th>
                            <th>Role</th>
                            <th>See Info</th>
                        </tr> 
                    </thead>
                    <tbody>

                        {users.map((user, idx) =>
                            <tr key={idx} >

                                <td className="text-xl">
                                    {
                                        idx + 1
                                    }

                                </td>
                                <td>

                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user?.avatar} />
                                            </div>
                                        </div>

                                    </div>

                                </td>
                                <td>{user?.name}</td>
                                <td>{user?.blood_group}</td>
                                <td><button onClick={() => handleChangeStatus(user)}>{user?.isActive ? 'Active' : "Blocked"}</button></td>
                                <td>{user.role?"Admin":<button onClick={() => handleMakeAdmin(user)} className="btn btn-accent text-white">Make Admin</button>}</td>
                                <td><button onClick={() => handleSeeInfo(user)} className=" btn  text-white bg-indigo-500">See Info</button></td>



                            </tr>
                        )}

                    </tbody>


                </table>
            </div>

        </div >
    );
};

export default Users;