import React, { useEffect } from "react";
import Navbar from "../components/Navbar";

export default function NotFound() {
  useEffect(() => {
    document.title = `404 Not Found`;
  }, []);

  return (
    <>
      <Navbar />
      <h1 className="p-5 text-center fw-bold">404 Not Found</h1>
    </>
  );
}
