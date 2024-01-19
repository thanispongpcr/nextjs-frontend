'use client'
import React, { useState, useEffect } from 'react'
import Link from "next/link";

export default function page({ params }) {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const [task, setTask] = useState({
        "id": 0,
        "topic": "",
        "message": ""
    })
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
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
                crossorigin="anonymous"
            />
            <div class="container my-4">
                <div class="text-center">
                    <h1>Edit Task</h1>
                </div>

                <div>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Topic</label>
                                <input
                                    class="form-control"
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
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Message</label>
                                <input
                                    class="form-control"
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
                                />
                            </div>

                            <div class="text-end">
                                <Link type="button" class="btn btn-light me-2" href="/task">Back</Link>
                                <button type="submit" class="btn btn-info">Add task</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
