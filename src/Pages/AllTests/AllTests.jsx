import { useEffect, useState } from "react";
import Title from "../../Components/Title/Title";
import AllTest from "./AllTest";

import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Footer from "../Home/Footer/Footer";

const AllTests = () => {
    const axiosPublic = useAxiosPublic();
    const [tests, setTests] = useState([]);
    const [testLoading, setTestLoading] = useState(true);
    const [filteredTests, setFilteredTests] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 12;

    const fetchTests = async (page) => {
        setTestLoading(true);
        try {
            console.log('Fetching tests for page:', page); // Debug log
            const response = await axiosPublic.get(`/allTests?page=${page}&limit=${pageSize}`);
            console.log('API response:', response.data); // Debug log
            setTests(response.data.tests);
            setFilteredTests(response.data.tests);
            setCurrentPage(response.data.currentPage);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching tests:', error);
        } finally {
            setTestLoading(false);
        }
    };

    useEffect(() => {
        fetchTests(currentPage);
    }, [currentPage]);

    const handleSearch = (e) => {
        e.preventDefault();
        const date = e.target.search.value;
        const selectedTests = tests.filter(test => {
            const testDate = new Date(test.date);
            return testDate.toDateString() === new Date(date).toDateString();
        });
        setFilteredTests(selectedTests);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="">
            <div className="mt-20">
                <Title heading={'ALL Tests'} subHeading={"Find Out What You Need"} />
            </div>
            <form className="md:mx-10" onSubmit={handleSearch}>
                <label className="input my-3  input-bordered flex items-center gap-2">
                    <input name='search' type="date" className="grow" placeholder="Filter by date..." />
                    <button type="submit" className="btn btn-sm">Search By Date</button>
                </label>
            </form>
            <div className="md:m-10">
                {testLoading ? (
                    <div className="justify-center items-center flex mt-6">
                        <span className="loading-spinner loading loading-md"></span>
                    </div>
                ) : filteredTests && filteredTests.length > 0 ? (
                    <div>
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {filteredTests.map(test => <AllTest key={test._id} test={test} />)}
                        </div>
                        <div className="pagination-controls flex justify-center items-center mt-6">
                            <button onClick={handlePreviousPage} disabled={currentPage === 1} className="btn btn-sm">Previous</button>
                            <span className="mx-2">Page {currentPage} of {totalPages}</span>
                            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn btn-sm">Next</button>
                        </div>
                    </div>
                ) : (
                    <p className="text-center mb-96 font-bold text-xl">No tests found for the selected date.</p>
                )}
            </div>
            <Footer></Footer>
        </div>
    );
};

export default AllTests;
