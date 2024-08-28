import { Add, Cancel, Check, Edit, Delete } from '@mui/icons-material';
import Button from '../../../components/button/Button';
import './Course.css';
import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import apiHost from '../../../../config/config';

const Course = ({ regulation, department, semester, toast }) => {
  const [addCourse, setAddCourse] = useState(false);
  const [cookies, setCookie] = useCookies(['auth']);
  const [addCourseDetails, setAddCourseDetails] = useState({
    course_name: '',
    course_code: '',
    lecture: '',
    tutorial: '',
    practical: '',
    credit: ''
  });
  const [courses, setCourses] = useState([]);
  const [editCourseId, setEditCourseId] = useState(null);
  const [editCourseDetails, setEditCourseDetails] = useState({
    course_name: '',
    course_code: '',
    lecture: '',
    tutorial: '',
    practical: '',
    credit: ''
  });

  const handleAddCourse = async () => {
    setAddCourse(false);
    await addCourseFunc();
    setAddCourseDetails({
      course_name: '',
      course_code: '',
      lecture: '',
      tutorial: '',
      practical: '',
      credit: ''
    });
  };

  const handleEditCourse = async () => {
    if (!editCourseId) return;

    try {
      axios.put(`${apiHost}/courses/${editCourseId}`, {
        ...editCourseDetails,
        department,
        regulation,
        semester
      }, {
        headers: {
          auth: cookies.auth
        }
      }).then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          fetchCourses();  // Refresh the course list after edit
        } else {
          toast.error(res.data.message);
        }
        setEditCourseId(null);
      });
    } catch (error) {
      toast.error(error);
    }
  };
  const  addCourseFunc = async()=>{
    let hasEmptyValue = false
     Object.values(addCourseDetails).map((value)=>{
         if(value.trim()===''){
          hasEmptyValue = true;
            return
         }
     })
     if(hasEmptyValue){
        return toast.error("Please Fill All the Values")
     } 
      try {
          axios.post(`${apiHost}/courses`,{
              ...addCourseDetails,
              department:department,
              regulation:regulation,
              semester:semester
          },{
              headers:{
                  auth : cookies.auth
              }
          }).then((res)=>{
              if(res.status ===  201){
                  toast.success(res.data.message)
                  fetchCourses()
              }
              else{
                  toast.error(res.data.message)
              }
          })
      } catch (error) {
          toast.error(error)
      }
}
  const handleDeleteCourse = async (id) => {
    try {
      axios.delete(`${apiHost}/courses/${id}`, {
        headers: {
          auth: cookies.auth
        }
      }).then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          fetchCourses();  // Refresh the course list after delete
        } else {
          toast.error(res.data.message);
        }
      });
    } catch (error) {
      toast.error(error);
    }
  };

  const fetchCourses = () => {
    try {
      if (department && semester && regulation) {
        axios.get(`${apiHost}/courses`, {
          params: {
            department,
            semester,
            regulation
          },
          headers: {
            auth: cookies.auth
          }
        }).then((res) => {
          if (res.data) {
            setCourses(res.data);
          }
        });
      }
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    if (regulation && semester && department) {
      fetchCourses();
    }
  }, [regulation, semester, department]);

  return (
    <div className='courseModifyContainer'>
      <div className='editOptionsContainer'>
        {!addCourse ? (
          <Button
            size={"small"}
            onClick={() => setAddCourse(true)}
            label={<div className='iconButtonContainer'><Add />Add Course</div>}
          />
        ) : (
          <div className='cancelAndCheckContainer'>
            <Button
              size={"small"}
              onClick={() => setAddCourse(false)}
              label={<div className='iconButtonContainer'><Cancel />Cancel</div>}
            />
            <Button
              size={"small"}
              onClick={handleAddCourse}
              label={<div className='iconButtonContainer'><Check />Add</div>}
            />
          </div>
        )}
      </div>
      <div className='courseModifyTableContainer'>
        <table>
          <thead>
            <tr>
              <th>S.no</th>
              <th>Course Code</th>
              <th>Course Name</th>
              <th>L</th>
              <th>T</th>
              <th>P</th>
              <th>C</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {addCourse && (
              <tr>
                <td></td>
                <td>
                  <TextField
                    value={addCourseDetails.course_code}
                    onChange={(e) =>
                      setAddCourseDetails(prev => ({ ...prev, course_code: e.target.value }))
                    }
                    style={{ maxWidth: "200px" }}
                    size='small'
                  />
                </td>
                <td>
                  <TextField
                    value={addCourseDetails.course_name}
                    onChange={(e) =>
                      setAddCourseDetails(prev => ({ ...prev, course_name: e.target.value }))
                    }
                    style={{ maxWidth: "200px" }}
                    size='small'
                  />
                </td>
                <td>
                  <TextField
                    value={addCourseDetails.lecture}
                    onChange={(e) =>
                      setAddCourseDetails(prev => ({ ...prev, lecture: e.target.value }))
                    }
                    style={{ maxWidth: "100px" }}
                    size='small'
                    type='number'
                  />
                </td>
                <td>
                  <TextField
                    value={addCourseDetails.tutorial}
                    onChange={(e) =>
                      setAddCourseDetails(prev => ({ ...prev, tutorial: e.target.value }))
                    }
                    style={{ maxWidth: "100px" }}
                    size='small'
                    type='number'
                  />
                </td>
                <td>
                  <TextField
                    value={addCourseDetails.practical}
                    onChange={(e) =>
                      setAddCourseDetails(prev => ({ ...prev, practical: e.target.value }))
                    }
                    style={{ maxWidth: "100px" }}
                    size='small'
                    type='number'
                  />
                </td>
                <td>
                  <TextField
                    value={addCourseDetails.credit}
                    onChange={(e) =>
                      setAddCourseDetails(prev => ({ ...prev, credit: e.target.value }))
                    }
                    style={{ maxWidth: "100px" }}
                    size='small'
                    type='number'
                  />
                </td>
                <td></td>
              </tr>
            )}
            {courses.map((data, i) => (
              <tr key={data.id}>
                <td>{i + 1}</td>
                <td>
                  {editCourseId === data.id ? (
                    <TextField
                      value={editCourseDetails.course_code}
                      onChange={(e) =>
                        setEditCourseDetails(prev => ({ ...prev, course_code: e.target.value }))
                      }
                      style={{ maxWidth: "200px" }}
                      size='small'
                    />
                  ) : (
                    data.course_code
                  )}
                </td>
                <td>
                  {editCourseId === data.id ? (
                    <TextField
                      value={editCourseDetails.course_name}
                      onChange={(e) =>
                        setEditCourseDetails(prev => ({ ...prev, course_name: e.target.value }))
                      }
                      style={{ maxWidth: "200px" }}
                      size='small'
                    />
                  ) : (
                    data.course_name
                  )}
                </td>
                <td>
                  {editCourseId === data.id ? (
                    <TextField
                      value={editCourseDetails.lecture}
                      onChange={(e) =>
                        setEditCourseDetails(prev => ({ ...prev, lecture: e.target.value }))
                      }
                      style={{ maxWidth: "100px" }}
                      size='small'
                      type='number'
                    />
                  ) : (
                    data.lecture
                  )}
                </td>
                <td>
                  {editCourseId === data.id ? (
                    <TextField
                      value={editCourseDetails.tutorial}
                      onChange={(e) =>
                        setEditCourseDetails(prev => ({ ...prev, tutorial: e.target.value }))
                      }
                      style={{ maxWidth: "100px" }}
                      size='small'
                      type='number'
                    />
                  ) : (
                    data.tutorial
                  )}
                </td>
                <td>
                  {editCourseId === data.id ? (
                    <TextField
                      value={editCourseDetails.practical}
                      onChange={(e) =>
                        setEditCourseDetails(prev => ({ ...prev, practical: e.target.value }))
                      }
                      style={{ maxWidth: "100px" }}
                      size='small'
                      type='number'
                    />
                  ) : (
                    data.practical
                  )}
                </td>
                <td>
                  {editCourseId === data.id ? (
                    <TextField
                      value={editCourseDetails.credit}
                      onChange={(e) =>
                        setEditCourseDetails(prev => ({ ...prev, credit: e.target.value }))
                      }
                      style={{ maxWidth: "100px" }}
                      size='small'
                      type='number'
                    />
                  ) : (
                    data.credit
                  )}
                </td>
                <td>
                  {editCourseId === data.id ? (
                    <div className='cancelAndCheckContainer'>
                      <Button
                        size={"small"}
                        onClick={() => setEditCourseId(null)}
                        label={<div className='iconButtonContainer'><Cancel />Cancel</div>}
                      />
                      <Button
                        size={"small"}
                        onClick={handleEditCourse}
                        label={<div className='iconButtonContainer'><Check />Save</div>}
                      />
                    </div>
                  ) : (
                    <div className='editDeleteContainer'>
                         <div className='cancelAndCheckContainer'>
                      <Edit
                        size={"small"}
                        onClick={() => {
                          setEditCourseId(data.id);
                          setEditCourseDetails({
                            course_name: data.course_name,
                            course_code: data.course_code,
                            lecture: data.lecture,
                            tutorial: data.tutorial,
                            practical: data.practical,
                            credit: data.credit
                          });
                        }}
                   
                      />
                      <Delete
                        
                        onClick={() => handleDeleteCourse(data.id)}
                        
                      />
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Course;
