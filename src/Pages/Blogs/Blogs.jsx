import { useQuery } from "@tanstack/react-query";
import Title from "../../Components/Title/Title";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Footer from '../../Pages/Home/Footer/Footer'

const Blogs = () => {
    const axiosPublic = useAxiosPublic()
    const { data: blogs } = useQuery({
        queryKey: ["Blogs"],
        queryFn: async () => {
            const res = await axiosPublic.get('/blogs')
            return res.data;
        }
    });


    const getTruncatedContent = (content) => {
        const words = content.split(' ');
        return words.slice(0, 30).join(' ');
    };

    return (
        <div className="">
            <div className="mt-20">
                <Title heading={"Blogs"} subHeading={"Learn What expert says"}></Title>
            </div>

            <div className="grid md:grid-cols-2 mb-20 lg:grid-cols-3 grid-cols-1 gap-3">
                {
                    blogs && blogs.map((blog, idx) =>
                        <div key={idx} className="card m-3 rounded-none space-y-2 bg-base-100 md:rounded-lg  h-full shadow-xl">
                            <figure><img className="w-full h-72" src={blog?.blog_img} alt="blog Image" /></figure>
                            <div className="card-body">
                                <h2 className="card-title">Title: <span className="font-bold">{blog?.title}</span></h2>
                                <h2 className="">{getTruncatedContent(blog?.content)}...</h2>
                                {blog?.content.split(' ').length > 30 && (
                                    <Link to={`/blog/${blog._id}`} className="text-blue-600 hover:underline">Read More</Link>
                                )}
                                <p className="font-bold ">Posted On: <span >{blog?.date}</span></p>
                                <div>
                                    <div className="flex -mt-7 gap-1 items-center">
                                        <img className="w-12 h-12 rounded-full" src={blog.author_img} alt="" />
                                        <p className="font-bold">{blog.author}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Blogs;
