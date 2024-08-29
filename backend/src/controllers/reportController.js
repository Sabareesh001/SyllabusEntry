const PdfPrinter = require('pdfmake/src/printer');
const path = require('path');

exports.getPDF = (req, res) => {
    var fonts = {
        Roboto: {
            normal: path.join(__dirname, '../assets/times.ttf'),
            bold: path.join(__dirname, '../assets/times.ttf'),
            italics: path.join(__dirname, '../assets/times.ttf'),
            bolditalics: path.join(__dirname, '../assets/times.ttf')
        }
    };

    var printer = new PdfPrinter(fonts);

    var docDefinition = {
        content: [
            {
                table: {
                    widths: ['10%', '50%', '10%', '10%', '10%', '10%'],
                    body: [
                        [
                            { text: '22EE504', fontSize: 11, bold: true },
                            { text: 'CONTROL SYSTEMS', fontSize: 11, bold: true },
                            { text: '3', fontSize: 11 },
                            { text: '1', fontSize: 11 },
                            { text: '0', fontSize: 11 },
                            { text: '4', fontSize: 11 }
                        ]
                    ]
                },
                layout: {
                    hLineWidth: function (i, node) {
                        return (i === 0) ? 1 : 0; // Horizontal line thickness (only for the top line)
                    },
                    vLineWidth: function (i, node) {
                        return 1; // Vertical line thickness
                    },
                    hLineColor: function (i, node) {
                        return (i === 0) ? '#000000' : '#FFFFFF'; // Horizontal line color (only for the top line)
                    },
                    vLineColor: function (i, node) {
                        return '#000000'; // Vertical line color
                    },
                    paddingLeft: function(i, node) { return 8; }, // Padding on the left of cells
                    paddingRight: function(i, node) { return 8; }, // Padding on the right of cells
                    paddingTop: function(i, node) { return 4; }, // Padding on the top of cells
                    paddingBottom: function(i, node) { return 4; }, // Padding on the bottom of cells
                    // Solid border around the entire table
                    hLineStyle: function (i, node) {
                        return (i === 0) ? null : 'dashed'; // Solid line for the top, dashed for others
                    },
                    vLineStyle: function (i, node) {
                        return null; // Solid line
                    },
                }
                ,
                margin: [0, 0, 0, 0] // Bottom margin for spacing
            },
            {
                
                table: {
                    widths: ['*'], // Single column that spans the entire page width
                    borderColor:["#0000"],
                    body: [
                        
                        // Course Objectives Section
                        [
                            {
                                text: 'Course Objectives', fontSize: 11, bold: true, margin: [0, 10, 0, 5]
                            }
                        ],
                        [
                            {
                                ul: [
                                    { text: 'To understand the basic concepts of open loop and closed loop control systems.', fontSize: 11 },
                                    { text: 'To analyse the given system in time domain.', fontSize: 11 },
                                    { text: 'To understand the concept of frequency domain analysis.', fontSize: 11 },
                                    { text: 'To understand the concept of stability of system.', fontSize: 11 },
                                    { text: 'To design the compensator for different control systems.', fontSize: 11 }
                                ],
                                margin: [0, 0, 0, 10]
                            }
                        ],
                        // Programme Outcomes (POs)
                        [
                            {
                                text: 'Programme Outcomes (POs)', fontSize: 11, bold: true, margin: [0, 10, 0, 5]
                            }
                        ],
                        [
                            { 
                                
                                    table: {
                                      widths: ['auto', '*'], // Adjust column widths if needed
                                      body: [
                                       
                                        ['PO1', 'Engineering knowledge: Apply the knowledge of mathematics science engineering fundamentals and an engineering specialization to the solution of complex engineering problems.'],
                                        ['PO2', 'Problem analysis: Identify formulate review research literature and analyze complex engineering problems reaching substantiated conclusions using first principles of mathematics natural sciences and engineering sciences.'],
                                        ['PO3', 'Design/development of solutions: Design solutions for complex engineering problems and design system components or processes that meet the specified needs with appropriate consideration for the public health and safety and the cultural societal and environmental considerations.'],
                                        ['PO4', 'Conduct investigations of complex problems: Use research-based knowledge and research methods including design of experiments analysis and interpretation of data and synthesis of the information to provide valid conclusions.'],
                                        ['PSO1', 'Design analyze and evaluate the performance of Electrical & Electronics systems using contemporary tools to provide effective solutions for real-world problems.'],
                                        ['PSO2', 'Apply technology to make a significant contribution in terms of Electrical Engineering Innovations and ethically supporting the sustainable development of the society.']
                                      ]
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
                                        // Solid border around the entire table
                                        hLineStyle: function (i, node) {
                                            return null; // Solid line
                                        },
                                        vLineStyle: function (i, node) {
                                            return null; // Solid line
                                        },
                                    },
                                  
                                margin: [0, 0, 0, 10]
                            }
                        ],
                        // Course Outcomes (COs)
                        [
                            {
                                text: 'Course Outcomes (COs)', fontSize: 11, bold: true, margin: [0, 10, 0, 5]
                            }
                        ],
                        [
                            {
                                table: {
                                    widths: ['auto', '*'], // Adjust column widths if needed
                                    body: [
                                     
                                      ['CO1', 'Develop a mathematical model of a physical system and compute the transfer function using Block diagram reduction technique and Signal flow graph.'],
                                      ['CO2', 'Analyze the performance of first and second order system and compute the steady state error for different test signals.'],
                                      ['CO3', 'Analyze the frequency response of a given system.'],
                                      ['CO4', 'Examine the stability of a given system using various methods.'],
                                      ['CO5', 'Design a lag lead and lag lead compensator for open loop system and examine a system using state variable techniques.']
                                    ]
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
                                        // Solid border around the entire table
                                        hLineStyle: function (i, node) {
                                            return null; // Solid line
                                        },
                                        vLineStyle: function (i, node) {
                                            return null; // Solid line
                                        },
                                    },
                                margin: [0, 0, 0, 10]
                            }
                        ],
                        // Articulation Matrix
                        [
                            {
                                text: 'Articulation Matrix', fontSize: 9, bold: true, margin: [0, 10, 0, 5]
                            }
                        ],
                        [
                            {
                                table: {
                                    widths: ['7%', '7%', '7%', '7%', '7%', '7%', '7%', '7%', '7%', '7%', '7%', '7%', '7%','7%'],
                                    body: [
                                        [
                                            { text: 'CO. No.', fontSize: 9, bold: true }, { text: 'PO1', fontSize: 9, bold: true }, { text: 'PO2', fontSize: 9, bold: true }, { text: 'PO3', fontSize: 9, bold: true }, { text: 'PO4', fontSize: 9, bold: true }, { text: 'PO5', fontSize: 9, bold: true }, { text: 'PO6', fontSize: 9, bold: true }, { text: 'PO7', fontSize: 9, bold: true }, { text: 'PO8', fontSize: 9, bold: true }, { text: 'PO9', fontSize: 9, bold: true }, { text: 'PO10', fontSize: 9, bold: true }, { text: 'PO11', fontSize: 9, bold: true }, { text: 'PSO1', fontSize: 9, bold: true }, { text: 'PSO2', fontSize: 9, bold: true }
                                        ],
                                        [
                                            { text: '1', fontSize: 9 }, { text: '3', fontSize: 9 }, { text: '3', fontSize: 9 }, { text: '1', fontSize: 9 }, { text: '3', fontSize: 9 }, '', '', '', '', '', '', '', { text: '3', fontSize: 9 },''
                                        ],
                                        [
                                            { text: '2', fontSize: 9 }, { text: '1', fontSize: 9 }, '', { text: '2', fontSize: 9 }, { text: '3', fontSize: 9 }, { text: '3', fontSize: 9 }, '', { text: '2', fontSize: 9 }, '', '', '', '', { text: '3', fontSize: 9 },''
                                        ],
                                        [
                                            { text: '3', fontSize: 9 }, { text: '2', fontSize: 9 }, '', { text: '3', fontSize: 9 }, { text: '3', fontSize: 9 }, { text: '3', fontSize: 9 }, '', { text: '3', fontSize: 9 }, '', '', '', '', { text: '3', fontSize: 9 },''
                                        ],
                                        [
                                            { text: '4', fontSize: 9 }, { text: '3', fontSize: 9 }, { text: '3', fontSize: 9 }, { text: '1', fontSize: 9 }, { text: '3', fontSize: 9 }, '', '', '', '', '', '', '', { text: '3', fontSize: 9 },''
                                        ],
                                        [
                                            { text: '5', fontSize: 9 }, { text: '2', fontSize: 9 }, '', { text: '3', fontSize: 9 }, { text: '3', fontSize: 9 }, { text: '1', fontSize: 9 }, '', { text: '3', fontSize: 9 }, '', '', '', '', { text: '2', fontSize: 9 },''
                                        ],
                                        // Additional rows as needed...
                                    ]
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
                                    // Solid border around the entire table
                                    hLineStyle: function (i, node) {
                                        return null; // Solid line
                                    },
                                    vLineStyle: function (i, node) {
                                        return null; // Solid line
                                    },
                                },
                                margin: [0, 0, 0, 10]
                            }
                        ],
                        // Syllabus Sections
                        [
                            {
                              table: {
                                widths: [50, '*', 50], // Adjust column widths as needed
                                body: [
                                
                                  ['UNIT I', 'MATHEMATICAL MODEL OF PHYSICAL SYSTEMS', '10 Hours'],
                                  [{
                                    text: ' ',
                                    border: [false, false, false, false], // Remove borders for description row
                                    colSpan: 3,
                                    margin: [0, 5, 0, 0],
                                    table: {
                                      widths: ['*'],
                                      body: [
                                        [{ text: 'Introduction- Basic Elements of control Systems-Open loop and closed loop system - Elements of Control system - Transfer function of mechanical translational and rotational system electrical system - Electrical analogy of mechanical system - Block diagram reduction technique - Signal flow graph.', fontSize: 11 }]
                                      ]
                                    },
                                    layout: 'noBorders'
                                  }, {}, {}],
                                  ['UNIT II', 'TIME DOMAIN ANALYSIS', '8 Hours'],
                                  [{
                                    text: ' ',
                                    border: [false, false, false, false], // Remove borders for description row
                                    colSpan: 3,
                                    margin: [0, 5, 0, 0],
                                    table: {
                                      widths: ['*'],
                                      body: [
                                        [{ text: 'Standard test signals - Time response of first order and second order systems for unit step test signals - Time domain Specifications-Steady state response - Static error constants - steady state error - Effects of proportional derivative proportional integral systems.', fontSize: 11 }]
                                      ]
                                    },
                                    layout: 'noBorders'
                                  }, {}, {}],
                                  ['UNIT III', 'FREQUENCY DOMAIN ANALYSIS', '9 Hours'],
                                  [{
                                    text: ' ',
                                    border: [false, false, false, false], // Remove borders for description row
                                    colSpan: 3,
                                    margin: [0, 5, 0, 0],
                                    table: {
                                      widths: ['*'],
                                      body: [
                                        [{ text: 'Frequency response of systems - Frequency domain specifications - Correlation between frequency domain and time domain specifications - Bode plot Polar plot.', fontSize: 11 }]
                                      ]
                                    },
                                    layout: 'noBorders'
                                  }, {}, {}],
                                  ['UNIT IV', 'STABILITY ANALYSIS OF CONTROL SYSTEM', '9 Hours'],
                                  [{
                                    text: ' ',
                                    border: [false, false, false, false], // Remove borders for description row
                                    colSpan: 3,
                                    margin: [0, 5, 0, 0],
                                    table: {
                                      widths: ['*'],
                                      body: [
                                        [{ text: 'Concepts of stability - Necessary conditions for Stability-Characteristics equation - Location of roots in S plane for stability - Routh Hurwitz criterion-Nyquist stability criterion- Root Locus technique- Relative Stability.', fontSize: 11 }]
                                      ]
                                    },
                                    layout: 'noBorders'
                                  }, {}, {}],
                                  ['UNIT V', 'COMPENSATOR DESIGN', '9 Hours'],
                                  [{
                                    text: ' ',
                                    border: [false, false, false, false], // Remove borders for description row
                                    colSpan: 3,
                                    margin: [0, 5, 0, 0],
                                    table: {
                                      widths: ['*'],
                                      body: [
                                        [{ text: 'Compensators Deign of Lag compensator - Lead compensator - Lag-lead compensator (using Bode plot) - Concept of state state variable state model Controllability and observability.', fontSize: 11 }]
                                      ]
                                    },
                                    layout: 'noBorders'
                                  }, {}, {}],
                                   [ { text: 'Tutorial', alignment: 'right', fontSize: 11, margin: [0, 10, 0, 10] ,colSpan: 2 },{ text: ''}, '15 Hours'],
          [ { text: 'Total', alignment: 'right', fontSize: 11, margin: [0, 0, 0, 10], colSpan: 2 },{ text: '' }, '60 Hours']
                                ]
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
                                // Solid border around the entire table
                                hLineStyle: function (i, node) {
                                    return null; // Solid line
                                },
                                vLineStyle: function (i, node) {
                                    return null; // Solid line
                                },
                            },
                            margin: [0, 0, 0, 0]
                            }
                          ],
                       
                        // References
                        [
                            { text: 'References', fontSize: 10, bold: true, margin: [0, 10, 0, 5] },
                        ],
                        [
                            {
                                ul: [
                                    { text: 'I.J.Nagrath and M.Gopal Control System Engineering NewAge International Publisher 2018', fontSize: 11 },
                                    { text: 'M.Gopal Control System Principles and Design TataMcGraw-Hill 2012.', fontSize: 11 },
                                    { text: 'K.Ogatta Modern Control Engineering Pearson Education NewDelhi 2015', fontSize: 11 },
                                    { text: 'BenjaminC. Kuo Automatic Control Systems Prentice-Hall of India Pvt. Ltd. 2014', fontSize: 11 },
                                    { text: 'M.N.Bandyopadhyay Control Engineering Theory and Practice 9thEdition John Wiley & Sons 2006.', fontSize: 11 },
                                    { text: 'https://archive.nptel.ac.in/courses/107/106/107106081/', fontSize: 11 }
                                ],
                                margin: [0, 0, 0, 10]
                            }
                        ]
                    ]
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
                    // Solid border around the entire table
                    hLineStyle: function (i, node) {
                        return null; // Solid line
                    },
                    vLineStyle: function (i, node) {
                        return null; // Solid line
                    },
                }
            }
        ],
       
        defaultStyle: {
            font: 'Roboto'
        }
    };

    res.setHeader('Content-Type', 'application/pdf');
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(res);
    pdfDoc.end();
};
