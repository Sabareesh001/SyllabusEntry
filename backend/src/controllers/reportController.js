const PdfPrinter = require('pdfmake/src/printer');
const path = require('path');
const axios = require('axios')
const apiHost = `http://localhost:3000`
exports.getPDF = async(req, res) => {
    // Example JSON data (this could come from a request or database)
    const {courseId,regulationId,departmentId} = req.query
    let courseData = {
        "course": {
            "code": "22EE504",
            "title": "CONTROL SYSTEMS",
            "credits": {
                "lecture": 3,
                "tutorial": 1,
                "practical": 0,
                "total": 4
            }
        },
        "sections": [
            {
                "type": "objectives",
                "title": "Course Objectives",
                "items": [
                    "To understand the basic concepts of open loop and closed loop control systems.",
                    "To analyse the given system in time domain.",
                    "To understand the concept of frequency domain analysis.",
                    "To understand the concept of stability of system.",
                    "To design the compensator for different control systems."
                ]
            },
            {
                "type": "outcomes",
                "title": "Programme Outcomes (POs)",
                "items": [
                    {"PO1": "Engineering knowledge: Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems."},
                    {"PO2": "Problem analysis: Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics, natural sciences, and engineering sciences."},
                    {"PO3": "Design/development of solutions: Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for public health and safety, and cultural, societal, and environmental considerations."},
                    {"PO4": "Conduct investigations of complex problems: Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of the information to provide valid conclusions."},
                    {"PSO1": "Design, analyze and evaluate the performance of Electrical & Electronics systems using contemporary tools to provide effective solutions for real-world problems."},
                    {"PSO2": "Apply technology to make a significant contribution in terms of Electrical Engineering Innovations and ethically supporting the sustainable development of the society."}
                ]
            },
            {
                "type": "outcomes",
                "title": "Course Outcomes (COs)",
                "items": [
                    {"CO1": "Develop a mathematical model of a physical system and compute the transfer function using Block diagram reduction technique and Signal flow graph."},
                    {"CO2": "Analyze the performance of first and second order system and compute the steady state error for different test signals."},
                    {"CO3": "Analyze the frequency response of a given system."},
                    {"CO4": "Examine the stability of a given system using various methods."},
                    {"CO5": "Design a lag, lead, and lag-lead compensator for open loop system and examine a system using state variable techniques."}
                ]
            },
            {
                "type": "matrix",
                "title": "Articulation Matrix",
                "matrix": [
                    {"CO.No.": "1", "PO1": 3, "PO2": "", "PO3": 2, "PO4": 3, "PO5": 3, "PSO1": 3, "PSO2": ""},
                    {"CO.No.": "2", "PO1": 1, "PO2": "", "PO3": 2, "PO4": 3, "PO5": 3, "PSO1": 3, "PSO2": ""},
                    {"CO.No.": "3", "PO1": 2, "PO2": "", "PO3": 3, "PO4": 3, "PO5": 3, "PSO1": 3, "PSO2": ""},
                    {"CO.No.": "4", "PO1": 3, "PO2": "", "PO3": 2, "PO4": 3, "PO5": 3, "PSO1": 3, "PSO2": ""},
                    {"CO.No.": "5", "PO1": 2, "PO2": "", "PO3": 2, "PO4": 3, "PO5": 3, "PSO1": 3, "PSO2": ""}
                ]
            },
            {
                "type": "syllabus",
                "title": "Syllabus",
                "units": [
                    {
                        "unit": "UNIT I",
                        "title": "MATHEMATICAL MODEL OF PHYSICAL SYSTEMS",
                        "hours": "10 Hours",
                        "description": "Introduction- Basic Elements of control Systems-Open loop and closed loop system - Elements of Control system - Transfer function of mechanical translational and rotational system electrical system - Electrical analogy of mechanical system - Block diagram reduction technique - Signal flow graph."
                    },
                    {
                        "unit": "UNIT II",
                        "title": "TIME DOMAIN ANALYSIS",
                        "hours": "8 Hours",
                        "description": "Standard test signals - Time response of first order and second order systems for unit step test signals - Time domain Specifications-Steady state response - Static error constants - steady state error - Effects of proportional derivative proportional integral systems."
                    },
                    {
                        "unit": "UNIT III",
                        "title": "FREQUENCY DOMAIN ANALYSIS",
                        "hours": "9 Hours",
                        "description": "Frequency response of systems - Frequency domain specifications - Correlation between frequency domain and time domain specifications - Bode plot Polar plot."
                    },
                    {
                        "unit": "UNIT IV",
                        "title": "STABILITY ANALYSIS OF CONTROL SYSTEM",
                        "hours": "9 Hours",
                        "description": "Concepts of stability - Necessary conditions for Stability-Characteristics equation - Location of roots in S plane for stability - Routh Hurwitz criterion-Nyquist stability criterion- Root Locus technique- Relative Stability."
                    },
                    {
                        "unit": "UNIT V",
                        "title": "COMPENSATOR DESIGN",
                        "hours": "9 Hours",
                        "description": "Compensators Design of Lag compensator - Lead compensator - Lag-lead compensator (using Bode plot) - Concept of state state variable state model Controllability and observability."
                    },
                    {
                        "unit": "",
                        "title": "Tutorial",
                        "hours": "15 Hours",
                        "description": ""
                    },
                    {
                        "unit": "",
                        "title": "Total",
                        "hours": "60 Hours",
                        "description": ""
                    }
                ]
            },
            {
                "type": "references",
                "title": "References",
                "items": [
                    "I.J.Nagrath and M.Gopal, Control System Engineering, NewAge International Publisher, 2018",
                    "M.Gopal, Control System Principles and Design, TataMcGraw-Hill, 2012.",
                    "K.Ogatta, Modern Control Engineering, Pearson Education, NewDelhi, 2015",
                    "BenjaminC. Kuo, Automatic Control Systems, Prentice-Hall of India Pvt. Ltd., 2014",
                    "M.N.Bandyopadhyay, Control Engineering Theory and Practice, 9thEdition, John Wiley & Sons, 2006.",
                    "https://archive.nptel.ac.in/courses/107/106/107106081/"
                ]
            }
        ]
    };
    try {
        const response = await axios.get(`${apiHost}/reportData/${courseId}/${regulationId}/${departmentId}`);
        if (response.status === 210) {
            res.status(500).json({ message: "No Sufficient Data" });
            return; // Exit the function to prevent further processing
        }
        
        const courseData = response.data; // Correctly use response.data
    
        var fonts = {
            Roboto: {
                normal: path.join(__dirname, '../assets/timesNewRoman/regular.ttf'),
                bold: path.join(__dirname, '../assets/timesNewRoman/bold.ttf'),
                italics: path.join(__dirname, '../assets/timesNewRoman/italic.ttf'),
                bolditalics: path.join(__dirname, '../assets/timesNewRoman/boldItalic.ttf')
            }
        };
    
        var printer = new PdfPrinter(fonts);
    
        // Dynamic content generation based on JSON data
        const content = [];
    
        // Function to create a table with a single column and border
        function createSingleColumnTable(contentArray) {
            return {
                table: {
                    widths: ['*'],
                    body: contentArray.map(item => [item])
                },
                layout: {
                    hLineWidth: function (i, node) {
                        return 1; // Horizontal line thickness
                    },
                    vLineWidth: function (i, node) {
                        return 1; // Vertical line thickness
                    },
                    hLineColor: function (i, node) {
                        return '#000000'; // Horizontal line color
                    },
                    vLineColor: function (i, node) {
                        return '#000000'; // Vertical line color
                    },
                    paddingLeft: function(i, node) { return 4; }, // Padding on the left of cells
                    paddingRight: function(i, node) { return 4; }, // Padding on the right of cells
                    paddingTop: function(i, node) { return 4; }, // Padding on the top of cells
                    paddingBottom: function(i, node) { return 4; }, // Padding on the bottom of cells
                },
                margin: [0, 0, 0, 0]
            };
        }
        
        // Add all content to an array
        const pageContent = [];
        
        // Course Information Section
        
        // Sections like Objectives, Outcomes, etc.
        courseData.sections.forEach(section => {
            // Add section title
            pageContent.push({ text: section.title, fontSize: 11, bold: true, margin: [0, 0, 0, 0] });
        
            // Handle different section types
            if (section.type === 'objectives' || section.type === 'references') {
                pageContent.push({
                    ul: section.items.map(item => ({ text: item, fontSize: 11 })),
                    margin: [0, 0, 0, 0]
                });
            } else if (section.type === 'outcomes') {
                pageContent.push({
                    table: {
                        widths: ['auto', '*'],
                        body: section.items.map(item => [Object.keys(item)[0], item[Object.keys(item)[0]].replace(/\r?\n?/g, '')])
                    },
                    layout: {
                        hLineWidth: function (i, node) {
                            return 1; // Horizontal line thickness
                        },
                        vLineWidth: function (i, node) {
                            return 1; // Vertical line thickness
                        },
                        hLineColor: function (i, node) {
                            return '#000000'; // Horizontal line color
                        },
                        vLineColor: function (i, node) {
                            return '#000000'; // Vertical line color
                        },
                        paddingLeft: function(i, node) { return 8; }, // Padding on the left of cells
                        paddingRight: function(i, node) { return 8; }, // Padding on the right of cells
                        paddingTop: function(i, node) { return 4; }, // Padding on the top of cells
                        paddingBottom: function(i, node) { return 4; }, // Padding on the bottom of cells
                        border: [true, true, true, true] // Add border around the entire table
                    },
                    margin: [10, 10, 10, 10]
                });
            } else if (section.type === 'matrix') {
                // Articulation Matrix
                const matrixHeader = Object.keys(section.matrix[0]).map(key => ({ text: key, fontSize: 9, bold: true }));
                const matrixBody = section.matrix.map(row => Object.values(row).map(value => ({ text: value.toString(), fontSize: 9 })));
        
                pageContent.push({
                    table: {
                        widths: Array(matrixHeader?.length).fill(`${Math.round(100 / (matrixHeader?.length+1) )}%`),
                        body: [matrixHeader, ...matrixBody]
                    },
                    layout: {
                        hLineWidth: function () { return 1; },
                        vLineWidth: function () { return 1; },
                        hLineColor: function () { return '#000000'; },
                        vLineColor: function () { return '#000000'; },
                        paddingLeft: function () { return 8; },
                        paddingRight: function () { return 8; },
                        paddingTop: function () { return 4; },
                        paddingBottom: function () { return 4; },
                        border: [true, true, true, true] // Add border around the entire table
                    },
                    margin: [10, 10, 10, 10]
                });
            } else if (section.type === 'syllabus') {
                // Syllabus Sections
                const syllabusBody = [];
        
                section.units.forEach(unit => {
                    // Add unit row
                    syllabusBody.push([
                        { text: unit.unit, fontSize: 11, bold: true },
                        { text: unit.title, fontSize: 11 },
                        { text: unit.hours+' hours', fontSize: 11 }
                    ]);
        
                    // Add unit description row under the unit row
                    syllabusBody.push([
                        {
                            text: unit.description,
                            border: [false, false, false, false],
                            colSpan: 3,
                            fontSize: 11
                        }, {}, {}
                    ]);
                });
        
                pageContent.push({
                    table: {
                        widths: ["10%", '70%', "20%"],
                        body: syllabusBody
                    },
                    layout: {
                        hLineWidth: function () { return 1; },
                        vLineWidth: function () { return 1; },
                        hLineColor: function () { return '#000000'; },
                        vLineColor: function () { return '#000000'; },
                        paddingLeft: function () { return 8; },
                        paddingRight: function () { return 8; },
                        paddingTop: function () { return 4; },
                        paddingBottom: function () { return 4; },
                    },
                    margin: [0, 0, 0, 0]
                });
            }
        });
        
        // Wrap the entire content in a single-column bordered table
        var finalContent = createSingleColumnTable(pageContent);
        finalContent = [
            {
                table: {
                    widths: ['20%', '60%', '5%', '5%', '5%', '5%'],
                    body: [
                        [
                            { text: courseData.course.code, fontSize: 11, bold: true },
                            { text: courseData.course.title.toUpperCase(), fontSize: 11, bold: true },
                            { text: courseData.course.credits.lecture.toString(), fontSize: 11 },
                            { text: courseData.course.credits.tutorial.toString(), fontSize: 11 },
                            { text: courseData.course.credits.practical.toString(), fontSize: 11 },
                            { text: courseData.course.credits.total.toString(), fontSize: 11 }
                        ]
                    ]
                },
                layout: {
                    hLineWidth: function (i, node) {
                        // Hide the bottom border only
                        return (i === node.table.body?.length) ? 0 : 1;
                    },
                    vLineWidth: function (i, node) {
                        return 1; // Vertical line thickness
                    },
                    hLineColor: function (i, node) {
                        return '#000000'; // Horizontal line color
                    },
                    vLineColor: function (i, node) {
                        return '#000000'; // Vertical line color
                    },
                    paddingLeft: function(i, node) { return 8; }, // Padding on the left of cells
                    paddingRight: function(i, node) { return 8; }, // Padding on the right of cells
                    paddingTop: function(i, node) { return 4; }, // Padding on the top of cells
                    paddingBottom: function(i, node) { return 4; }, // Padding on the bottom of cells
                    border: [true, true, true, true] // Add border around the entire table
                },
                margin: [0, 0, 0, 0],
            },
            finalContent
        ];
        
        console.log(finalContent);
        
        var docDefinition = {
            content: finalContent,
            defaultStyle: {
                font: 'Roboto'
            }
        };
    
        // Generate PDF
        res.setHeader('Content-Type', 'application/pdf');
        var pdfDoc = printer.createPdfKitDocument(docDefinition);
        pdfDoc.pipe(res);
        pdfDoc.end();
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Error generating report: " + error.message });
    }
    
};

