import "./SyllabusEntry.css";
import Card from "../../components/card/Card";
import Select from "react-select";
import { Info } from "@mui/icons-material";
import { useState } from "react";
import StyledModal from '../../components/modal/StyledModal'
const SyllabusEntry = () => {
    const [isRegulationModalOpen,setRegulationModalOpen]= useState(false)
  return (
    <div className="syllabusEntryPageContainer">
      <Card
        content={
          <div className="selectContainer">
            <div className="select">
              <Select />
              <div className="newRegulationContainer">
              <Info/> New Regualtion?
                </div>
              
            </div>
            <div className="select">
              <Select />
            </div>
            <div className="select">
              <Select />
            </div>
            <div className="select">
              <Select />
            </div>
          </div>
        }
      />
      <StyledModal setOpen={setRegulationModalOpen} open={isRegulationModalOpen}/>
    </div>
  );
};
export default SyllabusEntry;
