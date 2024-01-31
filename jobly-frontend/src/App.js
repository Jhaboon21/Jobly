import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage';
import LoadingSpinner from "./common/LoadingSpinner";
import JoblyApi from "./api/api";
import UserContext from "./routes/auth/UserContext";
import Navigation from "./routes/navigation/NavBar";
import RouteList from "./routes/navigation/Routes";
import jwt from "jsonwebtoken";
import './App.css';

export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [appId, setAppId] = useState(new Set([]));
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          JoblyApi.token = token;
          let currUser = await JoblyApi.getCurrentUser(username);
          setCurrUser(currUser);
          setAppId(new Set(currUser.applications));
          } catch (err) {
          console.error("problem loading user info", err);
          setCurrUser(null);
        }
      }
      setIsLoaded(true); 
    }

    // isLoaded is set to false while getCurrentUser is running
    setIsLoaded(false);
    getCurrentUser();
  }, [token]);

  // Handle site-wide logout
  function logout() {
    setCurrUser(null);
    setToken(null);
  }

  // Handle site-wide signup
  async function signup(signupData) {
    try{ 
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("signup failed", err);
      return { success: false, err};
    }
  }

  // Handle site-wide login
  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("login failed", err);
      return { success: false, err};
    }
  }

  // validate if the job has been applied for
  function hasAppliedToJob(id) {
    return appId.has(id);
  }

  // Apply to the job and update the api
  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;

    JoblyApi.applyToJob(currUser.username, id);
    setAppId(new Set([...appId, id]));
  }

  // while fetching data, display the loading page
  if (!isLoaded) return <LoadingSpinner />;

  return (
    <BrowserRouter>
      <UserContext.Provider
          value={{ currentUser: currUser, setCurrUser, hasAppliedToJob, applyToJob }}>
        <div className="App">
          <Navigation logout={logout} />
          <RouteList login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
