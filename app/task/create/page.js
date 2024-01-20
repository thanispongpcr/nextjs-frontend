'use client'
import React from 'react'
import Link from "next/link";

export default function Page() {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            "topic": e.target.topic.value,
            "message": e.target.message.value,
            "priority": e.target.priority.value,
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
            <div className="kanit-regular container my-4">
                <div className="text-center">
                    <h1><b>Create Task</b></h1>
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label"><b>Topic</b></label>
                            <input
                                className="form-control"
                                type='text'
                                placeholder='topic...'
                                id='topic'
                                name='topic'
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
                            >
                            </textarea>
                        </div>
                        <div className="mb-3">
                            <label for="priority" className="form-label"><b>Priority</b></label>
                            <select
                                className="form-select"
                                id="priority"
                                name="priority"
                            >
                                <option value="high">เร่งด่วน</option>
                                <option value="medium">ปานกลาง</option>
                                <option value="low">ไม่เร่งด่วน</option>
                            </select>
                        </div>
                        <div className="text-end">
                            <Link type="button" className="btn btn-light me-2" href="/task">Back</Link>
                            <button type="submit" className="btn btn-info">Add task</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

