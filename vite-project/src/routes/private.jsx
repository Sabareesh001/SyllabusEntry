import SyllabusEntry from "../pages/syllabusEntry/SyllabusEntry";

export const privateRoutes =(setTitle)=> [
    {
        path:'syllabusentry',
        element:<SyllabusEntry/>,
        authorizedRole:'user'
    }

]



// format 

    // {
    //     path:'',
    //     element:<Dashboard setTitle={setTitle}/>,
    //     authorizedRole:"faculty"
    // },
    // {
    //     path:'dashboard',
    //     element:<Dashboard setTitle={setTitle}/>,
    //     authorizedRole:"faculty"
    // },
    // {
    //     path:'allocation',
    //     element:<FacultyAllocation setTitle={setTitle}/>,
    //     authorizedRole:"hod"
    // },
    // {
    //     path:'allocationrequests',
    //     element:<FacultyAllocationRequests setTitle={setTitle}/>,
    //     authorizedRole:"coe"
    // },
    // {
    //     path:'foilcardentry',
    //     element:<FoilCard setTitle={setTitle}/>,
    //     authorizedRole:"coe"
    // },
    // {
    //     path:'report',
    //     element:<ReportDownloadPage setTitle={setTitle}/>,
    //     authorizedRole:"coe"
    // },
    // {
    //     path:'createsemcode',
    //     element:<COEpage setTitle={setTitle}/>,
    //     authorizedRole:"coe"
    // },
    // {
    //     path:'facultyapproval',
    //     element:<FacultyApprovalPage setTitle={setTitle}/>,
    //     authorizedRole:"faculty"
    // },
    // {
    //     path:'changerequests',
    //     element:<FacultyChangeRequests setTitle={setTitle}/>,
    //     authorizedRole:"coe"
    // }