import { Link } from "react-router-dom";


const AllTest = ({ test }) => {
    const { name, image, details, slots, date, _id } = test;
    return (
        <div>
         
            <div className="card rounded-none md:rounded-lg h-full bg-base-100 shadow-xl">
                <figure><img className="w-full h-72" src={image} alt="Test Image" /></figure>
                <div className="card-body">
                    <h2 className="card-title">Test Name: <span className="font-bold">{name}</span></h2>
                    <p>Test Description: <span className="font-bold">{details}</span></p>
                    <p>Available Date: <span className="font-bold">{date}</span></p>
                    <p>Available Slots: <span className="font-bold">{slots}</span></p>

                    <div className="card-actions">
                        <Link to={`/testDetails/${_id}`}><button className="btn btn-primary">Details</button></Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AllTest;