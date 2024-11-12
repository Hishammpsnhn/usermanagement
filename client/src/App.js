import "./App.css";
import Auth from "./pages/Auth";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import React, { Profiler, Suspense, useEffect, useState } from "react";
import { fetchUser } from "./store/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import AdminPage from "./pages/AdminPage";

// const LazyProfile = React.lazy(() => import("./pages/Profile.jsx"));

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      dispatch(fetchUser()).then((res) => {
        setLoading(false);
      });
    }
  }, [isAuthenticated, dispatch]);
  if (loading) {
    return <>loading....</>;
  }
  const logProfilerData = (id, phase, actualDuration, baseDuration, startTime, commitTime, interactions) => {
    console.log(`Profiler ID: ${id}`);
    console.log(`Phase: ${phase}`); // 'mount' or 'update'
    console.log(`Actual Duration: ${actualDuration}ms`); // Time to render this update
    console.log(`Base Duration: ${baseDuration}ms`); // Estimated duration to render
    console.log(`Start Time: ${startTime}`);
    console.log(`Commit Time: ${commitTime}`);
    console.log("Interactions:", interactions); // Set of interactions belonging to this render
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>
     <Profiler id="RoutesProfiler" onRender={logProfilerData}>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Profiler>
    </Suspense>
  );
}

export default App;
