import { useEffect, useState } from 'react';
import axios from 'axios';
import './ProgrammeOutcome.css';
import { TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import apiHost from '../../../../config/config';
import { useCookies } from 'react-cookie';
import Button from '../../../components/button/Button';

const ProgrammeOutcome = ({ courseId, regulation }) => {
    const [programmeOutcomes, setProgrammeOutcomes] = useState([]);
    const [courseOutcomes, setCourseOutcomes] = useState([]);
    const [cookies] = useCookies(['auth']);
    const [mappingData, setMappingData] = useState([]);

    useEffect(() => {
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

    useEffect(() => {
        if (regulation) {
            fetchProgrammeOutcomeById(regulation);
        }
    }, [regulation]);

    useEffect(() => {
        if (courseOutcomes) {
            fetchMappings(courseOutcomes);
        }
    }, [courseOutcomes]);

    const fetchProgrammeOutcomeById = async (id) => {
        try {
            const response = await axios.get(`${apiHost}/programme-outcomes/${id}`, {
                headers: { auth: cookies.auth }
            });
            setProgrammeOutcomes(response.data);
        } catch (error) {
            console.error('Error fetching programme outcome:', error);
        }
    };

    const fetchMappings = async (course_outcome) => {
        try {
            const response = await axios.get(`${apiHost}/course-po-mappings/${course_outcome}`, {
                headers: { auth: cookies.auth }
            });
            if(response.data){
            setMappingData(response.data);
                
            }
        } catch (error) {
            console.error('Error fetching CO-PO mappings:', error);
        }
    };

    const handleInputChange = (course_outcome, po, value) => {
        setMappingData(prevData => {
            const existingEntry = prevData.find(entry => entry.course_outcome === course_outcome && entry.po === po);
            if (existingEntry) {
                return prevData.map(entry =>
                    entry.course_outcome === course_outcome && entry.po === po ? { ...entry, level: value } : entry
                );
            } else {
                return [...prevData, { course_outcome, po, level: value }];
            }
        });
    };

    const saveMappings = async () => {
        try {
            await axios.post(`${apiHost}/course-po-mappings`, mappingData, {
                headers: { auth: cookies.auth }
            });
            alert('Mappings saved successfully!');
            fetchMappings();
        } catch (error) {
            console.error('Error saving mappings:', error);
            alert('Failed to save mappings');
        }
    };

    const deleteMapping = async (id,course_outcome,po) => {
        try {
            await axios.delete(`${apiHost}/course-po-mappings/${id}`, {
                headers: { auth: cookies.auth }
            });
            setMappingData(prevData => prevData.filter(entry => entry.course_outcome !== course_outcome || entry.po !== po));
            alert('Mapping deleted successfully!');
        } catch (error) {
            console.error('Error deleting mapping:', error);
            alert('Failed to delete mapping');
        }
    };

    return (
        <div className='programmeOutcomeContainer'>
            {programmeOutcomes && (
                <div className='programmeOutcomeTableContainer'>
                    <table>
                        <thead>
                            <tr>
                                <th>CO. No.</th>
                                {programmeOutcomes.map((data, i) => (
                                    <th key={data.id}>{'PO' + (i + 1)}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {courseOutcomes.map((coData, coIndex) => (
                                <tr key={coData.id}>
                                    <td>{`CO${coIndex + 1}`}</td>
                                    {programmeOutcomes.map((poData, poIndex) => {
                                        const mapping = mappingData?.find(
                                            entry => entry.course_outcome === coData.id && entry.po === poData.id
                                        );

                                        return (
                                            <td key={poData.id}>
                                                <div className="icon-button-container">
                                                    <TextField
                                                        style={{ backgroundColor: "white" }}
                                                        type="number"
                                                        value={mapping?.level || ''}
                                                        onChange={(e) =>
                                                            handleInputChange(coData.id, poData.id, e.target.value)
                                                        }
                                                    />
                                                    <IconButton
                                                        className="delete-icon"
                                                        color="secondary"
                                                        onClick={() => {
                                                            const mapping = mappingData.find(
                                                                entry => entry.course_outcome === coData.id && entry.po === poData.id
                                                            );
                                                            deleteMapping(mapping?.id,mapping?.course_outcome,mapping?.po)
                                                        }}
                                                        disabled={!mapping?.level}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </div>
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={{display:"flex",justifyContent:"center"}}>
                    <IconButton
                        variant="contained"
                        color="primary"
                        onClick={saveMappings}
                        style={{ marginTop: '20px' }}
                    >
                        <Button size={"small"} label={ <div className='iconButtonContainer'><SaveIcon /> Save</div>}/>
                       
                    </IconButton>
                        </div>
                   
                </div>
            )}
        </div>
    );
};

export default ProgrammeOutcome;
