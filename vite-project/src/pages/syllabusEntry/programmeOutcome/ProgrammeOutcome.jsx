import { useState } from 'react';
import './ProgrammeOutcome.css'
import { TextField } from '@mui/material';

const ProgrammeOutcome = ()=>{
    const [programmeOutcomes,setProgrammeOutcomes] = useState([
        {
          id:1,
          po:"PO1",
        },{
            id:2,
            po:"PO2"
        },{
            id:3,
            po:"PO3"
        },
        {
            id:4,
            po:"PO4"
        },
        {
            id:5,
            po:"PO5"
        },
        {
            id:6,
            po:"PO6"
        },
        {
            id:7,
            po:"PO7"
        },
        {
            id:8,
            po:"PO8"
        },
        {
            id:9,
            po:"PO9"
        },
        {
            id:10,
            po:"PO10"
        },
        {
            id:11,
            po:"PO11"
        },
        {
            id:12,
            po:"PO12"
        },
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
                            programmeOutcomes.map((data)=>(
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
                                programmeOutcomes.map((_,i)=>(
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

export default ProgrammeOutcome