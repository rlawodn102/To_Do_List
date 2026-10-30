import React from 'react'

export default function List() {
    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <h1>To Do List</h1>
            <div className="w-11/12 grid grid-cols-1 md:grid-cols-7
                            bg-slate-500
                            text-center m-5 p-5">
                <input type="text"
                        className='form-input p-5 m-5
                                    border'
                        placeholder='일을 추가해 주세요.'/>
                <button className='p-5 m-5'>add</button>
            </div>
        </div>
    )
}
