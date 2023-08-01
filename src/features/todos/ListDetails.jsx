// ListDetails.jsx
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getTodos } from '../../api/todosApi';
import Loader from '../../components/Loader';
import { IoIosArrowBack } from "react-icons/io";
import chat from "../../assets/icons/chat.svg"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const ListDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const redirecting = () => {
        navigate("/");
    };

    // Fetch the list of todos
    const { isLoading: isLoadingTodos, isError: isErrorTodos, error: errorTodos, data: todos } = useQuery('todos', getTodos);

    if (isLoadingTodos) {
        return <Loader />;
    }

    if (isErrorTodos) {
        return <p>Error: {errorTodos.message}</p>;
    }

    // Check if the todos array is defined
    if (!todos) {
        return <p>Doctor details not available</p>;
    }

    // Filter the specific doctor's details based on the id
    const doctorDetails = todos.find((todo) => todo.id.toString() === id);

    // Check if the doctor with the given id exists
    if (!doctorDetails) {
        return <p>Doctor not found</p>;
    }

    // Declare the showForm state variable
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        alert(
            `Thank you for booking an appointment, ${formData.name}! Your appointment is scheduled for ${formData.date} at ${formData.time}. We will send a confirmation email to ${formData.email}.`
        );
    };

    // Function to close the appointment form
    const handleCloseForm = () => {
        setShowForm(false);
    };

    // Render the doctor's details here
    return (
        <>
            <section className="container mx-auto mb-4">
                <div className="flex flex-row bg-gray-200 px-3 pt-4">
                    <IoIosArrowBack onClick={redirecting} className="" />
                    <img src={doctorDetails.image} alt={doctorDetails.name} className="h-full w-full" />
                </div>
                <section className="flex flex-col px-4 py-2">
                    <div>
                        <h2 className="text-xl font-medium">{doctorDetails.name}</h2>
                        <div className="flex flex-row text-gray-400 text-sm mt-2">
                            <p>{doctorDetails.field}</p>
                            <div className="p-1 w-1 h-1 rounded-full bg-gray-300 mt-2 ml-3"></div>
                            <p className="ml-2">{doctorDetails.hospitalName}</p>
                        </div>
                        <div className="mt-2">
                            <p className="text-gray-500">{doctorDetails.info}</p>
                        </div>
                        <div className="flex flex-row mt-3">
                            <div className="flex flex-col px-4">
                                <h2 className="text-lg">Experience</h2>
                                <p className="mt-2 text-blue-400 text-xl">{doctorDetails.experience} <span className="text-gray-400 text-base">yr</span></p>
                            </div>
                            <div className="flex flex-col border-l-2 border-gray-200 border-opacity-60 px-5">
                                <h2 className="text-lg">Patient</h2>
                                <p className="mt-2 text-blue-400 text-xl">{doctorDetails.patients} <span className="text-gray-400 text-base">ps</span></p>
                            </div>
                            <div className="flex flex-col border-l-2 border-gray-200 border-opacity-60 px-5">
                                <h2 className="text-lg">Rating</h2>
                                <p className="mt-2 text-blue-400 text-xl">{doctorDetails.rating}</p>
                            </div>
                        </div>
                        <div className="flex flex-row mt-5 px-1">
                            <div className="bg-blue-400 p-2 rounded-lg">
                                <img src={chat} alt="chat" className="" />
                            </div>
                            <div className="w-full ml-4">
                                {/* <button className="w-full py-3 px-6 bg-green-400 rounded-lg text-white">Make an appointment</button> */}
                                <button
                                    className="w-full py-3 px-6 bg-green-400 rounded-lg text-white"
                                    onClick={() => setShowForm(true)}
                                >
                                    Make an appointment
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Appointment form */}
                {showForm && (
                    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                        <div className="bg-white mx-4 p-5 rounded-lg">
                            <h3 className="absolute top-4 right-4 text-black font-medium" onClick={handleCloseForm}>
                                X
                            </h3>
                            <h2 className="text-xl font-medium mb-4">Book an Appointment with {doctorDetails.name}</h2>
                            <form onSubmit={handleFormSubmit}>
                                <div className="mb-4 flex flex-col">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleFormChange}
                                        className="rounded-lg bg-gray-200 p-2 outline-none"
                                        required
                                    />
                                </div>
                                <div className="mb-4 flex flex-col">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleFormChange}
                                        className="rounded-lg bg-gray-200 p-2 outline-none"
                                        required
                                    />
                                </div>
                                <div className="mb-4 flex flex-col">
                                    <label htmlFor="phone">Phone</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleFormChange}
                                        className="rounded-lg bg-gray-200 p-2 outline-none"
                                        required
                                    />
                                </div>
                                <div className="mb-4 flex flex-col">
                                    <label htmlFor="date">Date</label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleFormChange}
                                        className="rounded-lg bg-gray-200 p-2 outline-none"
                                        required
                                    />
                                </div>
                                <div className="mb-4 flex flex-col">
                                    <label htmlFor="time">Time</label>
                                    <input
                                        type="time"
                                        id="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleFormChange}
                                        className="rounded-lg bg-gray-200 p-2 outline-none"
                                        required
                                    />
                                </div>
                                <button type="submit" className="bg-green-400 text-white px-4 py-2 rounded-lg mt-2">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};

export default ListDetails;
