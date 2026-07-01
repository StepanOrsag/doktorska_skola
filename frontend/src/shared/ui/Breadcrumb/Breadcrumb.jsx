import { NavLink } from "react-router-dom";
import "./Breadcrumb.css";

function Breadcrumb({ current, parent = { label: "PŘEHLED AKCÍ", to: "/" } }) {
  return (
    <div className="breadcrumb">
      <NavLink to={parent.to} className="breadcrumb-link">{parent.label}</NavLink>
      <h1> &gt; {current}</h1>
    </div>
  );
}

export default Breadcrumb;
