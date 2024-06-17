import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Form from "./Form";

const Navigation = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="bg-[#a3a8ac] h-[100vh] overflow-hidden">
      <div className="border-b-2 border-gray-400 z-50 w-full absolute">
        <nav className="-mb-0.5 flex justify-center space-x-6 gap-5">
          <Link
            to="/form/first"
            className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 ${
              isActive("/form/first")
                ? "border-blue-500 text-blue-800"
                : "border-transparent text-gray-500 hover:text-blue-600"
            } text-xl font-bold  whitespace-nowrap focus:outline-none focus:text-blue-800`}
          >
           First Form 
          </Link>
          <Link
            to="/form/second"
            className={`py-4 px-1 inline-flex items-center gap-2 border-b-2 ${
              isActive("/form/second")
                ? "border-blue-500 text-blue-800"
                : "border-transparent text-gray-500 hover:text-blue-600"
            } text-xl font-bold whitespace-nowrap focus:outline-none focus:text-blue-800`}
          >
            Second Form
          </Link>
        </nav>
      </div>

      <Routes>
        <Route path="/form/:formType" element={<Form />} />
      </Routes>
      <div className="flex items-center justify-center min-h-screen bg-[#F9FAFB]">
        {!isActive("/form/first") && !isActive("/form/second") && (
          <h1 className="text-5xl font-semibold text-green-600">
           Please Select The Form
          </h1>
        )}
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <Navigation />
  </Router>
);

export default App;
