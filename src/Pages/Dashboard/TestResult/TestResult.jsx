import { useQuery } from "@tanstack/react-query";
import Title from "../../../Components/Title/Title";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";


const TestResult = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: reports = [], isLoading } = useQuery({
        queryKey: ["Reports"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reports/${user?.email}`);
            return res.data;
        }
    })

    




    return (
        <div>
            <Title heading={"Test Result"} subHeading={"Here is all of your delivered reports"}></Title>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Test Name</th>
                            <th>Date</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading && reports.map((report, idx) => <tr key={idx}>
                            <th>{idx + 1}</th>
                            <td>{report.testResults.testInfo.test_name}</td>
                            <td>{report.testResults.testInfo.date}</td>
                            <td><Link to={`/dashboard/testResult/details/${report._id}`}><button className="btn-accent btn text-white">See Details</button></Link></td>
                        </tr>)

                        }



                    </tbody>
                </table>
            </div>




        </div>
    );
};

export default TestResult;