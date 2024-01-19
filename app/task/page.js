"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function page() {
    const [tasks, setTasks] = useState([]);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    useEffect(() => {
        fetch(apiKey)
            .then((res) => res.json())
            .then((result) => {
                console.log("result", result);
                setTasks(result);
            });
    }, []);

    const handleDelete = (id) => {
        fetch(apiKey + `delete/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
            }),
        })
            .then((res) => res.json())
            .then(() => {
                window.location.href = "/task";
            });
    };
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
                    <h1><b>Todolist</b></h1>
                </div>
                <div class="text-end mb-2">
                    <Link type="button" class="btn btn-dark" href="/task/create">
                        Create Task
                    </Link>
                </div>
                <div class="row">
                    {tasks.map((task) => (
                        <div key={task.id} class="col-sm-12 col-md-6 mt-2">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title"><b><span class="badge bg-dark">{task.topic}</span></b></h5>
                                    <p class="card-text">{task.message}</p>
                                    <div class="text-end">
                                        <Link type="button" class="btn btn-outline-warning me-2" href={"/task/edit/" + task.id}>Edit</Link>
                                        <button type="button" class="btn btn-outline-danger " onClick={() => handleDelete(task.id)}>Delete</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
