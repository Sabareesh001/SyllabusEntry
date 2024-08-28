import { useState } from 'react'
import './CourseObjective.css'
import Button from '../../../components/button/Button';
import { Add, Approval, Cancel, Check, Circle, Edit } from '@mui/icons-material';
import { Input } from '@mui/material';

const CourseObjective  = ( )=>{
    const[courseObjectives,setCourseObjectives] =  useState([
        {objective:"To understand the basic concepts of open loop and closed loop control systems.",
        id:1
        },
        {
            objective:"To analyse the given system in time domain.",
            id:2
        }
    ]);
    const [addObjective,setAddObjective] = useState(false)
    const [addObjectiveText,setAddObjectiveText] = useState("")
    return(
        <div className='courseObjectiveContainer'>
            
            <div className='addCourseObjectiveButtonContainer'>
                  <Button onClick={()=>{setAddObjective(true)}} size={"small"} label={<div className='addObjectiveButton'><Add/> Add Objective</div>}/>
            </div>
            <div className='objectivesListContainer'>
                {
                  addObjective &&
                  <div className='addObjectiveContainer'>
                  <div className='circleAndObjective'>
                  <Circle/>
                  <Input autoFocus value={addObjectiveText} onChange={(e)=>{setAddObjectiveText(e.target.value)}} fullWidth></Input>
                  
                      </div>
                   
                   <div className='cancelRemoveIconContainer'>
                   <Cancel onClick={()=>{
                    setAddObjective(false);
                    setAddObjectiveText("")
                   }} />
                   <Check/>
                      </div>
                  
                  </div>

                }
                {
                    courseObjectives.map((data)=>(
                        <div className='objectiveContainer'>
                        <div className='circleAndObjective'>
                        <Circle/>
                        <p>{data.objective}</p>
                            </div>
                         
                         <div className='cancelRemoveIconContainer'>
                         <Cancel/>
                         <Edit/>
                            </div>
                        
                        </div>
                       
                    ))
                }
            </div>
        </div>
    )
}

export default CourseObjective