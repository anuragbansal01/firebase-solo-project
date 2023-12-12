// ViewRecord.jsx
import React, { useEffect, useState } from 'react';
import startFirebase from '../firebase';
import { ref, onValue, remove } from 'firebase/database';
import './ViewRecord.css';
import { Link } from 'react-router-dom';

const db = startFirebase();

const ViewRecord = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dataRef = ref(db, 'formData');
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        console.log('Fetched data from Firebase:', data);

        if (data) {
          const recordsArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          console.log('Transformed records array:', recordsArray);
          setRecords(recordsArray);
        }
      });
    };

    fetchData();
  }, []);

  const handleEdit = async (id) => {
    // Edit function to edit data
    console.log('Edit record with ID:', id);
  };

  const handleDelete = async (id) => {
    // Removing record from Database
    await remove(ref(db, `formData/${id}`));
    setRecords((prevRecords) => prevRecords.filter((record) => record.id !== id));
    console.log('Record deleted with ID:', id);
  };

  return (
    <div className="form-page-body">
      <div className='form-body'>
      <h2>View Records</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Qualifications</th>
            <th>Resume</th>
            <th>Image</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.name}</td>
              <td>{record.address}</td>
              <td>{record.contact}</td>
              <td>{record.email}</td>
              <td>{record.dob}</td>
              <td>
                {record.qualifications && record.qualifications.map((qualification, index) => (
                  <div key={index}>{qualification}</div>
                ))}
              </td>
              <td>{record.resume ? 'Yes' : 'No'}</td>
              <td>{record.image ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => handleEdit(record.id)} className="edit-btn">Edit</button>
              </td>
              <td>
                <button onClick={() => handleDelete(record.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/" className='back-btn'>Back to Home</Link>
    </div>
    </div>
  );
};

export default ViewRecord;
