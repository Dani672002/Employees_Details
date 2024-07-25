import React, { Suspense, lazy } from "react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import LoaderComponent from "./components/LoaderComponents";

const Login = lazy(() => import("./components/LoginComponents"));
const Dashboard = lazy(() => import("./components/dashboardComponents"));
const Employee = lazy(()=>import ("../src/components/employeeComponents"))
const EmployeeList =lazy(()=>import("../src/components/employeeListComponents"))
const Editemployee =lazy(()=>import("../src/components/editEmployeeComponents"))
function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <BrowserRouter>
        <Suspense fallback={<LoaderComponent isOpen={true} handleClose={() => {}} />}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path ="/employee" element={<Employee/>}/>
            <Route path="/list" element={<EmployeeList/>}/>
            <Route path="/editemployee/:id" element={<Editemployee />} />
            </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
