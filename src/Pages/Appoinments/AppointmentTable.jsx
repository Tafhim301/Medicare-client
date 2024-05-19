
import formatDate from './formatDate'; 

const AppointmentTable = ({ appointments }) => {
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Test Name</th>
                            <th>Test Date</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.length > 0 &&
                            appointments.map((appointment, idx) => (
                                <tr key={idx}>
                                    <th>{idx + 1}</th>
                                    <td>{appointment?.test_name}</td>
                                    <td>{formatDate(appointment?.date)}</td>
                                    <td><button className="btn-sm text-white bg-red-500 btn">X</button></td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AppointmentTable;
