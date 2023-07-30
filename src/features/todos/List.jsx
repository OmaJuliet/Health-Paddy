import { useQuery, useQueryClient } from 'react-query'
import { getTodos } from "../../api/todosApi"
import Loader from '../../components/Loader'
import Category from '../../components/Category'
import { Link } from 'react-router-dom';
import star from "../../assets/icons/star.svg"

const List = () => {
    const queryClient = useQueryClient()

    const {
        isLoading,
        isError,
        error,
        data: todos
    } = useQuery('todos', getTodos)


    const newItemSection = (
        <form className="">
            <div className="new-todo">
                <input
                    type="text"
                    className="w-full text-lg bg-gray-200 px-2 py-3 rounded-lg outline-none"
                    placeholder="Search for a doctor"
                />
            </div>
        </form>
    )

    let content
    if (isLoading) {
        content = <Loader />
    } else if (isError) {
        content = <p>{error.message}</p>
    } else {
        content = todos.map((todo) => {
            return (
                <section className="flex flex-col" key={todo.id} >
                    <article className="mb-5">
                        <div className="flex flex-row">
                            <div className="bg-gray-200 rounded-lg p-1 w-20 h-20">
                                <img src={todo.image} className="h-auto" alt="" />
                            </div>
                            <div className="flex flex-col pl-4">
                                <Link to={`/list/${todo.id}`}>
                                    <p className="font-medium text-lg">{todo.name}</p>
                                </Link>
                                <div className="flex flex-row text-gray-400 text-sm">
                                    <p>{todo.field}</p>
                                    <div className="p-1 w-1 h-1 rounded-full bg-gray-300 mt-2 ml-3"></div>
                                    <p className="ml-2">{todo.hospitalName}</p>
                                </div>
                                <div className="mt-2 flex flex-row justify-between">
                                    <div className="flex flex-row">
                                        <div className="flex">
                                            <img src={star} alt="star" />
                                            <img src={star} alt="star" />
                                            <img src={star} alt="star" />
                                            <img src={star} alt="star" />
                                            <img src={star} alt="star" />
                                        </div>
                                        <p className="text-gray-400 ml-2 mt-1">{todo.patients}</p>
                                    </div>
                                    {/* <Link to={`/list/${todo.id}`} className="bg-green-200 text-green-500 px-3 py-1 rounded-lg">
                                        Open
                                    </Link> */}
                                </div>
                            </div>
                        </div>
                    </article>
                </section>
            )
        })
    }


    // const { isLoading, isError, error, data: todos } = useQuery('todos', getTodos);

    // if (isLoading) {
    //     return <Loader />;
    // }

    // if (isError) {
    //     return <p>Error: {error.message}</p>;
    // }

    return (
        <main>
            <section className="flex flex-col px-4 mt-6">
                <h1 className="text-3xl mb-4">Find <span className="text-gray-400">your doctor</span></h1>
                {newItemSection}
            </section>
            <section className="px-4 my-4">
                <Category />
            </section>
            <section className="flex flex-row justify-between px-4">
                <h1 className="text-xl font-medium">Top Doctors</h1>
                <p>View all</p>
            </section>
            <section className="px-4 my-5">
                {content}
            </section>
        </main>
        // <main>
        //     {todos.map((todo) => (
        //         <section className="flex flex-col" key={todo.id} >
        //             <article className="mb-5">
        //                 <div className="flex flex-row">
        //                     <div className="bg-gray-200 rounded-lg p-1 w-20 h-20">
        //                         <img src={todo.image} className="h-auto" alt="" />
        //                     </div>
        //                     <div className="flex flex-col pl-4">
        //                         <p className="font-medium text-lg">{todo.name}</p>
        //                         <div className="flex flex-row text-gray-400 text-sm">
        //                             <p>{todo.field}</p>
        //                             <div className="p-1 w-1 h-1 rounded-full bg-gray-300 mt-2 ml-3"></div>
        //                             <p className="ml-2">{todo.hospitalName}</p>
        //                         </div>
        //                         <div className="mt-2 flex flex-row justify-between">
        //                             <div className="flex flex-row">
        //                                 <p>{todo.rating}</p>
        //                                 <p className="text-gray-400 ml-2">{todo.patients}</p>
        //                             </div>
        //                             <Link to={`/list/${todo.id}`} className="bg-green-200 text-green-500 px-3 py-1 rounded-lg">
        //                                 Open
        //                             </Link>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </article>
        //         </section>
        //     ))}
        // </main>
    )
}

export default List