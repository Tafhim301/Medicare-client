import { useParams } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import logo from '../../../assets/medicare_logo.jpg';
import { FaDownload } from "react-icons/fa";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const TestResultDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: report = {} } = useQuery({
        queryKey: ["Reports", id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/report/${id}`);
            return res.data;
        }
    });

    const testResults = report?.testResults || {};
    const testInfo = testResults?.testInfo || {};
    const referenceRanges = testResults?.referenceRanges || {};
    const resultData = testResults?.resultData || {};
    const doctorsNotes = testResults?.doctorsNotes || '';
    const interpretation = testResults?.interpretation || '';
    const { test_name, date, email } = testInfo;

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `${test_name || 'Test_Report'}`,
        onAfterPrint: () => console.log('Print successful!')
    });

    return (
        <div className="min-h-screen mx-2 flex flex-col">
            <div className="flex-grow" ref={componentRef}>
                <div className="flex items-center gap-1 p-4">
                    <img className="w-20" src={logo} alt="Medicare Logo" />
                    <div>
                        <h2 className="text-xl font-bold">Medicare</h2>
                        <p>A reliable health Solution For All</p>
                    </div>
                </div>
                <div className="border-black border px-2 p-1 flex items-center justify-between">
                    <p>Name: <span className="font-bold">{user?.displayName}</span></p>
                    <p>Email: <span className="font-bold">{email}</span></p>
                    <p>Test Name: <span className="font-bold">{test_name}</span></p>
                    <p>Test Date: <span className="font-bold">{date}</span></p>
                </div>
                <div className="my-3">
                    <h2 className="text-2xl font-bold">Test Results:</h2>
                    <div className="grid grid-cols-2 gap-1 mx-2">
                        <p>RBC: <span className="font-bold text-md">{resultData?.RBC}/{referenceRanges?.RBC}</span></p>
                        <p>WBC: <span className="font-bold text-md">{resultData?.WBC}/{referenceRanges?.WBC}</span></p>
                        <p>Hemoglobin: <span className="font-bold text-md">{resultData?.Hemoglobin}/{referenceRanges?.Hemoglobin}</span></p>
                        <p>Hematocrit: <span className="font-bold text-md">{resultData?.Hematocrit}/{referenceRanges?.Hematocrit}</span></p>
                        <p>Platelets: <span className="font-bold text-md">{resultData?.Platelets}/{referenceRanges?.Platelets}</span></p>
                    </div>
                    <div className="mx-2">
                        <p className="">Interpretation: <span className="text-lg font-bold">{interpretation}</span></p>
                        <p className="">Suggestion: <span className="text-lg font-bold">{doctorsNotes}</span></p>
                    </div>
                </div>
            </div>
            <button className="btn bg-blue-500 text-white flex items-center m-2 gap-1 p-2" onClick={handlePrint}>
                <FaDownload /> Download PDF
            </button>
            <footer className="border-t-2 border-black p-2 flex justify-between">
                <p>Contact Us: infoMedicare.com</p>
                <p>Phone: (018) 456-7890</p>
            </footer>
        </div>
    );
};

export default TestResultDetails;
