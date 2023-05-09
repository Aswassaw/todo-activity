import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      data-cy="header-background"
      className="bg-blue navbar bg-body-tertiary py-4"
    >
      <div className="container w-primary">
        <Link
          data-cy="header-title"
          className="navbar-brand fs-4 text-white fw-bold"
          to={"/"}
        >
          TO DO LIST APP
        </Link>
      </div>
    </nav>
  );
}
