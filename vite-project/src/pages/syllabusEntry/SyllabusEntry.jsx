import "./SyllabusEntry.css";
import Card from "../../components/card/Card";
import Select, { components } from "react-select";
import { Add, ArrowDropDown, Download, Edit, Info } from "@mui/icons-material";
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
import EditPo from "./editPO/EditPo";
import EditPso from "./editPso/EditPso";
import RegulationModal from "./regulation/Regulation";
import Reference from "./references/References";
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

    const[editPoModalOpen,setEditPoModalOpen] = useState(false)
    const[editPsoModalOpen,setEditPsoModalOpen] = useState(false)

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
        },
        {
            title:"References",
            component:<Reference/>
        }
    ]);

    useEffect(() => {
        if (courses?.length > 0) {
            const newActiveStateArray = Array(courses.length).fill(Array(courseModifyOptions.length).fill(false));
            setActiveIndicatorsState(newActiveStateArray);
        }
    }, [courses]);

    useEffect(()=>{
         fetchCourses()
    },[courseModalOpen])

    useEffect(()=>{
        if(poEditSure){
            setEditPoModalOpen(true)
        }
        
      
    },[poEditSure])

    useEffect(()=>{
        if(!isRegulationModalOpen){
             fetchRegulations()
        }

    },[isRegulationModalOpen])

useEffect(()=>{
    if(editPoModalOpen){
        setPoEditSure(false)
    }
    console.log(editPoModalOpen)

},[editPoModalOpen])

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
        if(courses){
            setCourses([])
        }
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

   const handleCourseDownload = async (courseId) => {
    try {
      // Make the request to the backend API
      const response = await axios.get(`${apiHost}/report`, {
        params: { courseId: courseId ,regulationId : regulation.value,departmentId:department.value}, // Pass the courseId as a query parameter
        responseType: 'blob', // This is important if you're downloading a file
      });
  
      // Create a URL for the file download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `course_report_${courseId}.pdf`); // Set the file name
      document.body.appendChild(link);
      link.click(); // Trigger the download
      document.body.removeChild(link); // Clean up the link element
  
      console.log('Download successful');
    } catch (error) {
      console.error('Error downloading the report:', error);
      // Handle the error
    }
  };

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
                                menuPortalTarget={document.body} 
    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
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
                                menuPortalTarget={document.body} 
    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                                value={semester}
                                onChange={setSemester}
                            />
                        </div>
                        <div className="select">
                            <Select
                                options={departmentOptions}
                                placeholder={"Department"}
                                menuPortalTarget={document.body} 
    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
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
                      <div onClick={()=>{setEditPsoModalOpen(true)}}>
                  <Button size={"small"} label={<div className="iconButtonContainer"><Edit/> PSOs</div>}/>

                        </div>
                    </div>
                   
                   <div className="downloadAndEditCoursesContainer">
                   <Button size={"small"} label={
                    <div  className="iconButtonContainer">
                    <Download/>Download Department Pdf
                    </div>}/>
                   <Button onClick={()=>{setCourseModalOpen(true)}} size={"small"} label={
                    <div className="iconButtonContainer">
                    <Edit/>Edit Courses
                    </div>} />
                    
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
                                        <div onClick={()=>{handleCourseDownload(course.id)}} className="icons">
                                            <Download/>
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
                                           { React.cloneElement(courseModifyOptions[currentOpenIndicator.option].component,{courseId:course.id,regulation:regulation?.value,department:department.value})}
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
            <RegulationModal
            isRegulationModalOpen={isRegulationModalOpen}
            setRegulationModalOpen={setRegulationModalOpen}
            />
            <StyledModal
               title={"Edit Courses"}
               open={courseModalOpen}
               setOpen={setCourseModalOpen}
               content={
                <div className="courseModalContainer">
                   <Course
  key={`${department?.value}-${semester?.value}-${regulation?.value}`}
  toast={toast}
  department={department?.value}
  semester={semester?.value}
  regulation={regulation?.value}
/>

                </div>
               }
            />
            <AreYouSure content={

              <div>
                On editing POs of this Regulation
                <p className="info" ><Info/> editing this would affect the whole regulation</p>
                </div>
            } open={poEditSureModalOpen} setOpen={setPoEditSureModalOpen}
            setSure={setPoEditSure}
            
            />



            <StyledModal
            title={"Edit Programme Outcomes"}
            key={`${regulation?.value}`}
            open={editPoModalOpen}
            setOpen={setEditPoModalOpen}
            content={
            <div>
                <EditPo
                regulation={regulation?.value}
                />
                </div>}
            />
            <StyledModal
             title={"Edit Programme Specific Outcomes"}
             key={`${department?.value}`}
             open={editPsoModalOpen}
             setOpen={setEditPsoModalOpen}
             content={
                <div>
                    <EditPso
                    regulation={regulation?.value}
                    department={department?.value}
                    />
                    </div>
             }
            />
        </div>
    );
};

export default SyllabusEntry;
