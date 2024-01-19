'use client'
import React from 'react'
import Link from "next/link";

export default function Page() {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            "topic": e.target.topic.value,
            "message": e.target.message.value
        }
        fetch(apiKey + 'create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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
                    <h1>Create Task</h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label"><b>Topic</b></label>
                            <input
                                class="form-control"
                                type='text'
                                placeholder='topic...'
                                id='topic'
                                name='topic'
                            />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label"><b>Message</b></label>
                            <input
                                class="form-control"
                                type='text'
                                placeholder='message...'
                                id='message'
                                name='message'
                            />
                        </div>
                        <div class="text-end">
                            <Link type="button" class="btn btn-light me-2" href="/task">Back</Link>
                            <button type="submit" class="btn btn-info">Add task</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

