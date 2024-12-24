import React from "react";

interface Column {
  id: string | number;
  label: string;
  align?: 'left' | 'right' | 'middle'; 
}

interface Props {
  data: Column[]; 
}

 const Tableheader = ({ data }:Props) => {
  return (
    <>
     <div className="table-header-group bg-blue-100 border-b-2 border-gray-300 shadow-sm">
      <div className="table-row text-left py-4 px-4 font-bold text-gray-700">
        {data.map((d) => (
        <div
        className={`table-cell ${d.align} px-4 py-2 border-r border-gray-200 last:border-r-0`}
        key={d.id}
        >
          {d.label}
        </div>
      ))}
      </div>
    </div>

    </>
  );
};

export default Tableheader;