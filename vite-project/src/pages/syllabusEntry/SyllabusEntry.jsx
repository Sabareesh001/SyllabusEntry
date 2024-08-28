import "./SyllabusEntry.css";
import Card from "../../components/card/Card";
import Select, { components } from "react-select";
import { Add, ArrowDropDown, Edit, Info } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import StyledModal from '../../components/modal/StyledModal';
import axios from "axios";
import { useCookies } from "react-cookie";
import apiHost from "../../../config/config";
import Indicator from "../../components/indicator/Indicator";
import NoData from '../../components/noData/NoData';
import Button from "../../components/button/Button";
import AreYouSure from '../../components/areYouSure/AreYouSure'
import ProgrammeSpecificOutcome from "./programmeSpecificOutcome/ProgrammeSpecificOutcome";
import CourseObjective from "./courseObjective/CourseObjective";
import CourseOutcome from "./courseOutcome/CourseOutCome";
import ProgrammeOutcome from "./programmeOutcome/ProgrammeOutcome";
import Course from "./course/Course";
import 'react-toastify/dist/ReactToastify.css';
import {toast,ToastContainer} from 'react-toastify'
const SyllabusEntry = () => {
    const [isRegulationModalOpen, setRegulationModalOpen] = useState(false);
    const [fromYear, setFromYear] = useState(null);
    const [cookies] = useCookies(['auth']);

    const [regulationOptions, setRegulationOptions] = useState([]);
    const [regulation, setRegulation] = useState(null);


    const [semesterOptions, setSemesterOptions] = useState([]);
    const [semester, setSemester] = useState(null);

    const [departmentOptions, setDepartmentOptions] = useState([]);
    const [department, setDepartment] = useState(null);

    const [poEditSureModalOpen,setPoEditSureModalOpen] = useState(false)
    const [poEditSure,setPoEditSure] = useState(false)

    const [courseModalOpen,setCourseModalOpen] = useState(false)

    const [courses, setCourses] = useState([
        // { courseName: "Mathematics - I", courseCode: "22MA101", courseId: 1 },
        // { courseName: "Mathematics - I", courseCode: "22MA101", courseId: 1 },
        // { courseName: "Mathematics - I", courseCode: "22MA101", courseId: 1 }
    ]);

    const [activeIndicatorsState, setActiveIndicatorsState] = useState([[]]);

    const [currentOpenIndicator,setCurrentOpenIndicator] = useState(null)

    const [courseModifyOptions] = useState([
        {
            title: "Course Objectives",
            component : <CourseObjective/>
        }
            ,
            {
                title:"Course Outcomes",
                component:<CourseOutcome/>
            }
        ,
        {
            title:"POs",
            component:<ProgrammeOutcome/>

        },
        {
            title:"PSOs",
            component:<ProgrammeSpecificOutcome/>
        }
    ]);

    useEffect(() => {
        if (courses?.length > 0) {
            const newActiveStateArray = Array(courses.length).fill(Array(4).fill(false));
            setActiveIndicatorsState(newActiveStateArray);
        }
    }, [courses]);

    useEffect(()=>{
         fetchCourses()
    },[courseModalOpen])

    const fetchCourses = () => {
        try {
          if (department && semester && regulation) {
            axios.get(`${apiHost}/courses`, {
              params: {
                department:department.value,
                semester:semester.value,
                regulation:regulation.value
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
    

    const fetchRegulations = async () => {
        try {
            const res = await axios.get(`${apiHost}/regulations`, {
                headers: { auth: cookies.auth }
            });
            const modifiedOptions = res.data.map((data) => ({
                value: data.id,
                label: data.regulation
            }));
            setRegulationOptions(modifiedOptions);
        } catch (error) {
            console.error(error);
        }
    };



    const fetchSemesters = async () => {
        try {
            const res = await axios.get(`${apiHost}/semesters`, {
                headers: { auth: cookies.auth }
            });
            const modifiedOptions = res.data.map((data) => ({
                value: data.id,
                label: data.semester
            }));
            setSemesterOptions(modifiedOptions);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDepartments = async () => {
        try {
            const res = await axios.get(`${apiHost}/departments`, {
                headers: { auth: cookies.auth }
            });
            const modifiedOptions = res.data.map((data) => ({
                value: data.id,
                label: data.department
            }));
            setDepartmentOptions(modifiedOptions);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchDepartments();
        fetchRegulations();
        fetchSemesters();
    }, [cookies.auth]);

    useEffect(() => {
        console.log(activeIndicatorsState);
    }, [activeIndicatorsState]);

    const handleModifyOptionsClick = (courseIndex, optionIndex) => {
        if(activeIndicatorsState[courseIndex][optionIndex]){
            setActiveIndicatorsState((prev) => 
                prev.map((course, i) =>
                    i === courseIndex
                        ? course.map((opt, j) => false)
                        : course.map((opt)=>false)
                )
            );
            setCurrentOpenIndicator(null)
            return
        }
        setCurrentOpenIndicator({course: courseIndex,option : optionIndex})
        setActiveIndicatorsState((prev) => 
            prev.map((course, i) =>
                i === courseIndex
                    ? course.map((opt, j) => j === optionIndex)
                    : course.map((opt)=>false)
            )
        );
    };
   useEffect(()=>{
    console.log(regulation)
   },[regulation])
    return (
        <div className="syllabusEntryPageContainer">
            <ToastContainer/>
            <Card
                content={
                    <div className="selectContainer">
                        <div className="select">
                            <Select
                                options={regulationOptions}
                                value={regulation}
                                onChange={setRegulation}
                                placeholder={"Regulation"}
                            />
                            <div onClick={() => setRegulationModalOpen(true)} className="newRegulationContainer">
                                <Info /> New Regulation?
                            </div>
                        </div>
                        <div className="select">
                            <Select
                                options={semesterOptions}
                                placeholder={"Semester"}
                                value={semester}
                                onChange={setSemester}
                            />
                        </div>
                        <div className="select">
                            <Select
                                options={departmentOptions}
                                placeholder={"Department"}
                                value={department}
                                onChange={setDepartment}
                            />
                        </div>
                    </div>
                }
            />

            {(department && regulation  && semester) || courses.length > 0 ? (
                <div className="addCoursesButtonContainer">
                  <div className="poPsoEditContainer">
                    <div onClick={()=>{setPoEditSureModalOpen(true)}}>
                  <Button size={"small"} label={<div className="iconButtonContainer"><Edit/> POs</div>}/>
                      </div>
                  <Button size={"small"} label={<div className="iconButtonContainer"><Edit/> PSOs</div>}/>
                    </div>
                   
                   <div>
                   <Button onClick={()=>{setCourseModalOpen(true)}} size={"small"} label={<div className="iconButtonContainer"><Edit/>Edit Courses</div>} />
                    </div>
                </div>
            ) : null}

            {courses.length > 0 ? (
                courses.map((course, index) => (
                    <div key={course.courseId}>
                        <Card
                            content={
                                <div className="courseContainer">
                                    <div className="courseDetailsContainer">
                                        <div className="courseDetails">
                                            <p>{course.course_code}</p>
                                            <p>{course.course_name}</p>
                                        </div>
                                        <div>
                                            <ArrowDropDown />
                                        </div>
                                    </div>
                                    <div className="courseStateIndicatorContainer">
                                        {courseModifyOptions.map((option, i) => (
                                            <div
                                                key={i}
                                                onClick={() => handleModifyOptionsClick(index, i)}
                                            >
                                                <Indicator
                                                    active={
                                                        activeIndicatorsState.length > 0 &&
                                                        activeIndicatorsState[index]
                                                            ? activeIndicatorsState[index][i]
                                                            : false
                                                    }
                                                    label={option.title}
                                                />
                                             
                                            </div>
                                        ))}
                                    
                                    </div>
                                    {
                                            (currentOpenIndicator && index  == currentOpenIndicator.course) && 
                                            <div>
                                           { React.cloneElement(courseModifyOptions[currentOpenIndicator.option].component,{courseId:course.id,regulation:regulation?.value})}
                                            </div>
                                        }
                                </div>
                            }
                        />
                    </div>
                ))
            ) : (
                <NoData />
            )}

            <StyledModal
                title={"Create New Regulation"}
                setOpen={setRegulationModalOpen}
                open={isRegulationModalOpen}
                content={
                    <div className="datePickerContainer">
                        <div>
                            <p>Select Regulation Year</p>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    value={fromYear}
                                    onChange={setFromYear}
                                    views={["year"]}
                                    openTo="year"
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                }
            />
            <StyledModal
               title={"Edit Courses"}
               open={courseModalOpen}
               setOpen={setCourseModalOpen}
               content={
                <div className="courseModalContainer">
                    <Course
                    toast={toast}
                     department={department?.value}
                       semester={semester?.value} 
                      regulation={regulation?.value}/>
                </div>
               }
            />
            <AreYouSure content={

              <div>
                On editing POs of this Regulation
                <p className="info" ><Info/> editing this would affect the whole regulation</p>
                </div>
            } open={poEditSureModalOpen} setOpen={setPoEditSureModalOpen}/>
        </div>
    );
};

export default SyllabusEntry;
