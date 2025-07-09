import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

// Context Providers
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

// Shared Components
import { Layout } from './components/shared/Layout';
import { LoginForm } from './components/auth/LoginForm';

// ==============================
// 🚀 Agent Components
// ==============================
import { AgentDashboard } from './components/agent/AgentDashboard';
import { CallsPage } from './components/agent/CallsPage';
import { TicketsPage } from './components/agent/TicketsPage';
import { ContactsPage } from './components/agent/ContactsPage';
import { TasksPage } from './components/agent/TasksPage';
import { MeetingsPage } from './components/agent/MeetingsPage';
import { KnowledgeBasePage } from './components/agent/KnowledgeBasePage';
import { SettingsPage } from './components/agent/SettingsPage';
import { HelpPage } from './components/agent/HelpPage';
import { NotificationPage } from './components/agent/NotificationPage';
// 👇 New Lead Management page for agents
import { LeadsPage } from './components/agent/LeadsPage';

// ==============================
// 🛠️ Admin Components
// ==============================
import { AdminDashboard } from './components/admin/AdminDashboard';
import { UserManagement } from './components/admin/UserManagement';
import { DepartmentManagement } from './components/admin/DepartmentManagement';
import { TicketManagement } from './components/admin/TicketManagement';
import { CallManagement } from './components/admin/CallManagement';
import { TelephonyManagement } from './components/admin/TelephonyManagement';
import { ReportManagement } from './components/admin/ReportManagement';
import { KnowledgeBaseManagement } from './components/admin/KnowledgeBaseManagement';
import { ContactManagement } from './components/admin/ContactManagement';
import { PermissionManagement } from './components/admin/PermissionManagement';
import { CustomFieldBuilder } from './components/admin/CustomfieldBuilder';
import { AuditLogManagement } from './components/admin/AuditLogManagement';
import { NotificationManagement } from './components/admin/NotificationManagement';
// 👇 New Lead Management page for admins
import { LeadManagement } from './components/admin/LeadManagement';

// ==============================
// 🔐 Protected Route Wrapper
// ==============================
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-spin h-10 w-10 rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

// ==============================
// 🧠 Role-Based Route Wrapper
// ==============================
const RoleBasedRoute: React.FC<{
  children: React.ReactNode;
  allowedRole: 'admin' | 'agent';
}> = ({ children, allowedRole }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== allowedRole) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  return <>{children}</>;
};

// ==============================
// 📦 App Routes
// ==============================
const AppRoutes: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      {/* Public Login Route */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to={`/${user?.role}/dashboard`} replace />
          ) : (
            <LoginForm />
          )
        }
      />

      {/* Protected Layout Route */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Redirect root to dashboard */}
        <Route index element={<Navigate to={`/${user?.role}/dashboard`} replace />} />

        {/* ------------------------ AGENT ROUTES ------------------------ */}
        <Route
          path="agent/*"
          element={
            <RoleBasedRoute allowedRole="agent">
              <Routes>
                <Route path="dashboard" element={<AgentDashboard />} />
                <Route path="calls" element={<CallsPage />} />
                <Route path="tickets" element={<TicketsPage />} />
                <Route path="contacts" element={<ContactsPage />} />
                <Route path="tasks" element={<TasksPage />} />
                <Route path="meetings" element={<MeetingsPage />} />
                <Route path="knowledge" element={<KnowledgeBasePage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="help" element={<HelpPage />} />
                <Route path="notifications" element={<NotificationPage />} />
                {/* 👇 New route for leads */}
                <Route path="leads" element={<LeadsPage />} />
              </Routes>
            </RoleBasedRoute>
          }
        />

        {/* ------------------------ ADMIN ROUTES ------------------------ */}
        <Route
          path="admin/*"
          element={
            <RoleBasedRoute allowedRole="admin">
              <Routes>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<UserManagement />} />
                <Route path="departments" element={<DepartmentManagement />} />
                <Route path="tickets" element={<TicketManagement />} />
                <Route path="calls" element={<CallManagement />} />
                <Route path="telephony" element={<TelephonyManagement />} />
                <Route path="reports" element={<ReportManagement />} />
                <Route path="knowledge" element={<KnowledgeBaseManagement />} />
                <Route path="contacts" element={<ContactManagement />} />
                <Route path="permissions" element={<PermissionManagement />} />
                <Route path="custom-fields" element={<CustomFieldBuilder />} />
                <Route path="audit" element={<AuditLogManagement />} />
                <Route path="notifications" element={<NotificationManagement />} />
                {/* 👇 New route for lead management */}
                <Route path="leads" element={<LeadManagement />} />
              </Routes>
            </RoleBasedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

// ==============================
// 🚀 Main App Entry
// ==============================
const App: React.FC = () => {
  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
        <AuthProvider>
          <AppProvider>
            <AppRoutes />
          </AppProvider>
        </AuthProvider>
      </DndProvider>
    </Router>
  );
};

export default App;
