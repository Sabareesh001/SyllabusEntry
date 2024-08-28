import "./SyllabusEntry.css";
import Card from "../../components/card/Card";
import Select from "react-select";
import { Info } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import StyledModal from '../../components/modal/StyledModal'
import axios from "axios";
import { useCookies } from "react-cookie";
import apiHost from "../../../config/config";
import NoData from  '../../components/noData/NoData'
import Button from "../../components/button/Button";
const SyllabusEntry = () => {
    const [isRegulationModalOpen,setRegulationModalOpen]= useState(false)
    const [fromYear,setFromYear] = useState(null)
    const [cookies,setCookie] = useCookies(['auth'])

    const [regulationOptions,setRegulationOptions] = useState([])
    const [regulation,setRegulation] = useState(null)

    const [yearOptions,setYearOptions] = useState([])
    const [year,setYear] = useState(null)

    const [semesterOptions,setSemesterOptions] = useState([])
    const [semester,setSemester] = useState(null)

    const [departmentOptions,setDepartmentOptions] = useState([])
    const [department,setDepartment] = useState(null)

    const [courses,setCourses] = useState([
{
  courseName : "Mathematics - I",
  courseCode : "22MA101",
  courseId : 1
}

    ])

   const fetchRegualations = async()=>{
     try {
        axios.get(`${apiHost}/regulations`,{
            headers:{
                auth:cookies.auth
            }
        }).then((res)=>{
            const modifiedOptions = res.data.map((data)=>({
                value:data.id,
                label:data.regulation
            }))
            setRegulationOptions(modifiedOptions)
        })
     } catch (error) {
        
     }
   }
   const fetchYears = async()=>{
    try {
        axios.get(`${apiHost}/years`,{
            headers:{
                auth:cookies.auth
            }
        }).then((res)=>{
            const modifiedOptions = res.data.map((data)=>({
                value:data.id,
                label:data.year
            }))
            setYearOptions(modifiedOptions)
        })
     } catch (error) {
        
     }
   }
   const fetchSemsters = async()=>{
    try {
        axios.get(`${apiHost}/semesters`,{
            headers:{
                auth:cookies.auth
            }
        }).then((res)=>{
            const modifiedOptions = res.data.map((data)=>({
                value:data.id,
                label:data.semester
            }))
            setSemesterOptions(modifiedOptions)
        })
     } catch (error) {
        
     }
   }
   const fetchDepartments= async()=>{
    try {
        axios.get(`${apiHost}/departments`,{
            headers:{
                auth:cookies.auth
            }
        }).then((res)=>{
            const modifiedOptions = res.data.map((data)=>({
                value:data.id,
                label:data.department
            }))
            setDepartmentOptions(modifiedOptions)
        })
     } catch (error) {
        
     }
   }

    useEffect(()=>{
        fetchDepartments()
        fetchRegualations()
        fetchSemsters()
        fetchYears()
    },[cookies.auth])

  return (
    <div className="syllabusEntryPageContainer">
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
              <div onClick={()=>{setRegulationModalOpen(true)}} className="newRegulationContainer">
              <Info/> New Regualtion?
                </div>
              
            </div>
            <div className="select">
              <Select
              options={yearOptions}
              placeholder={"Year"}
              value={year}
              onChange={setYear}
              />
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
      
      {
      (department && regulation && year && semester) &&
      <div className="addCoursesButtonContainer">
        <Button label={"+ Add Courses"}/>  
        </div>
      
      }
     

      {
        courses.length>0?
        
        <div>
          <Card content={

             <div></div>
             
          }/>
        </div>
        
        :<NoData/>
      }








      <StyledModal 
      title={"Create New Regulation"}
      setOpen={setRegulationModalOpen}
      open={isRegulationModalOpen}
      content={
        <div className="datePickerContainer">
             <div>
                <p>Select Regulation Year</p>
           <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker value={fromYear} onChange={setFromYear} views={["year"]}  openTo="year"  />
    </LocalizationProvider>
        </div>
        </div>
       
      }
      />
    </div>
  );
};
export default SyllabusEntry;
