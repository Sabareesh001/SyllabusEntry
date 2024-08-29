import './EditPso.css'

import { useEffect, useState } from 'react';
import axios from 'axios';
import apiHost from '../../../../config/config';
import { useCookies } from 'react-cookie';
import { Cancel, Edit } from '@mui/icons-material';
import { TextareaAutosize } from '@mui/material';
import Button from '../../../components/button/Button';

const EditPso = ({ department, toast ,regulation}) => {
    const [programmeSpecificOutcomes, setProgrammeSpecificOutcomes] = useState([]);
    const [newOutcome, setNewOutcome] = useState('');
    const [editMode, setEditMode] = useState(null);
    const [editOutcome, setEditOutcome] = useState('');
    const [cookies] = useCookies(['auth']);

    useEffect(() => {
        if (department && regulation) {
            fetchProgrammeSpecificOutcomeById(department,regulation);
        }
    }, [department]);

    const fetchProgrammeSpecificOutcomeById = async (id,regulation) => {
        try {
            const response = await axios.get(`${apiHost}/programme-specific-outcomes/${id}/${regulation}`, {
                headers: { auth: cookies.auth }
            });
            setProgrammeSpecificOutcomes(response.data);
        } catch (error) {
            console.error('Error fetching programme-specific outcome:', error);
        }
    };

    const createProgrammeSpecificOutcome = async () => {
        try {
            const response = await axios.post(`${apiHost}/programme-specific-outcomes`, {
                department,
                regulation,
                programme_specific_outcome: newOutcome,
                status: 1 // Assuming 1 is the active status
            }, {
                headers: { auth: cookies.auth }
            });
            setProgrammeSpecificOutcomes([...programmeSpecificOutcomes, response.data]);
            setNewOutcome(''); // Reset the input field
        } catch (error) {
            console.error('Error creating programme-specific outcome:', error);
        }
    };

    const updateProgrammeSpecificOutcome = async (id) => {
        try {
            await axios.put(`${apiHost}/programme-specific-outcomes/${id}`, {
                department,
                regulation,
                programme_specific_outcome: editOutcome
            }, {
                headers: { auth: cookies.auth }
            });
            fetchProgrammeSpecificOutcomeById(department); // Refresh the list after update
            setEditMode(null);
            setEditOutcome('');
        } catch (error) {
            console.error('Error updating programme-specific outcome:', error);
        }
    };

    const deleteProgrammeSpecificOutcome = async (id) => {
        try {
            await axios.delete(`${apiHost}/programme-specific-outcomes/${id}`, {
                headers: { auth: cookies.auth }
            });
            setProgrammeSpecificOutcomes(programmeSpecificOutcomes.filter(outcome => outcome.id !== id));
        } catch (error) {
            console.error('Error deleting programme-specific outcome:', error);
        }
    };

    return (
        <div className='editPoContainer'>
            <div className='PoListContainer'>
                {programmeSpecificOutcomes.map((data, i) => (
                    <div className='po' key={data.id}>
                        {editMode === data.id ? (
                            <TextareaAutosize
                                value={editOutcome}
                                onChange={(e) => setEditOutcome(e.target.value)}
                                minRows={3}
                                fullWidth
                            />
                        ) : (
                            <p>
                                <b>{'PSO' + (i + 1)}: </b>
                                <span>{data.programme_specific_outcome}</span> {/* Add a span to wrap the programme-specific outcome */}
                            </p>
                        )}
                        <div className='poActions'>
                            {editMode === data.id ? (
                                <>
                                    <Button
                                        label={"Save"}
                                        size={"small"}
                                        onClick={() => updateProgrammeSpecificOutcome(data.id)}
                                        variant="contained"
                                        color="primary"
                                    />
                                    <Cancel onClick={() => setEditMode(null)} />
                                </>
                            ) : (
                                <>
                                    <Edit onClick={() => { setEditMode(data.id); setEditOutcome(data.programme_specific_outcome); }} />
                                    <Cancel onClick={() => deleteProgrammeSpecificOutcome(data.id)} />
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className='createPoContainer'>
                <div className='textAreaContainer'>
                    <TextareaAutosize
                        label="New Programme-Specific Outcome"
                        value={newOutcome}
                        minRows={3}
                        onChange={(e) => setNewOutcome(e.target.value)}
                        style={{ width: "100%" }}
                    />
                </div>
                <Button onClick={createProgrammeSpecificOutcome} size={"small"} label={"Add"} />
            </div>
        </div>
    );
};

export default EditPso;
