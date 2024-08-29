import { useEffect, useState } from 'react';
import './EditPo.css';
import axios from 'axios';
import apiHost from '../../../../config/config';
import { useCookies } from 'react-cookie';
import { Cancel, Edit } from '@mui/icons-material';
import {  TextareaAutosize } from '@mui/material';
import Button from '../../../components/button/Button';
const EditPo = ({ regulation,toast }) => {
    const [programmeOutcomes, setProgrammeOutcomes] = useState([]);
    const [newOutcome, setNewOutcome] = useState('');
    const [editMode, setEditMode] = useState(null);
    const [editOutcome, setEditOutcome] = useState('');
    const [cookies] = useCookies(['auth']);

    useEffect(() => {
        if (regulation) {
            fetchProgrammeOutcomeById(regulation);
        }
    }, [regulation]);

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

    const createProgrammeOutcome = async () => {
        try {
            const response = await axios.post(`${apiHost}/programme-outcomes`, {
                regulation,
                programme_outcome: newOutcome,
                status: 1 // Assuming 1 is the active status
            }, {
                headers: { auth: cookies.auth }
            });
            setProgrammeOutcomes([...programmeOutcomes, response.data]);
            setNewOutcome(''); // Reset the input field
        } catch (error) {
            console.error('Error creating programme outcome:', error);
        }
    };

    const updateProgrammeOutcome = async (id) => {
        try {
            await axios.put(`${apiHost}/programme-outcomes/${id}`, {
                regulation,
                programme_outcome: editOutcome,
                status: 1 // Assuming 1 is the active status
            }, {
                headers: { auth: cookies.auth }
            });
            fetchProgrammeOutcomeById(regulation); // Refresh the list after update
            setEditMode(null);
            setEditOutcome('');
        } catch (error) {
            console.error('Error updating programme outcome:', error);
        }
    };

    const deleteProgrammeOutcome = async (id) => {
        try {
            await axios.delete(`${apiHost}/programme-outcomes/${id}`, {
                headers: { auth: cookies.auth }
            });
            setProgrammeOutcomes(programmeOutcomes.filter(outcome => outcome.id !== id));
        } catch (error) {
            console.error('Error deleting programme outcome:', error);
        }
    };

    return (
        <div className='editPoContainer'>
            <div className='PoListContainer'>
                {programmeOutcomes.map((data, i) => (
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
                                <b>{'PO' + (i + 1)}: </b>
                                <span>{data.programme_outcome}</span> {/* Add a span to wrap the programme outcome */}
                            </p>
                        )}
                        <div className='poActions'>
                            {editMode === data.id ? (
                                <>
                                    <Button
                                        label={"Save"}
                                        size={"small"}
                                        onClick={() => updateProgrammeOutcome(data.id)}
                                        variant="contained"
                                        color="primary"
                                    />
                                    <Cancel onClick={() => setEditMode(null)} />
                                </>
                            ) : (
                                <>
                                    <Edit onClick={() => { setEditMode(data.id); setEditOutcome(data.programme_outcome); }} />
                                    <Cancel onClick={() => deleteProgrammeOutcome(data.id)} />
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className='createPoContainer'>
                <div className='textAreaContainer'>
                <TextareaAutosize
                    label="New Programme Outcome"
                    value={newOutcome}
                    minRows={3}
                    onChange={(e) => setNewOutcome(e.target.value)}
                    style={{width
                        :"100%"
                    }}
                />
                </div>
               
                <Button onClick={createProgrammeOutcome} size={"small"} label={"Add"} />
            </div>
        </div>
    );
    
};

export default EditPo;
