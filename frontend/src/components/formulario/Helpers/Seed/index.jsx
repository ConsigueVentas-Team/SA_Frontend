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
        <h1 className="ml-1 text-base font-medium md:ml-2">Empresa</h1>
      </Link>
      <Link
        to={`/empresa/${actual}`}
        className="flex items-center text-white font-medium uppercase text-base "
      >
        <h1 className="ml-1 text-base font-medium md:ml-2">{actual}</h1>
      </Link>
    </Breadcrumbs>
  );
}
