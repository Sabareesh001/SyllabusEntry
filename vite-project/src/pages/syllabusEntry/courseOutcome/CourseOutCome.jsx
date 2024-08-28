import { useState } from 'react'
import './CourseOutcome.css'
import Button from '../../../components/button/Button'
import { Add, Cancel, Check } from '@mui/icons-material'
import { TextareaAutosize, TextField } from '@mui/material'

const CourseOutcome = ()=>{
    const [courseOutcomes,setCourseOutcomes] =  useState([
        {
            id:1,
            courseOutcome : 
            `Develop a mathematical model of a physical system and compute the transfer 
            function usingBlock diagram reduction technique and Signal flow graph.`,
            syllabus:`Introduction- Basic Elements of control Systems-Open loop and closed loop system - Elements of Control 
        system - Transfer function of mechanical translational and rotational system, electrical system - Electrical
analogy of mechanical system - Block diagram reduction technique - Signal flow graph.`,
            Unit:  `MATHEMATICAL MODEL OF PHYSICAL SYSTEMS`,
            hours:10
        },
        {
            id:2,
            courseOutcome : 
            `Analyze the performance of first and second order system and compute the steady state error
fordifferent test signals.`,
            syllabus:`Standard test signals - Time response of first order and second order systems for unit step test signals - Time
domain Specifications-Steady state response - Static error constants - steady state error - Effects of proportional
derivative, proportional integral systems.`,
            Unit:  `TIME DOMAIN ANALYSIS`,
            hours:8
        }
    ])

    const[addCourseOutcome,setAddCourseOutcome] = useState(false)

   return(
    <div className='courseOutcomeContainer'>
        <div  className='addCourseOutcomeButtonContainer'>
            { !addCourseOutcome ?
                <Button onClick={()=>{setAddCourseOutcome(true)}} size={"small"} label={<div className='addCourseOutcomeButton'><Add/> Add Course Outcome</div>}/>:
                <div className='addCourseOutcomeActions'>
                    <Button size={"small"} onClick={()=>{setAddCourseOutcome(false)}} label={<div className='addCourseOutcomeActionContainer'><Cancel/> Cancel</div>}></Button>
                    <Button size={"small"} label={<div className='addCourseOutcomeActionContainer'><Check/> Add</div>}></Button>
                    </div>
              
                }
        </div>
        <div className='courseOutcomeTableContainer'>
             <table>
                <thead>
                    <th>S.no</th>
                    <th>Course Outcome</th>
                    <th>Unit</th>
                    <th>Syllabus</th>
                    <th>Hours</th>
                </thead>
                <tbody>
                    {addCourseOutcome &&
                        <tr>
                            <td>

                            </td>
                            <td>
                                <div className='textAreaContainer'>
                                <TextareaAutosize style={{width:"100%",fontSize
                                    :"16px"
                                }} minRows={6}/>
                                </div>
                                
                            </td>
                            <td>
                            <div className='textAreaContainer'>
                                <TextareaAutosize style={{width:"100%",fontSize
                                    :"16px"
                                }} minRows={6}/>
                                </div>
                            </td>
                            <td>
                            <div className='textAreaContainer'>
                                <TextareaAutosize style={{width:"100%",fontSize
                                    :"16px"
                                }} minRows={6}/>
                                </div>
                            </td>
                            <td>
                                <TextField
                                style={{backgroundColor:"white"}}
                                type='number'
                                />
                            </td>
                        </tr>
                    }
                   {courseOutcomes.map((data,i)=>(
                    <tr>
                    <td>
                        {i+1}
                        </td>
                        <td>
                        {data.courseOutcome}
                        </td>
                        <td>
                        {data.Unit}
                        </td>
                        <td>
                            {data.syllabus}
                        </td>
                        <td>
                            {data.hours}
                        </td>
                    </tr>
                   ))}
                </tbody>
             </table>
        </div>
    </div>
   )
}
export default CourseOutcome