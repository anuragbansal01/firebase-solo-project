import React, { useState } from 'react';
import "./DataForm.css"
import { Link } from 'react-router-dom';
import { ref, uploadBytes } from "firebase/storage";
import { storage } from '../firebase';
import { getStorage } from "firebase/storage";
// const storage = getStorage()3
const MyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contact: '',
    email: '',
    dob: '',
    qualifications: [],
    resume: null,
    image: null,
  });

// fetch res

const storageRef = ref(storage, 'foldername');

// 'file' comes from the Blob or File API




  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleQualificationChange = (index, value) => {
    const newQualifications = [...formData.qualifications];
    newQualifications[index] = value;
    setFormData((prevData) => ({ ...prevData, qualifications: newQualifications }));
  };

  const handleAddQualification = () => {
    setFormData((prevData) => ({
      ...prevData,
      qualifications: [...prevData.qualifications, ''],
    }));
  };

  const handleRemoveQualification = (index) => {
    const newQualifications = [...formData.qualifications];
    newQualifications.splice(index, 1);
    setFormData((prevData) => ({ ...prevData, qualifications: newQualifications }));
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    console.log('File:', file); // Check if file is logged correctly
    setFormData((prevData) => ({ ...prevData, [type]: file }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const { name, address, contact, email, dob, qualifications, resume, image } = formData;
    const res = await fetch("https://react-solo-project-2-default-rtdb.firebaseio.com/formData.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        contact,
        address,
        email,
        dob,
        qualifications,
        resume,
        image,
      })
    });

    console.log('Form data saved:', formData);

    uploadBytes(storageRef, image).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });

    if (res) {
      alert("Data Saved");
    } else {
      alert("Something went wrong");
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      address: '',
      contact: '',
      email: '',
      dob: '',
      qualifications: [],
      resume: null,
      image: null,
    });
  };

  const renderImage = () => {
    if (formData.image) {
      return <img src={URL.createObjectURL(formData.image)} alt="User" />;
    } else {
      return <img src="../default-profile.png" alt="Default" />;
    }
  };

  return (
    <div className="DataForm-body">
      <div className="form-container">
        <div className="profile-img">
          {renderImage()}
        </div>

        <div className="input-container">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="input-container">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="input-container">
          <label>Contact:</label>
          <input
            type="text"
            name="contact"
            placeholder="Enter your contact number"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>

        <div className="input-container">
          <label>Email ID:</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email ID"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-container">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            placeholder="Select your date of birth"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>

        <div className="input-container qualifications">
          <div className='abcd'>
            <label>Qualifications:</label>
            <button onClick={handleAddQualification} className='qualification-btn'>+</button>
          </div>
          {formData.qualifications.map((qualification, index) => (
            <div key={index} className="qualification-container">
              <input
                type="text"
                value={qualification}
                onChange={(e) => handleQualificationChange(index, e.target.value)}
                placeholder={`Enter qualification ${index + 1}`}
              />
              <button onClick={() => handleRemoveQualification(index)} className='qualification-btn'>-</button>
            </div>
          ))}
        </div>

        <div className="input-container">
          <label>Resume:</label>
          <input type="file" onChange={(e) => handleFileChange(e, 'resume')}/>
        </div>

        <div className="input-container">
          <label>Image:</label>
          <input type="file" onChange={(e) => handleFileChange(e, 'image')} />
        </div>

        <div className="button-container">
          <button onClick={handleSave} className='save-btn'>Save Record</button>
          <button onClick={handleReset} className='delete-btn'>Delete Record</button>
        </div>
      </div>
      <Link to="/" className='back-btn'>Back to Home</Link>
    </div>
  );
};

export default MyForm;
