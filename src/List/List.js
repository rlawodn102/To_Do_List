import TailBtn from "../UI/TailBtn";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function List() {
    const [tdata, setTdata] = useState([]);
    const [tags, setTags] = useState([]);
    const [editId, setEditId] = useState(null);

    const toDoDataUrl = 'http://localhost:3005/posts';

    const toDoTextRef = useRef();
    const toDoTextEditRef = useRef("");

    useEffect(() => {
        const fetchToDoData = async () => {
            const { data } = await axios.get(toDoDataUrl);

            setTdata(data);
        }

        fetchToDoData();
    }, []);

    useEffect(() => {
        let tm = tdata.map(item =>
            <tr key={item.id} className="h-10 border-b">
                <td className="text-center">
                    {editId === item.id ? (
                        <input
                            type="text"
                            ref={toDoTextEditRef}
                            defaultValue={item.todo}
                            className="form-input w-full"
                        />
                    ) : (
                        item.todo
                    )}
            </td>
                <td className="text-center">
                    {editId === item.id ? (
                    <TailBtn caption='확인'
                        bcolor='blue'
                        handleClick={() => handleEdit(item.id)} />
                    ) : (
                    <TailBtn caption='수정'
                        bcolor='blue'
                        handleClick={() => handleEditForm(item.id)} />
                    )}
                </td>
                <td className="text-center">
                    <TailBtn caption='삭제'
                        bcolor='blue'
                        handleClick={() => handleDel(item.id)} />
                </td>
            </tr>
        );

        setTags(tm);
    }, [tdata, editId])

    const handleAdd = async () => {
        if(toDoTextRef.current.value === '') {
            alert("to-do를 작성해주세요.");
            toDoTextRef.current.focus();
            return;
        }

        const todoData = {todo: toDoTextRef.current.value};

        const { data } = await axios.post(toDoDataUrl, todoData);

        setTdata([data, ...tdata]);
        
        toDoTextRef.current.value = '';
        toDoTextRef.current.focus();
    };

    const handleEditForm = (id) => {
        setEditId(id);
    }

    const handleEdit = async (id) => {
        const todoData = {todo: toDoTextEditRef.current.value};

        const { data } = await axios.put(`${toDoDataUrl}/${id}`, todoData);

        setTdata(tdata.map(item => item.id === id ? data : item));
        toDoTextEditRef.current.value = '';
        setEditId(null);
    };

    const handleDel = async (id) => {
        await axios.delete(`${toDoDataUrl}/${id}`);

        setTdata(tdata.filter(item => item.id !== id));
    };

    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <div className="w-11/12 grid grid-cols-1 md:grid-cols-7
                            bg-gray-400
                            text-center m-5 p-5">
                <div className="col-span-1 md:col-span-6 min-w-0">
                    <input type="text" ref={toDoTextRef}
                        className='form-input col-span-1 w-full'
                        placeholder='할 일을 추가해 주세요.' />
                </div>
                <TailBtn caption='추가'
                    bcolor='blue'
                    handleClick={handleAdd} />
            </div>
            <table
                className="w-11/12 text-left text-sm font-light text-surface">
                <thead
                    className="border-b border-neutral-200 font-medium">
                    <tr className="bg-black text-white font-bold text-center">
                        <th scope="col" className="px-6 py-3 w-4/6 text-center">To-do</th>
                        <th scope="col" className="px-6 py-3 w-1/6 text-center">수정</th>
                        <th scope="col" className="px-6 py-3 w-1/6 text-center">삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {tags}
                </tbody>
            </table>
        </div>
    )
}
