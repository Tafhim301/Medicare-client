import { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Title from '../Title/Title';




const TestResultsForm = () => {
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const { data: test } = useQuery({
        queryKey: ["Test"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reservation/${id}`);
            return res.data;
        }
    });
    const navigate = useNavigate();

    const [resultData, setResultData] = useState({
        WBC: '',
        RBC: '',
        Hemoglobin: '',
        Hematocrit: '',
        Platelets: '',
    });

    const [referenceRanges, setReferenceRanges] = useState({
        WBC: '',
        RBC: '',
        Hemoglobin: '',
        Hematocrit: '',
        Platelets: '',
    });

    const [interpretation, setInterpretation] = useState('');
    const [doctorsNotes, setDoctorsNotes] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        

       


        try {
            const res = await axiosSecure.post(`/report/${id}`, {
                
                testResults: {
                    resultData,
                    referenceRanges,
                    interpretation,
                    doctorsNotes,
                    testInfo: test,
                }
            });

            if (res.data.insertedId) {
                Swal.fire({
                    title: "Delivered!",
                    text: "Report has been delivered successfully",
                    icon: "success"
                });
                navigate('/dashboard/reservations')

            }
        } catch (error) {
         
            Swal.fire({
                title: "Error!",
                text: "Failed to deliver report. Please try again later.",
                icon: "error"
            });
        }
    };
    

   
   

   

    return (
        <div>
            <Title heading={"Submit Report"} subHeading={"Let them know about their health"}></Title>
            <div className=" min-h-screen bg-base-200">
                <div className=" flex-col lg:flex-row-reverse">

                    <div className="card  shadow-2xl bg-base-100">
                        <form className="card-body" onSubmit={handleSubmit}>
                            <div className='lg:grid grid-cols-2 gap-2'>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">WBC (White Blood Cells)</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter WBC Test Result"
                                        className="input input-bordered"
                                        value={resultData.WBC}
                                        onChange={(e) =>
                                            setResultData({ ...resultData, WBC: e.target.value })
                                        }
                                        required
                                    />
                                    <input
                                        type="number"
                                        placeholder="Enter Reference Range for WBC"
                                        className="input input-bordered mt-2"
                                        value={referenceRanges.WBC}
                                        onChange={(e) =>
                                            setReferenceRanges({
                                                ...referenceRanges,
                                                WBC: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>

                                <div className="form-control ">
                                    <label className="label">
                                        <span className="label-text">RBC (Red Blood Cells)</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter RBC Test Result"
                                        className="input input-bordered"
                                        value={resultData.RBC}
                                        onChange={(e) =>
                                            setResultData({ ...resultData, RBC: e.target.value })
                                        }
                                        required
                                    />
                                    <input
                                        type="number"
                                        placeholder="Enter Reference Range for RBC"
                                        className="input input-bordered mt-2"
                                        value={referenceRanges.RBC}
                                        onChange={(e) =>
                                            setReferenceRanges({
                                                ...referenceRanges,
                                                RBC: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>

                                <div className="form-control ">
                                    <label className="label">
                                        <span className="label-text">Hemoglobin</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter Hemoglobin Test Result"
                                        className="input input-bordered"
                                        value={resultData.Hemoglobin}
                                        onChange={(e) =>
                                            setResultData({ ...resultData, Hemoglobin: e.target.value })
                                        }
                                        required
                                    />
                                    <input
                                        type="number"
                                        placeholder="Enter Reference Range for Hemoglobin"
                                        className="input input-bordered mt-2"
                                        value={referenceRanges.Hemoglobin}
                                        onChange={(e) =>
                                            setReferenceRanges({
                                                ...referenceRanges,
                                                Hemoglobin: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                               
                                <div className="form-control ">
                                    <label className="label">
                                        <span className="label-text">Hematocrit</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter Hematocrit Test Result"
                                        className="input input-bordered"
                                        value={resultData.Hematocrit}
                                        onChange={(e) =>
                                            setResultData({ ...resultData, Hematocrit: e.target.value })
                                        }
                                        required
                                    />
                                    <input
                                        type="number"
                                        placeholder="Enter Reference Range for Hematocrit"
                                        className="input input-bordered mt-2"
                                        value={referenceRanges.Hematocrit}
                                        onChange={(e) =>
                                            setReferenceRanges({
                                                ...referenceRanges,
                                                Hematocrit: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                                
                                <div className="form-control mt-4">
                                    <label className="label">
                                        <span className="label-text">Platelets</span>
                                    </label>
                                    <input
                                        type="number"
                                        placeholder="Enter Platelets Test Result"
                                        className="input input-bordered"
                                        value={resultData.Platelets}
                                        onChange={(e) =>
                                            setResultData({ ...resultData, Platelets: e.target.value })
                                        }
                                        required




                                    />
                                    <input
                                        type="number"
                                        placeholder="Enter Reference Range for Platelets"
                                        className="input input-bordered mt-2"
                                        value={referenceRanges.Platelets}
                                        onChange={(e) =>
                                            setReferenceRanges({
                                                ...referenceRanges,
                                                Platelets: e.target.value,
                                            })
                                        }
                                        required
                                    />
                                </div>
                                <div className="form-control mt-4">
                                    <label className="label">
                                        <span className="label-text">Interpretation</span>
                                    </label>
                                    <textarea
                                        value={interpretation}
                                        onChange={(e) => setInterpretation(e.target.value)}
                                        className="textarea textarea-bordered"
                                        required
                                    ></textarea>
                                </div>
                                <div className="form-control mt-4">
                                    <label className="label">
                                        <span className="label-text">Doctors Notes</span>
                                    </label>
                                    <textarea
                                        value={doctorsNotes}
                                        onChange={(e) => setDoctorsNotes(e.target.value)}
                                        className="textarea textarea-bordered"
                                        required
                                    ></textarea>
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestResultsForm;
