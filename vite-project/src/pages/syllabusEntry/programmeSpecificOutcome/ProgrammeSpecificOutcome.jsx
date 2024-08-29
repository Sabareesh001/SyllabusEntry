import { useEffect, useState } from 'react';
import './ProgrammeSpecificOutcome.css';
import { TextField } from '@mui/material';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import apiHost from '../../../../config/config';

const ProgrammeSpecificOutcome = ({ courseId, regulation }) => {
    const [cookies] = useCookies(['auth']);
    const [programmeSpecificOutcomes, setProgrammeSpecificOutcomes] = useState([]);
    const [courseOutcomes, setCourseOutcomes] = useState([]);

    useEffect(() => {
        // Fetch course outcomes from the backend
        const fetchCourseOutcomes = async () => {
            try {
                const response = await axios.get(`${apiHost}/course-outcomes/${courseId}`, {
                    headers: { auth: cookies.auth }
                });
                setCourseOutcomes(response.data);
            } catch (error) {
                console.error('Error fetching course outcomes:', error);
            }
        };

        fetchCourseOutcomes();
    }, [courseId, cookies.auth]);

    const fetchProgrammeSpecificOutcomes = async (id) => {
        try {
            const response = await axios.get(`${apiHost}/programme-specific-outcomes/${id}`, {
                headers: { auth: cookies.auth }
            });
            setProgrammeSpecificOutcomes(response.data);
        } catch (error) {
            console.error('Error fetching programme-specific outcomes:', error);
        }
    };

    useEffect(() => {
        if (regulation) {
            fetchProgrammeSpecificOutcomes(regulation);
        }
    }, [regulation, cookies.auth]);

    return (
        <div className='programmeOutcomeContainer'>
            <div className='programmeOutcomeTableContainer'>
                <table>
                    <thead>
                        <tr>
                            <th>CO. No.</th>
                            {programmeSpecificOutcomes.map((data) => (
                                <th key={data.id}>{data.programme_specific_outcome}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {courseOutcomes.map((data, i) => (
                            <tr key={data.id}>
                                <td>{`CO${i + 1}`}</td>
                                {programmeSpecificOutcomes.map((_, j) => (
                                    <td key={j}>
                                        <TextField style={{ backgroundColor: 'white' }} type='number' />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProgrammeSpecificOutcome;
