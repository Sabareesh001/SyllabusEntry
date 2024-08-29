import React, { useState } from 'react';
import axios from 'axios';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import StyledModal from '../../../components/modal/StyledModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiHost from '../../../../config/config';
import { useCookies } from 'react-cookie';
const RegulationModal = ({ isRegulationModalOpen, setRegulationModalOpen }) => {
    const [fromYear, setFromYear] = useState(null);
    const [cookies,setCookie] = useCookies()
    const handleCreateRegulation = async () => {
        if (!fromYear) {
            toast.error("Please select a regulation year");
            return;
        }

        try {
            const regulation = fromYear.format('YYYY'); // Format year to string
            const status = '1'; // Default status; adjust if needed

            const response = await axios.post(`${apiHost}/regulations`, { regulation, status },{
                headers:{
                    auth:cookies.auth
                }
            });

            if (response.status === 201) {
                toast.success('Regulation created successfully!');
                setRegulationModalOpen(false);
            } else {
                toast.error('Failed to create regulation');
            }
        } catch (error) {
            console.error('Error creating regulation:', error);
            toast.error('Error creating regulation');
        }
    };

    return (
        <>
            <StyledModal
            
                title={"Create New Regulation"}
                setOpen={setRegulationModalOpen}
                open={isRegulationModalOpen}
                content={
                    <div className="datePickerContainer">
                        <div>
                            <p>Select Regulation Year</p>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            
<DatePicker
    value={fromYear}
    onChange={setFromYear}
    views={["year"]}
    openTo="year"
    
/>
                            </LocalizationProvider>
                        </div>
                        <button onClick={handleCreateRegulation}>Submit</button>
                    </div>
                }
            />
            <ToastContainer />
        </>
    );
};

export default RegulationModal;
