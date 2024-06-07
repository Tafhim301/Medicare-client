import Swal from "sweetalert2";
import Title from "../../../Components/Title/Title";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useEffect } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AllTest = () => {

    const {
        register,
        handleSubmit,
        setValue,
        reset,

    } = useForm();

    const axiosSecure = useAxiosSecure();
    const { data: tests, isPending: testsLoading, refetch } = useQuery({
        queryKey: ['AllTests'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allTests/admin')
            return res.data;
        }

    })
    const [updateTest, setUpdateTest] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date())
    const axiosPublic = useAxiosPublic();
    useEffect(() => {
        register('date');
        setValue('date', selectedDate);
        setValue('name', updateTest?.name || '');
        setValue('image', updateTest?.image || '');
        setValue('details', updateTest?.details || '');
        setValue('price', updateTest?.price || '');
        setValue('slots', updateTest?.slots || '');
    }, [register, setValue, selectedDate, updateTest]);
    if (testsLoading) {
        return <div className="justify-center items-center flex mt-6 ">
            <span className="loading-spinner loading loading-md"></span>
        </div>
    }



    const handleUpdate = test => {
        setUpdateTest(test);
        setSelectedDate(test.date)

        const modal = document.getElementById("my_modal_1");
        modal.showModal();



    }


    const handleDelete = test => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this test!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/test/${test._id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {

                            Swal.fire({
                                title: "Deleted!",
                                text: `${test.name} has been deleted successfully.`,
                                icon: "success"
                            });
                            refetch();

                        }
                    })

            }
        });

    }

    const onSubmit = async (data) => {
        console.log(data)
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        console.log(image);
        const res = await axiosPublic.post(image_hosting_api, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        if (res.data.success) {
            const test = {
                name: data.name,
                image: res.data.data.display_url,
                details: data.details,
                slots: parseInt(data.slots),
                date: data.date,
                price: parseFloat(data.price),



            }

            axiosSecure.put(`/updateTest/${updateTest._id}`, test)
                .then(res => {
                    console.log(res.data);
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            title: "Good Job!",
                            text: "Test Updated Successfully",
                            icon: 'success',
                            timer: 1500
                        })
                        const modal = document.getElementById("my_modal_1");
                        modal.close();
                        reset();
                        refetch()

                    }

                })
        }

    }





    return (
        <div>
            <Title heading={"All test"} subHeading={"Inspect Update or delete any test you want"}></Title>
            <div className="overflow-x-auto">
                <table className="table">

                    <thead>
                        <tr>

                            <th>#</th>
                            <th>Image</th>
                            <th>Test Details</th>
                            <th>Slots</th>
                            <th>Reservations</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            tests.map((test, idx) =>
                                <tr key={idx}>
                                    <td>{idx + 1}</td>

                                    <td >
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask  w-12 h-12">
                                                    <img src={test.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td className="text-lg">
                                        {test.name}
                                        <br />
                                        <span className=" hidden lg:block  text-xs">{test.details}</span>

                                    </td>
                                    <td>{test.slots}</td>
                                    <td>
                                        <Link to={`/dashboard/reservations/${test?._id}`}> <button className="btn bg-blue-500 text-white">Reservations</button></Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleUpdate(test)} className="btn text-white btn-accent">Update</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(test)} className="btn text-white btn-error">Delete</button>
                                    </td>

                                </tr>)
                        }

                    </tbody>



                </table>
            </div>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">

                    <div className="hero">
                        <div className="hero-content">
                            <div className="card shrink-0 w-full shadow-2xl bg-base-100">
                                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                                    <div className="">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Test Name</span>
                                            </label>
                                            <input {...register('name')} type="text" defaultValue={updateTest?.name} placeholder="Test Name" className="input input-bordered" required />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Test Image</span>
                                            </label>
                                            <input defaultValue={updateTest?.image} {...register('image')} type="file" placeholder="Test Image" className="file-input input-bordered file-input-primary" required />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Details</span>
                                            </label>
                                            <input defaultValue={updateTest?.details} {...register('details')} type="text" placeholder="Test Details" className="input input-bordered" required />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Price</span>
                                            </label>
                                            <input defaultValue={updateTest?.price} {...register('price')} type="text" placeholder="Price" className="input input-bordered" required />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Date</span>
                                            </label>
                                            <DatePicker

                                                selected={selectedDate}
                                                onChange={(date) => {
                                                    setSelectedDate(date);
                                                    setValue('date', date);
                                                }}

                                                className="input input-bordered w-full"
                                            />
                                        </div>
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Slots</span>
                                            </label>
                                            <input defaultValue={updateTest?.slots} {...register('slots')} type="text" placeholder="Slots" className="input input-bordered" required />
                                        </div>
                                    </div>
                                    <div className="form-control mt-6">
                                        <button type="submit" className="btn btn-primary">Update Test</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="modal-action">
                        <form method="dialog">

                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    );
};

export default AllTest;