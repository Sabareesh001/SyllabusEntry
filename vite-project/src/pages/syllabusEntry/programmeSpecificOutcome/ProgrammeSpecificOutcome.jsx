import { useEffect, useState } from "react";
import "./ProgrammeSpecificOutcome.css";
import { TextField, Button } from "@mui/material";
import { useCookies } from "react-cookie";
import axios from "axios";
import apiHost from "../../../../config/config";
import { Delete } from "@mui/icons-material";

const ProgrammeSpecificOutcome = ({ courseId, department, regulation }) => {
  const [cookies] = useCookies(["auth"]);
  const [programmeSpecificOutcomes, setProgrammeSpecificOutcomes] = useState([]);
  const [programmeSpecificOutcomesMapping, setProgrammeSpecificOutcomesMapping] = useState([]);
  const [courseOutcomes, setCourseOutcomes] = useState([]);

  // Fetch course outcomes from the backend
  useEffect(() => {
    const fetchCourseOutcomes = async () => {
      try {
        const response = await axios.get(
          `${apiHost}/course-outcomes/${courseId}`,
          {
            headers: { auth: cookies.auth },
          }
        );
        setCourseOutcomes(response.data);
      } catch (error) {
        console.error("Error fetching course outcomes:", error);
      }
    };

    fetchCourseOutcomes();
  }, [courseId, cookies.auth]);

  // Fetch programme-specific outcomes
  const fetchProgrammeSpecificOutcomes = async (department) => {
    try {
      const response = await axios.get(
        `${apiHost}/programme-specific-outcomes/${department}`,
        {
          headers: { auth: cookies.auth },
        }
      );
      setProgrammeSpecificOutcomes(response.data);
    } catch (error) {
      console.error("Error fetching programme-specific outcomes:", error);
    }
  };

  // Fetch programme-specific outcomes mapping based on course outcomes
  const fetchProgrammeSpecificOutcomesMapping = async (courseOutcomeId) => {
    try {
      const response = await axios.get(
        `${apiHost}/course-pso-mappings/${courseOutcomeId}`,
        {
          headers: { auth: cookies.auth },
        }
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching programme-specific outcomes mapping:",
        error
      );
      return [];
    }
  };

  // Fetch data when department or courseOutcomes change
  useEffect(() => {
    if (department) {
      fetchProgrammeSpecificOutcomes(department);
    }
  }, [department, cookies.auth]);

  useEffect(() => {
    if (courseOutcomes.length > 0) {
      const fetchAllProgrammeSpecificOutcomesMapping = async () => {
        const allProgrammeOutcomesMapping = await Promise.all(
          courseOutcomes.map((outcome) =>
            fetchProgrammeSpecificOutcomesMapping(outcome.id)
          )
        );
        setProgrammeSpecificOutcomesMapping(allProgrammeOutcomesMapping);
      };
      fetchAllProgrammeSpecificOutcomesMapping();
    }
  }, [courseOutcomes, cookies.auth]);

  // Handle add/update PSO mapping
  const handlePSOChange = (outcomeIndex, psoId, level) => {
    const updatedMapping = [...programmeSpecificOutcomesMapping];
    const existingMappingIndex = updatedMapping[outcomeIndex]?.findIndex(
      (mapping) => mapping.pso === psoId
    );

    if (existingMappingIndex !== -1) {
      // Update existing mapping
      updatedMapping[outcomeIndex][existingMappingIndex].level = level;
    } else {
      // Add new mapping
      if (!updatedMapping[outcomeIndex]) updatedMapping[outcomeIndex] = [];
      updatedMapping[outcomeIndex].push({
        course_outcome: courseOutcomes[outcomeIndex].id,
        pso: psoId,
        level: level,
      });
    }
    setProgrammeSpecificOutcomesMapping(updatedMapping);
  };

  // Handle save PSO mappings
  const saveProgrammeSpecificOutcomesMapping = async () => {
    try {
      await Promise.all(
        programmeSpecificOutcomesMapping.flat().map((mapping) =>
          mapping.id
            ? axios.put(
                `${apiHost}/course-pso-mappings/${mapping.id}`,
                mapping,
                {
                  headers: { auth: cookies.auth },
                }
              )
            : axios.post(`${apiHost}/course-pso-mappings`, mapping, {
                headers: { auth: cookies.auth },
              })
        )
      );
      // Optionally refresh data or show a success message
    } catch (error) {
      console.error("Error saving programme-specific outcomes mapping:", error);
    }
  };

  // Handle delete PSO mapping
  const deletePSOMapping = async (outcomeIndex, psoId) => {
    const updatedMapping = [...programmeSpecificOutcomesMapping];
    const existingMappingIndex = updatedMapping[outcomeIndex]?.findIndex(
      (mapping) => mapping.pso === psoId
    );

    if (existingMappingIndex !== -1) {
      const mappingToDelete = updatedMapping[outcomeIndex][existingMappingIndex];
      if (mappingToDelete.id) {
        // Delete from backend
        try {
          await axios.delete(
            `${apiHost}/course-pso-mappings/${mappingToDelete.id}`,
            {
              headers: { auth: cookies.auth },
            }
          );
          updatedMapping[outcomeIndex].splice(existingMappingIndex, 1);
          setProgrammeSpecificOutcomesMapping(updatedMapping);
        } catch (error) {
          console.error(
            "Error deleting programme-specific outcomes mapping:",
            error
          );
        }
      } else {
        // Just remove from state if it hasn't been saved to backend
        updatedMapping[outcomeIndex].splice(existingMappingIndex, 1);
        setProgrammeSpecificOutcomesMapping(updatedMapping);
      }
    }
  };

  return (
    <div className="programmeOutcomeContainer">
      <div className="programmeOutcomeTableContainer">
        <table>
          <thead>
            <tr>
              <th>CO. No.</th>
              {programmeSpecificOutcomes.map((outcome) => (
                <th key={outcome.id}>{outcome.programme_specific_outcome}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {courseOutcomes.map((outcome, i) => (
              <tr key={outcome.id}>
                <td>{`CO${i + 1}`}</td>
                {programmeSpecificOutcomes.map((pso, j) => (
                  <td key={j} className="tableCell">
                    <div className="textFieldAndDelete">
                    <TextField
                      style={{ backgroundColor: "white" }}
                      type="number"
                      value={
                        programmeSpecificOutcomesMapping[i]?.find(
                          (mapping) => mapping.pso === pso.id
                        )?.level || ""
                      }
                      onChange={(e) =>
                        handlePSOChange(i, pso.id, e.target.value)
                      }
                    />
                    <div className="deleteIcon">
                      <Delete
                        onClick={() => deletePSOMapping(i, pso.id)}
                      />
                    </div>
                    </div>
                   
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <Button
          variant="contained"
          color="primary"
          onClick={saveProgrammeSpecificOutcomesMapping}
          style={{ marginTop: "10px" }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default ProgrammeSpecificOutcome;
