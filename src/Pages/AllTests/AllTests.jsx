import  { useEffect, useState } from "react";
import Title from "../../Components/Title/Title";
import useTest from "../../Hooks/useTest";
import AllTest from "./AllTest";

const AllTests = () => {
    const [tests, testLoading] = useTest();
    const [filteredTests, setFilteredTests] = useState([]);

    useEffect(() => {
        if(!testLoading){

            const todayDate = new Date();
            const futureTests = tests.filter(test => new Date(test.date) > todayDate);
            setFilteredTests(futureTests);
        } 
      
    }, [tests,testLoading]);

    const handleSearch = e => {
        e.preventDefault();
        const date = e.target.search.value;

       
        const selectedTests = tests.filter(test => {
            const testDate = new Date(test.date);
            
            return testDate.toDateString() === new Date(date).toDateString();
        });
        setFilteredTests(selectedTests);
    };

    return (
        <div className="md:mx-10">
            <div className="mt-20">
                <Title heading={'ALL Tests'} subHeading={"Find Out What You Need"} />
            </div>
            <form onSubmit={handleSearch}>
                <label className="input my-3 mr-5 input-bordered flex items-center gap-2">
                    <input name='search' type="date" className="grow" placeholder="Filter by date..." />
                    <button type="submit" className="btn btn-sm">Search By Date</button>
                </label>
            </form>
            <div>
            {testLoading ? (
                    <div className="justify-center items-center flex mt-6 ">
                        <span className="loading-spinner loading loading-md"></span>
                    </div>
                ) : filteredTests.length > 0 ? (
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {
                            filteredTests.map(test => <AllTest key={test._id} test={test} />)

                        }
                
            </div>
                ) : (
                    <p className="text-center font-bold text-xl">No tests found for the selected date.</p>
                )}

            </div>
            
        </div>
    );
};

export default AllTests;
