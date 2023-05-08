import React from "react";

type Props = {};

function ListIcon({}: Props) {
  return (
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="4 4 24 24"
    >
      <g data-name="47-List">
        <path d="M13 8h12v2H13zM13 15h12v2H13zM13 22h12v2H13z" />
        <circle cx="9" cy="9" r="2" />
        <circle cx="9" cy="16" r="2" />
        <circle cx="9" cy="23" r="2" />
      </g>
    </svg>
  );
}

export default ListIcon;
