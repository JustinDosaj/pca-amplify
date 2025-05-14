"use client";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import React from "react";

const customToastStyle = {
    backgroundColor: '#ffffff',
    color: '#0f172a',
    borderRadius: '0.375rem',
    border: '1px solid #4b5563',
    padding: '1rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const ToastProvider = () => (
    <ToastContainer
        toastStyle={customToastStyle}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        theme="light"
    />
);

export default ToastProvider; 