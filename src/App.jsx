import { Route, Routes } from "react-router-dom";

// Auth Provider
import { UserAuthContextProvider } from "./context/UserAuthContext";

// Importing Components
import Login from "./authentication/Login";
import Signup from "./authentication/Signup";
import ForgotPassword from "./authentication/ForgotPassword";
import ProtectedRoute from "./authentication/ProtectedRoute";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";
import EditProfile from "./user/EditProfile"
import AllBadges from "./pages/AllBadges";

function App() {
  return (
    <div>
      <UserAuthContextProvider>
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<Homepage />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/all-badges"
            element={
              <ProtectedRoute>
                <AllBadges />
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserAuthContextProvider>
    </div>
  );
}

export default App;
