import { useEffect, useState } from 'react';
import axios from 'axios';
import './ProgrammeOutcome.css';
import { TextField, Button } from '@mui/material';
import apiHost from '../../../../config/config';
import { useCookies } from 'react-cookie';
const ProgrammeOutcome = ({courseId,regulation}) => {
    const [programmeOutcomes, setProgrammeOutcomes] = useState([]);
    const [courseOutcomes, setCourseOutcomes] = useState([
        { id: 1, co: "CO1" },
        { id: 2, co: "CO2" }
    ]);
    const[cookies,setCookie] = useCookies(['auth'])
     console.log(regulation,courseId)
    const [fetchedProgrammeOutcome, setFetchedProgrammeOutcome] = useState(null);

    // Function to fetch programme outcome by ID
    const fetchProgrammeOutcomeById = async (id) => {
        try {
            const response = await axios.get(`${apiHost}/programme-outcomes/${id}`,{
                headers:{
                    auth:cookies.auth
                }
            });
            setFetchedProgrammeOutcome(response.data);
            setProgrammeOutcomes([response.data]); // Populate the state with the fetched data
        } catch (error) {
            console.error('Error fetching programme outcome:', error);
        }
    };
  
    useEffect(()=>{
        if(regulation){
            console.log(regulation)
            fetchProgrammeOutcomeById(regulation)
        }

    },[cookies.auth,regulation])

    return (
        <div className='programmeOutcomeContainer'>
            {fetchedProgrammeOutcome && (
                <div className='programmeOutcomeTableContainer'>
                    <table>
                        <thead>
                            <tr>
                                <th>CO. No.</th>
                                {programmeOutcomes.map((data,i) => (
                                    <th key={data.id}>{'PO'+(i+1)}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {courseOutcomes.map((data) => (
                                <tr key={data.id}>
                                    <td>{data.co}</td>
                                    {programmeOutcomes.map((_, i) => (
                                        <td key={i}>
                                            <TextField style={{ backgroundColor: "white" }} type='number' />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProgrammeOutcome;
