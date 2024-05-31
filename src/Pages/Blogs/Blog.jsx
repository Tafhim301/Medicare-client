import { useQuery } from "@tanstack/react-query";

import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const Blog = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    console.log(id)
    const { data: blog = {} } = useQuery({
        queryKey: ["Blog"],
        queryFn: async () => {
            const res = await axiosPublic.get(`/blog/${id}`);
            return res.data;
        }
    });

    

    


    return (
        <div>
            <div>
                <div  className="card m-3 rounded-none space-y-2 bg-base-100 md:rounded-lg  h-full shadow-xl">
                    <figure><img className="w-full " src={blog?.blog_img} alt="blog Image" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Title: <span className="font-bold">{blog?.title}</span></h2>
                        <h2 className="">{blog?.content}</h2>
                        <p className="font-bold ">Posted On: <span >{blog?.date}</span></p>
                        <div>
                            <div className="flex gap-1 items-center">
                                <img className="w-12 h-12 rounded-full" src={blog?.author_img} alt="" />
                                <p className="font-bold">{blog?.author}</p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    );
};

export default Blog;