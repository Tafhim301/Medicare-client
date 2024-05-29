import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Title from "../../../Components/Title/Title";


const AllBanners = () => {
    const axiosSecure = useAxiosSecure();
    const { data: banners = [], isPending: isLoading ,refetch} = useQuery({
        queryKey: ["Banners"],
        queryFn: async () => {
            const res = await axiosSecure.get('/banners')
            return res.data;
        }
    })
    if (isLoading) {
        return <div className="justify-center items-center flex mt-6 ">
            <span className="loading-spinner loading loading-md"></span>
        </div>


    }

    const handleChangeStatus = banner =>{
        axiosSecure.put(`/banner/status/${banner._id}`)
        
        .then(res =>{
            console.log(res.data)
            if(res.data.modifiedCount > 0){
                Swal.fire({
                  
                    icon: "success",
                    title: `${banner.name} Has Added to homepage successfully`,
                    showConfirmButton: false,
                    timer: 1500
                  });
                refetch();

            }
        })

    }


    return (
        <div>
            <Title heading={"All Banners"} subHeading={"All the banners are here"}></Title>
            <div className="overflow-x-auto">
                <table className="table">
              
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Status</th>


                        </tr>
                    </thead>
                    <tbody>

                        {banners.map((banner, idx) =>
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
                                                <img src={banner?.image} />
                                            </div>
                                        </div>

                                    </div>

                                </td>
                                <td>{banner?.name}</td>
                                <td>{banner?.title}</td>
                                <td><span className="" onClick={() => handleChangeStatus(banner)}>{banner?.isActive ? 'Active' :<button className="btn">Activate</button>}</span></td>




                            </tr>
                        )}

                    </tbody>


                </table>
            </div>

        </div>
    );
};

export default AllBanners;