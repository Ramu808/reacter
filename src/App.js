// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [student, setStudent] = useState(null);
  const [message, setMessage] = useState('');

  // Function to save a student
  const saveStudent = async () => {
    try {
      const response = await fetch('https://missing-production.up.railway.app/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }) // sending only name, id is auto-generated
      });

      if (!response.ok) {
        throw new Error('Failed to save student');
      }

      const data = await response.json();
      setStudent(data);
      setMessage(`Student saved with ID: ${data.id}`);
    } catch (error) {
      console.error(error);
      setMessage('Error saving student');
    }
  };

  // Function to get a student by ID
  const getStudent = async () => {
    if (!id) {
      setMessage('Please enter a student ID');
      return;
    }

    try {
      const response = await fetch(`https://missing-production.up.railway.app/getstudent/${id}`);
      if (!response.ok) {
        throw new Error('Student not found');
      }
      const data = await response.json();
      setStudent(data);
      setMessage(`Student found: ${data.name}`);
    } catch (error) {
      console.error(error);
      setMessage('Error fetching student');
    }
  };

  return (
    <div className="App">
      <h1>Student Management</h1>

      <div style={{ marginBottom: '20px' }}>
        <h2>Add Student</h2>
        <input
          type="text"
          placeholder="Enter student name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={saveStudent}>Save Student</button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Get Student by ID</h2>
        <input
          type="number"
          placeholder="Enter student ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button onClick={getStudent}>Get Student</button>
      </div>

      {student && (
        <div>
          <h3>Student Details:</h3>
          <p>ID: {student.id}</p>
          <p>Name: {student.name}</p>
        </div>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
