import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import ResetPasswordScreen from "./Screens/ResetPasswordScreen";
import RewritePasswordScreen from "./Screens/RewritePasswordScreen";
import ProtectedRoute from "./Components/ProtectedRoute";
import ProfileModal from "./Components/ProfileModal";
import WorkspacesScreen from "./Screens/WorkspacesScreen";
import WorkspaceIdScreen from "./Screens/WorkspaceIdScreen";


function App() {
  return (
    <>
      <div>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/" element={<LoginScreen />} />
          <Route path="/rewrite-password" element={<RewritePasswordScreen />} />
          <Route path="/reset-password" element={<ResetPasswordScreen />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfileModal />} />
            <Route path="/workspaces" element={<WorkspacesScreen />} />
            <Route path="/workspaces/:workspaceId" element={<WorkspaceIdScreen />} />
            
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App
