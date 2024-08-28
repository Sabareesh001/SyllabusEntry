import { useState, useEffect } from 'react';
import './CourseObjective.css';
import Button from '../../../components/button/Button';
import { Add, Cancel, Check, Circle, Edit } from '@mui/icons-material';
import { Input } from '@mui/material';
import axios from 'axios';
import  apiHost from '../../../../config/config'
import { useCookies } from 'react-cookie';
const CourseObjective = ({courseId}) => {
    const [courseObjectives, setCourseObjectives] = useState([]);
    const [addObjective, setAddObjective] = useState(false);
    const [addObjectiveText, setAddObjectiveText] = useState("");
    const [editObjectiveId, setEditObjectiveId] = useState(null);
    const [editObjectiveText, setEditObjectiveText] = useState("");
    const [cookies,setCookie] = useCookies(['auth'])
    // Fetch all course objectives on component mount
    useEffect(() => {
        if(courseId){
            console.log(courseId)
            axios.get(`${apiHost}/course-objectives/${courseId}`,{
                headers:{
                    auth: cookies.auth
                }
            })
                .then(response => {
                    setCourseObjectives(response.data);
                })
                .catch(error => {
                    console.error("There was an error fetching the course objectives!", error);
                });
        }
       
    }, [cookies.auth,courseId]);

    // Add new course objective
    const handleAddObjective = () => {
        axios.post(`${apiHost}/course-objectives`, { course: courseId, objective: addObjectiveText, status: '1' },{
            headers:{
                auth: cookies.auth
            }
        })
            .then(response => {
                setCourseObjectives([...courseObjectives, { id: response.data.id, objective: addObjectiveText }]);
                setAddObjective(false);
                setAddObjectiveText("");
            })
            .catch(error => {
                console.error("There was an error adding the course objective!", error);
            });
    };

    // Delete course objective
    const handleDeleteObjective = (id) => {
        axios.delete(`${apiHost}/course-objectives/${id}`,{ headers:{
            auth: cookies.auth
        }})
            .then(() => {
                setCourseObjectives(courseObjectives.filter(obj => obj.id !== id));
            })
            .catch(error => {
                console.error("There was an error deleting the course objective!", error);
            });
    };

    // Edit course objective
    const handleEditObjective = (id) => {
        axios.put(`${apiHost}/course-objectives/${id}`, { objective: editObjectiveText },{
            headers:{
                auth: cookies.auth
            }
        })
            .then(() => {
                setCourseObjectives(courseObjectives.map(obj => 
                    obj.id === id ? { ...obj, objective: editObjectiveText } : obj
                ));
                setEditObjectiveId(null);
                setEditObjectiveText("");
            })
            .catch(error => {
                console.error("There was an error editing the course objective!", error);
            });
    };

    return (
        <div className='courseObjectiveContainer'>
            <div className='addCourseObjectiveButtonContainer'>
                <Button onClick={() => setAddObjective(true)} size={"small"} label={<div className='addObjectiveButton'><Add /> Add Objective</div>} />
            </div>
            <div className='objectivesListContainer'>
                {addObjective &&
                    <div className='addObjectiveContainer'>
                        <div className='circleAndObjective'>
                            <Circle />
                            <Input
                                autoFocus
                                value={addObjectiveText}
                                onChange={(e) => setAddObjectiveText(e.target.value)}
                                fullWidth
                            />
                        </div>
                        <div className='cancelRemoveIconContainer'>
                            <Cancel onClick={() => {
                                setAddObjective(false);
                                setAddObjectiveText("");
                            }} />
                            <Check onClick={handleAddObjective} />
                        </div>
                    </div>
                }
                {courseObjectives.map((data) => (
                    <div key={data.id} className='objectiveContainer'>
                        <div className='circleAndObjective'>
                            <Circle />
                            {editObjectiveId === data.id ? (
                                <Input
                                    autoFocus
                                    value={editObjectiveText}
                                    onChange={(e) => setEditObjectiveText(e.target.value)}
                                    fullWidth
                                />
                            ) : (
                                <p>{data.objective}</p>
                            )}
                        </div>
                        <div className='cancelRemoveIconContainer'>
                            {editObjectiveId === data.id ? (
                                <>
                                    <Cancel onClick={() => setEditObjectiveId(null)} />
                                    <Check onClick={() => handleEditObjective(data.id)} />
                                </>
                            ) : (
                                <>
                                    <Cancel onClick={() => handleDeleteObjective(data.id)} />
                                    <Edit onClick={() => {
                                        setEditObjectiveId(data.id);
                                        setEditObjectiveText(data.objective);
                                    }} />
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseObjective;