exports.getData = async (req,res) =>{
    const { courseId, regulationId,departmentId} = req.params;
    try {
      // Fetch Course Details
      const courseDetails = await axios.get(`${apiHost}/coursesById?id=${courseId}`);
      const course = courseDetails.data[0];
    
      // Fetch Course Objectives
      const courseObjectives = await axios.get(`${apiHost}/course-objectives/${courseId}`);
      const objectives = courseObjectives.data;
    
      // Fetch Programme Outcomes
      const programmeOutcomes = await axios.get(`${apiHost}/programme-outcomes/${regulationId}`);
      const outcomes = programmeOutcomes.data;
    

      const programmeSpecificOutcomes = await axios.get(`${apiHost}/programme-specific-outcomes/${departmentId}/${regulationId}`);
      const specificOutcomes = programmeSpecificOutcomes.data;
    
      // Fetch Course Outcomes
      const courseOutcomes = await axios.get(`${apiHost}/course-outcomes/${courseId}`);
      const outcomesData = courseOutcomes.data;
    
      // Fetch Course-PO Mappings for each CO
      const poMappingsPromises = outcomesData.map(co => axios.get(`${apiHost}/course-po-mappings/${co.id}`));
      const poMappingsResults = await Promise.all(poMappingsPromises);
    
      // Fetch Course-PSO Mappings for each CO
      const psoMappingsPromises = outcomesData.map(co => axios.get(`${apiHost}/course-pso-mappings/${co.id}`));
      const psoMappingsResults = await Promise.all(psoMappingsPromises);
    
      // Determine which POs and PSOs are actually mapped
      const mappedPOs = new Set();
      const mappedPSOs = new Set();
    
      poMappingsResults.forEach(result => {
        if (Array.isArray(result.data)) {
          result.data.forEach(po => mappedPOs.add(po.po));
        }
      });
    
      psoMappingsResults.forEach(result => {
        if (Array.isArray(result.data)) {
          result.data.forEach(pso => mappedPSOs.add(pso.pso));
        }
      });
    
      // Filter the POs and PSOs based on the mappings
      const filteredOutcomes = outcomes.filter(outcome => mappedPOs.has(outcome.id));
      const filteredSpecificOutcomes = specificOutcomes.filter(outcome => mappedPSOs.has(outcome.id));
    
      // Assemble Syllabus from Course Outcomes
      const syllabusUnits = outcomesData.map(outcome => ({
        unit: "",
        title:outcome.unit,
        hours: outcome.hours,
        description: outcome.syllabus,
      }));
    
      // Calculate tutorial hours
      const tutorialHours = course.tutorial * 15;
      const totalHours = syllabusUnits.reduce((sum, unit) => sum + unit.hours, 0) + tutorialHours;
    
      // Fetch References
      const references = course.References.split(';'); // Assuming ';' is the delimiter
    
      // Combine all data
      const courseData = {
        course: {
          code: course.course_code,
          title: course.course_name,
          credits: {
            lecture: course.lecture,
            tutorial: course.tutorial,
            practical: course.practical,
            total: course.credit
          }
        },
        sections: [
          {
            type: "objectives",
            title: "Course Objectives",
            items: objectives.map(obj => obj.objective)
          },
          {
            type: "outcomes",
            title: "Programme Outcomes (POs)",
            items: filteredOutcomes.map((outcome, index) => ({ [`PO${index + 1}`]: outcome.programme_outcome }))
          },
          {
            type: "outcomes",
            title: "Programme-Specific Outcomes (PSOs)",
            items: filteredSpecificOutcomes.map((outcome, index) => ({ [`PSO${index + 1}`]: outcome.programme_specific_outcome }))
          },
          {
            type: "outcomes",
            title: "Course Outcomes (COs)",
            items: outcomesData.map((co,i)=> ({ [`CO${i+1}`]: co.course_outcome }))
          },
          {
            type: "matrix",
            title: "Articulation Matrix",
            matrix: outcomesData.map((co, index) => {
              const poLevels = outcomes.reduce((acc, po, i) => {
                const poData = poMappingsResults[index]?.data || [];
                const poMapping = Array.isArray(poData) ? poData.find(p => p.po === po.id) : null;
                acc[`PO${i + 1}`] = poMapping ? poMapping.level : '-'; // '-' if no level assigned
                return acc;
              }, {});
    
              const psoLevels = specificOutcomes.reduce((acc, pso, i) => {
                const psoData = psoMappingsResults[index]?.data || [];
                const psoMapping = Array.isArray(psoData) ? psoData.find(p => p.pso === pso.id) : null;
                acc[`PSO${i + 1}`] = psoMapping ? psoMapping.level : '-'; // '-' if no level assigned
                return acc;
              }, {});
    
              return {
                "CO.No.": `${co.id}`,
                ...poLevels,
                ...psoLevels
              };
            })
          },
          {
            type: "syllabus",
            title: "",
            units: [
              ...syllabusUnits,
              { unit: "", title: "Tutorial", hours: tutorialHours, description: "" },
              { unit: "", title: "Total Hours", hours: totalHours, description: "" }
            ]
          },
          {
            type: "references",
            title: "References",
            items: references
          }
        ]
      };
    
      res.json(courseData);
    } catch (error) {
      console.error('Error fetching course data:', error);
      res.status(210).json({ message: 'Error fetching course data' });
    }
    
    
  }
  