"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Page() {
    const [tasks, setTasks] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    const [statusCounts, setStatusCounts] = useState({});

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    useEffect(() => {
        fetch(apiKey)
            .then((res) => res.json())
            .then((result) => {
                console.log("result", result);
                setTasks(result);

                // คำนวณจำนวน Task แต่ละ Status
                const counts = result.reduce((acc, task) => {
                    acc[task.status] = (acc[task.status] || 0) + 1;
                    return acc;
                }, {});
                setStatusCounts(counts);
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
    const formatToThaiTime = (dateString) => {
        const options = {
            timeZone: "Asia/Bangkok",
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        };
        return new Date(dateString).toLocaleString("th-TH", options);
    };

    const filteredTasks = tasks.filter((task) => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        return (
            task.topic.toLowerCase().includes(searchTermLowerCase)
        );
    });
    
    return (
        <div>
            <div className="kanit-regular container my-4">
                <div className="text-center">
                    <h1><b>Todolist</b></h1>
                </div>
                <div className="text-end mb-2">
                    <Link type="button" className="btn btn-light" href="/task/create">
                        เพิ่มรายการ
                    </Link>
                </div>

                <div className="row">
                    <div className="col-md-9">
                        <ul class="nav nav-underline">
                            <li class="nav-item">
                                <a class="nav-link active">รวม ({tasks.length})</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active">รอดำเนินการ ({statusCounts.todo || 0})</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active">กำลังดำเนินการ ({statusCounts.in_progress || 0})</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active">เสร็จสิ้น ({statusCounts.done || 0})</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3 d-flex align-items-center justify-content-end mt-1">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="ค้นหารายการ"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="row">
                    {filteredTasks.map((task) => (
                        <div key={task.id} className="col-sm-12 col-md-12 mt-2">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-9">
                                            <h2 className={`card-title ${task.status === 'done' ? 'strikethrough-text' : ''}`}>
                                                <b>{task.topic}</b>
                                            </h2>
                                        </div>
                                        <div className="col-md-3 text-end">
                                            <span className="badge text-bg-light">
                                               สถานะ: <i><u>{task.status === 'todo' ? 'รอดำเนินการ' : task.status === 'in_progress' ? 'กำลังดำเนินการ' : 'เสร็จสิ้น'}</u></i>
                                            </span>
                                        </div>
                                    </div>
                                    <p className="card-text">
                                        <b>
                                            <span className={`badge ${task.priority === 'high' ? 'bg-danger' : task.priority === 'medium' ? 'bg-warning text-black' : 'bg-success'} me-1`}>
                                                <i><u>{task.priority === 'high' ? 'เร่งด่วน' : task.priority === 'medium' ? 'ปานกลาง' : 'ไม่เร่งด่วน'}</u></i>
                                            </span>
                                            <span className="badge bg-secondary text-black">สร้าง: {formatToThaiTime(task.created_at)} น.</span>
                                            {task.created_at !== task.updated_at && (
                                                <span className="ms-1 badge bg-secondary text-black">แก้ไขล่าสุด: {formatToThaiTime(task.updated_at)} น.</span>
                                            )}

                                        </b>
                                    </p>
                                    <p className={`card-title ${task.status === 'done' ? 'strikethrough-text' : ''}`}>
                                        {task.message}
                                    </p>
                                    <div className="text-end">
                                        <Link type="button" className="btn btn-outline-warning me-2" href={"/task/edit/" + task.id}>Edit</Link>
                                        <button type="button" className="btn btn-outline-danger " onClick={() => handleDelete(task.id)}>Delete</button>
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
