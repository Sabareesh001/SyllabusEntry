import { useState } from 'react';
import './ProgrammeSpecificOutcome.css'
import { TextField } from '@mui/material';

const ProgrammeSpecificOutcome = ()=>{
    const [programmeSpecificOutcomes,setProgrammeSpecificOutcomes] = useState([
        {
          id:1,
          po:"PSO1",
        },{
            id:2,
            po:"PSO2"
        }
    ]);
    const [courseOutcomes,setCourseOutcomes] = useState([
        {
        id:1,
        co:"CO1"
    },
    {
        id:2,
        co:"CO2"
    }
]);
     return(
        <div className='programmeOutcomeContainer'>
            <div className='programmeOutcomeTableContainer'>
                <table>
                    <thead>
                        <th>
                          CO. No.
                        </th>
                        {
                            programmeSpecificOutcomes.map((data)=>(
                              <th>{data.po}</th>
                            ))
                        }
                    </thead>
                    <tbody>
                        {
                           courseOutcomes.map((data)=>(
                            <tr>
                            <td>{data.co}</td>
                            {
                                programmeSpecificOutcomes.map((_,i)=>(
                                  <td>
                                    <TextField style={{backgroundColor:"white"}} type='number'/>
                                  </td>
                                ))
                            }
                            </tr>
                           ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProgrammeSpecificOutcome