import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Tabs from "./tabs";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem("adminToken");

  useEffect(() => {
    if (!adminToken) {
      navigate("/"); // Navigate to the signup page if there is no token
    }
  }, [navigate, adminToken]);

  if (!adminToken) {
    return null;
  }

  return (
    <>
      <Navbar />
      <Tabs />
    </>
  );
}
