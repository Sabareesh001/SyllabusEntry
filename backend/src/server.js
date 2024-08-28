const express = require("express");
const app = express();
const apiRoutes = require("./routes/api"); // Adjust the path if necessary
const cors = require("cors");
const verifyToken = require("./middlewares/authMiddleware");
app.use(cors());
const AuthRoutes = require("./routes/auth");
const courseRoutes = require('./routes/course')
const courseObjectiveRoutes = require('./routes/courseObjective')
const courseOutcomeRoutes = require('./routes/courseOutcomes')
const programmeOutcomeRoutes = require('./routes/programmeOutcomes')
// Middleware
app.use(express.json());

// API Routes
app.use("/auth", AuthRoutes); // Unprotected routes for authentication
app.use(
  "/api",
  verifyToken,
); // Protected routes
app.use("/", verifyToken, apiRoutes,courseRoutes,courseObjectiveRoutes,courseOutcomeRoutes,programmeOutcomeRoutes); // Protected routes for other API functionality

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
