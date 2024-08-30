import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apiHost from '../../../../config/config';
import './References.css';
import Button from '../../../components/button/Button';

const Reference = ({ courseId }) => {
  const [courseDetails, setCourseDetails] = useState({
    References: ''
  });

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${apiHost}/coursesById`,{
            params:{
                id:courseId
            }
        });
        const courseData = response.data; // Assuming the data structure matches your state
console.log(courseData[0])
        // Update state with fetched course details
        setCourseDetails({
          References: courseData[0].References || ''
          // Add other fields similarly if needed
        });
      } catch (error) {
        console.error('Error fetching course details:', error.response?.data?.error || error.message);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  const handleChange = (e) => {
    setCourseDetails({ ...courseDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`${apiHost}/courses/${courseId}`, courseDetails);
      alert(response.data.message);
    } catch (error) {
      console.error('Error updating course:', error.response?.data?.error || error.message);
      alert('Error updating course. Check console for details.');
    }
  };

  return (
    <div className="container">
      <textarea
        name="References"
        value={courseDetails.References}
        onChange={handleChange}
        placeholder="References"
      ></textarea>
      {/* Add more fields similarly for other course details if needed */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Button size={"small"} onClick={handleSubmit} label={"Submit"}></Button>
      </div>
    </div>
  );
};

export default Reference;
