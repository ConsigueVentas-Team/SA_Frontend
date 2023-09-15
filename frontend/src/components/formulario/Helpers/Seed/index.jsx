import { Breadcrumbs } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";
export default function ActiveLastBreadcrumb({ actual }) {
  return (
    <Breadcrumbs color="#BBBDBC">
      <Link
        to="/empresa"
        className=" gap-2 flex items-center text-base font-medium text-gray-500 hover:text-white uppercase"
      >
        <MapsHomeWorkOutlinedIcon />
        Empresa
      </Link>
      <Link
        to={`/empresa/${actual}`}
        className="flex items-center text-white font-medium uppercase"
      >
        {actual}
      </Link>
    </Breadcrumbs>
  );
}
