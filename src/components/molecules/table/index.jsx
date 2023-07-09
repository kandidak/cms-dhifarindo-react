import React from "react"
import { useTable, usePagination, useRowSelect } from "react-table"
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react"

const Table = ({
  columns,
  data,
  title,
  onRowClick = () => null,
  isShowNumber = true,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination,
    useRowSelect
  )

  return (
    <>
    <Card>
      <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
        <Typography variant="h6" color="white">
          {title}
        </Typography>
      </CardHeader>
      <CardBody className="overflow-x-scroll pt-0 pb-2">
      <table className="w-full" {...getTableProps()}>
        <thead className="border-b border-gray-300">
          {headerGroups.map((headerGroup, i) => (
            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
              {/* {isShowNumber && (
                <th className="uppercase font-bold pb-4 px-4 text-left w-auto">
                  No.
                </th>
              )} */}
              {headerGroup.headers.map((column, idx) => (
                <th
                  key={idx}
                  className="uppercase font-bold pb-4 px-4 text-left w-fit"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)

            return (
              <tr
                key={i}
                {...row.getRowProps()}
                onClick={() => onRowClick(row.original)}
                className={`${i % 2 == 0 ? "bg-[#F1F5F8]" : ""}`}
              >
                {/* {isShowNumber && (
                  <td className="py-3 px-4 border-b cursor-pointer w-auto">
                    {i + 1}
                  </td>
                )} */}
                {row.cells.map((cell, idx) => {
                  return (
                    <td
                      key={idx}
                      className="py-3 px-4 border-b cursor-pointer w-auto"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="w-fit space-x-4 ml-auto mt-4">
        <button
          className={`${canPreviousPage ? "text-black" : "text-[#D9D9D9]"}`}
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {"<<"}
        </button>
        <button
          className={`${canPreviousPage ? "text-black" : "text-[#D9D9D9]"}`}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </button>
        <span>{pageIndex + 1}</span>
        <button
          className={`${canNextPage ? "text-black" : "text-[#D9D9D9]"}`}
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </button>
        <button
          className={`${canNextPage ? "text-black" : "text-[#D9D9D9]"}`}
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {">>"}
        </button>
        {/* <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span> */}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      </CardBody>
      </Card>
    </>
  )
}

export default Table;