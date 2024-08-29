import { useState, useEffect } from 'react';
import axios from 'axios';
import './CourseOutcome.css';
import Button from '../../../components/button/Button';
import { Add, Cancel, Check, Edit, Delete } from '@mui/icons-material';
import { TextareaAutosize, TextField } from '@mui/material';
import apiHost from '../../../../config/config';
import { useCookies } from 'react-cookie';

const CourseOutcome = ({ courseId }) => {
    const [courseOutcomes, setCourseOutcomes] = useState([]);
    const [addCourseOutcome, setAddCourseOutcome] = useState(false);
    const [editOutcome, setEditOutcome] = useState(null);
    const [cookies, setCookie] = useCookies(['auth']);
    const [newOutcome, setNewOutcome] = useState({
        course: courseId,
        course_outcome: '',
        unit: '',
        syllabus: '',
        hours: 0,
        status: '1'  // default status
    });

    useEffect(() => {
        // Fetch course outcomes from the backend
        const fetchCourseOutcomes = async () => {
            try {
                const response = await axios.get(`${apiHost}/course-outcomes/${courseId}`, {
                    headers: { auth: cookies.auth }
                });
                setCourseOutcomes(response.data);
            } catch (error) {
                console.error('Error fetching course outcomes:', error);
            }
        };

        fetchCourseOutcomes();
    }, [courseId, cookies.auth]);

    const handleAddCourseOutcome = async () => {
        try {
            if (editOutcome) {
                // Update existing course outcome
                await axios.put(`${apiHost}/course-outcomes/${editOutcome.id}`, newOutcome, {
                    headers: { auth: cookies.auth }
                });
            } else {
                // Add new course outcome
                await axios.post(`${apiHost}/course-outcomes`, newOutcome, {
                    headers: { auth: cookies.auth }
                });
            }
            setAddCourseOutcome(false);
            setEditOutcome(null);
            setNewOutcome({
                course: courseId,
                course_outcome: '',
                unit: '',
                syllabus: '',
                hours: 0,
                status: '1'
            });
            // Refresh the list
            const response = await axios.get(`${apiHost}/course-outcomes/${courseId}`, {
                headers: { auth: cookies.auth }
            });
            setCourseOutcomes(response.data);
        } catch (error) {
            console.error('Error adding/updating course outcome:', error);
        }
    };

    const handleEdit = (outcome) => {
        setEditOutcome(outcome);
        setNewOutcome({
            course: outcome.course,
            course_outcome: outcome.course_outcome,
            unit: outcome.unit,
            syllabus: outcome.syllabus,
            hours: outcome.hours,
            status: outcome.status
        });
        setAddCourseOutcome(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiHost}/course-outcomes/${id}`, {
                headers: { auth: cookies.auth }
            });
            // Refresh the list
            const response = await axios.get(`${apiHost}/course-outcomes/${courseId}`, {
                headers: { auth: cookies.auth }
            });
            setCourseOutcomes(response.data);
        } catch (error) {
            console.error('Error deleting course outcome:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewOutcome(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className='courseOutcomeContainer'>
            <div className='addCourseOutcomeButtonContainer'>
                {!addCourseOutcome ? (
                    <Button onClick={() => setAddCourseOutcome(true)} size={"small"} label={<div className='addCourseOutcomeButton'><Add /> Add Course Outcome</div>} />
                ) : (
                    <div className='addCourseOutcomeActions'>
                        <Button size={"small"} onClick={() => { setAddCourseOutcome(false); setEditOutcome(null); }} label={<div className='addCourseOutcomeActionContainer'><Cancel /> Cancel</div>} />
                        <Button size={"small"} onClick={handleAddCourseOutcome} label={<div className='addCourseOutcomeActionContainer'><Check /> {editOutcome ? 'Update' : 'Add'}</div>} />
                    </div>
                )}
            </div>
            <div className='courseOutcomeTableContainer'>
                <table>
                    <thead>
                        <tr>
                            <th>CO.no</th>
                            <th>Course Outcome</th>
                            <th>Unit</th>
                            <th>Syllabus</th>
                            <th>Hours</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {addCourseOutcome && (
                            <tr>
                                <td></td>
                                <td>
                                    <div className='textAreaContainer'>
                                        <TextareaAutosize
                                            style={{ width: "100%", fontSize: "16px" }}
                                            minRows={6}
                                            name="course_outcome"
                                            value={newOutcome.course_outcome}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className='textAreaContainer'>
                                        <TextareaAutosize
                                            style={{ width: "100%", fontSize: "16px" }}
                                            minRows={6}
                                            name="unit"
                                            value={newOutcome.unit}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div className='textAreaContainer'>
                                        <TextareaAutosize
                                            style={{ width: "100%", fontSize: "16px" }}
                                            minRows={6}
                                            name="syllabus"
                                            value={newOutcome.syllabus}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <TextField
                                        style={{ backgroundColor: "white" }}
                                        type='number'
                                        name="hours"
                                        value={newOutcome.hours}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                        )}
                        {courseOutcomes.map((data, i) => (
                            <tr key={data.id}>
                                <td>{i + 1}</td>
                                <td>{data.course_outcome}</td>
                                <td>{data.unit}</td>
                                <td>{data.syllabus}</td>
                                <td>{data.hours}</td>
                                <td>
                                    <div className='icons'>
                                    <Edit onClick={() => handleEdit(data)} />
                                    < Delete onClick={() => handleDelete(data.id)}  />
                                    </div>
                                   
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CourseOutcome;
