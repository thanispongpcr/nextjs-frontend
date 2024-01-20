'use client'
import React, { useState, useEffect } from 'react'
import Link from "next/link";

export default function Page({ params }) {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const [task, setTask] = useState({})
    useEffect(() => {
        fetch(apiKey + 'listone/' + params.id)
            .then(res => res.json())
            .then(result => {
                console.log(result);
                setTask(result)
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(task);
        fetch(apiKey + 'update/' + params.id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(res => res.json())
            .then(() => {
                window.location.href = '/task'
            })
    }
    return (
        <div>
            <div className="kanit-regular container my-4">
                <div className="text-center">
                    <h1><b>Edit Task</b></h1>
                </div>

                <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label"><b>Topic</b></label>
                                <input
                                    className="form-control"
                                    type='text'
                                    placeholder='topic...'
                                    id='topic'
                                    name='topic'
                                    value={task.topic}
                                    onChange={(e) => {
                                        setTask((task) => ({
                                            ...task,
                                            topic: e.target.value
                                        }))
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label for="exampleInputEmail1" className="form-label"><b>Message</b></label>
                                <textarea
                                    className="form-control"
                                    type='text'
                                    placeholder='message...'
                                    id='message'
                                    name='message'
                                    value={task.message}
                                    onChange={(e) => {
                                        setTask((task) => ({
                                            ...task,
                                            message: e.target.value
                                        }))
                                    }}
                                ></textarea>
                            </div>
                            <div className='row'>
                                <div className="mb-3 col-md-6">
                                    <label for="priority" className="form-label"><b>Priority</b></label>
                                    <select
                                        className="form-select"
                                        id="priority"
                                        name="priority"
                                        value={task.priority} // กำหนดค่าปัจจุบัน
                                        onChange={(e) => {
                                            setTask((task) => ({
                                                ...task,
                                                priority: e.target.value
                                            }))
                                        }}
                                    >
                                        <option value="high">เร่งด่วน</option>
                                        <option value="medium">ปานกลาง</option>
                                        <option value="low">ไม่เร่งด่วน</option>
                                    </select>
                                </div>
                                <div className="mb-3 col-md-6">
                                    <label for="status" className="form-label"><b>Status</b></label>
                                    <select
                                        className="form-select"
                                        id="status"
                                        name="status"
                                        value={task.status} // กำหนดค่าปัจจุบัน
                                        onChange={(e) => {
                                            setTask((task) => ({
                                                ...task,
                                                status: e.target.value
                                            }))
                                        }}
                                    >
                                        <option value="todo">รอดำเนินการ</option>
                                        <option value="in_progress">กำลังดำเนินการ</option>
                                        <option value="done">เสร็จสิ้น</option>
                                    </select>
                                </div>
                            </div>
                            <div className="text-end">
                                <Link type="button" className="btn btn-light me-2" href="/task">Back</Link>
                                <button type="submit" className="btn btn-info">Edit task</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
