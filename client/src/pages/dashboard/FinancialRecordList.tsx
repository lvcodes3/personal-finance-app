import { useMemo } from "react";
import { useTable, Column } from "react-table";

import {
  useFinancialRecord,
  FinancialRecord,
} from "../../contexts/financialRecordContext";

import { EditableCell } from "./EditableCell";

export const FinancialRecordList = () => {
  const { records, updateRecord, deleteRecord } = useFinancialRecord();

  const updateCellRecord = (
    rowIdx: number,
    columnId: string,
    value: unknown
  ) => {
    const id = records[rowIdx]._id;
    updateRecord(id ?? "", { ...records[rowIdx], [columnId]: value });
  };

  const columns: Array<Column<FinancialRecord>> = useMemo(
    () => [
      {
        Header: "Description",
        accessor: "description",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
          />
        ),
      },
      {
        Header: "Amount",
        accessor: "amount",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
          />
        ),
      },
      {
        Header: "Category",
        accessor: "category",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
          />
        ),
      },
      {
        Header: "Payment",
        accessor: "payment",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={true}
          />
        ),
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: (props) => (
          <EditableCell
            {...props}
            updateRecord={updateCellRecord}
            editable={false}
          />
        ),
      },
      {
        Header: "Delete",
        id: "delete",
        Cell: ({ row }) => (
          <button
            onClick={() => deleteRecord(row.original._id ?? "")}
            className="p-1 font-medium border-[1px] rounded-md bg-red-500"
          >
            Delete
          </button>
        ),
      },
    ],
    [records]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: records });

  return (
    <table {...getTableProps()} className="w-[900px]">
      <thead className="bg-blue-500">
        {headerGroups.map((hg, idx) => (
          <tr {...hg.getHeaderGroupProps()} key={idx}>
            {hg.headers.map((column, idx) => (
              <th
                {...column.getHeaderProps()}
                key={idx}
                className="p-4 border-[1px]"
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className="text-center bg-slate-700">
        {rows.map((row, idx) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={idx}>
              {row.cells.map((cell, idx) => (
                <td
                  {...cell.getCellProps()}
                  key={idx}
                  className="p-4 border-[1px]"
                >
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
