// ListDetails.jsx
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getTodos } from '../../api/todosApi';
import Loader from '../../components/Loader';
import { IoIosArrowBack } from "react-icons/io";
import chat from "../../assets/icons/chat.svg"
import { useNavigate } from "react-router-dom"

const ListDetails = () => {
    const { id } = useParams();
    
    const navigate = useNavigate();
    const redirecting = () => {
        navigate("/");
    }

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
                                <button className="w-full py-3 px-6 bg-green-400 rounded-lg text-white">Make an appointment</button>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </>
    );
};

export default ListDetails;
