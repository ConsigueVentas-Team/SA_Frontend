import { Breadcrumbs } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function ActiveLastBreadcrumb({ actual }) {
  return (
    <Breadcrumbs color="#BBBDBC">
      <Link to="/empresa" className="font-medium">
        Empresa
      </Link>
      <Link
        to={`/empresa/${actual}`}
        className="font-sans capitalize font-medium"
      >
        {actual}
      </Link>
    </Breadcrumbs>
  );
}
