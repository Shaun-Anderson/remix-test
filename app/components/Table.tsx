import React, { forwardRef, useRef } from "react";
import {
  TableOptions,
  useTable,
  useSortBy,
  UseSortByOptions,
  useFlexLayout,
  useAsyncDebounce,
  UseGlobalFiltersOptions,
  useFilters,
  useGlobalFilter,
  CellProps,
  HeaderProps,
  Hooks,
  useRowSelect,
  usePagination,
  TableInstance,
  HeaderGroup,
} from "react-table";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  SwitchVerticalIcon,
  SearchIcon,
  FilterIcon,
  DotsVerticalIcon,
  DownloadIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/outline";
import { Input } from "./Input";
import { Button } from "./Button";
import { ExportMenu } from "./ExportMenu";
import FilterPanel from "./FilterPanel";
import generateExcel from "zipcelx";

type PrimitiveType = string | Symbol | number | boolean;

/** Component */

interface MinTableItem {
  id: PrimitiveType;
}

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: any) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Input
      leadingIcon={
        <SearchIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
      }
      rounded="md"
      value={value || ""}
      onChange={(e) => {
        setValue(e.currentTarget.value);
        onChange(e.currentTarget.value);
      }}
      className="text-gray-400"
      placeholder={`Search ${count} records...`}
    />
  );
}
const areEqual = (prevProps: any, nextProps: any) =>
  prevProps.checked === nextProps.checked &&
  prevProps.indeterminate === nextProps.indeterminate;

const HeaderCheckbox = React.memo(
  (props) => (
    <>
      <input
        type="checkbox"
        {...props}
        className=" appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
      />
    </>
  ),
  areEqual
);

// const IndeterminateCheckbox = React.forwardRef(
//   ({ indeterminate, ...rest }: any, ref) => {
//     const defaultRef = React.useRef();
//     const resolvedRef = ref || (defaultRef as any);

//     React.useEffect(() => {
//       resolvedRef.current.indeterminate = indeterminate;
//     }, [resolvedRef, indeterminate]);

//     return (
//       <>
//         <input type="checkbox" ref={resolvedRef} {...rest} />
//       </>
//     );
//   }
// );

const RowCheckbox = React.memo(
  (props) => (
    <>
      <input
        type="checkbox"
        {...props}
        className=" appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-indigo-600 checked:border-indigo-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
      />
    </>
  ),
  areEqual
);

const selectionHook = (hooks: Hooks<any>) => {
  console.log(hooks);
  hooks.allColumns.push((columns) => [
    // Let's make a column for selection
    {
      id: "_selector",
      disableResizing: true,
      disableGroupBy: true,
      minWidth: 45,
      width: 45,
      maxWidth: 45,
      Aggregated: undefined,
      // The header can use the table's getToggleAllRowsSelectedProps method
      // to render a checkbox
      Header: ({ getToggleAllRowsSelectedProps }: HeaderProps<any>) => (
        <HeaderCheckbox {...getToggleAllRowsSelectedProps()} />
      ),
      // The cell can use the individual row's getToggleRowSelectedProps method
      // to the render a checkbox
      Cell: ({ row }: CellProps<any>) => (
        <RowCheckbox {...row.getToggleRowSelectedProps()} />
      ),
    },
    ...columns,
  ]);
  hooks.useInstanceBeforeDimensions.push(({ headerGroups }) => {
    // fix the parent group of the selection button to not be resizable
    const selectionGroupHeader = headerGroups[0].headers[0];
    selectionGroupHeader.canResize = false;
  });
};

interface TableProps<T extends object> extends TableOptions<T> {
  pagination?: boolean;
  checkboxSelection?: boolean;
}

export default function Table<T extends MinTableItem>(props: TableProps<T>) {
  const table = useTable(
    { ...props },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useFlexLayout,
    usePagination,
    useRowSelect,
    props.checkboxSelection ? selectionHook : () => {}
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    table;

  function getHeader(column: HeaderGroup<T>) {
    if (!column.totalHeaderCount) {
      return [
        {
          value: column.Header,
          type: "string",
        },
      ];
    }

    if (column.totalHeaderCount === 1) {
      return [
        {
          value: column.Header,
          type: "string",
        },
      ];
    } else {
      const span = [...Array(column.totalHeaderCount - 1)].map((x) => ({
        value: "",
        type: "string",
      }));
      return [
        {
          value: column.Header,
          type: "string",
        },
        ...span,
      ];
    }
  }

  type ExcelCell = {
    value: string | number;
    type: "string" | "number";
  };

  type ExcelRow = Array<ExcelCell>;

  function getExcel() {
    const config = {
      filename: "general-ledger-Q1",
      sheet: {
        data: [],
      },
    };

    const dataSet: Array<ExcelRow> = config.sheet.data;

    // HEADERS
    headerGroups.forEach((headerGroup) => {
      const headerRow: any[] = [];
      if (headerGroup.headers) {
        headerGroup.headers.forEach((column) => {
          headerRow.push(...getHeader(column));
        });
      }

      dataSet.push(headerRow);
    });

    // FILTERED ROWS
    if (rows.length > 0) {
      rows.forEach((row) => {
        const dataRow: any[] = [];

        Object.values(row.values).forEach((value) =>
          dataRow.push({
            value,
            type: typeof value === "number" ? "number" : "string",
          })
        );

        dataSet.push(dataRow);
      });
    } else {
      dataSet.push([
        {
          value: "No data",
          type: "string",
        },
      ]);
    }

    return generateExcel(config);
  }

  // Row Renders
  const RowRender = (table: TableInstance<T>) => {
    return rows.length > 0 ? (
      // Loop over the table rows
      rows.map((row) => {
        // Prepare the row for display
        prepareRow(row);
        return (
          // Apply the row props
          <div
            {...row.getRowProps()}
            className={`border-b border-gray-100 last:border-b-0 ${
              row.isSelected ? "bg-gray-100" : null
            }`}
          >
            {
              // Loop over the rows cells
              row.cells.map((cell) => {
                // Apply the cell props
                return (
                  <div
                    {...cell.getCellProps({
                      style: {
                        // minWidth: cell.column.minWidth,
                        // width: cell.column.width,
                        justifyContent:
                          cell.column.align === "right"
                            ? "flex-end"
                            : "flex-start",
                      },
                    })}
                    className={`text-xs text-gray-600 font-light px-6 py-2 whitespace-nowrap ${
                      cell.column.id === "_selector" ? "relative" : "flex"
                    }  self-center `}
                  >
                    {
                      // Render the cell contents
                      cell.render("Cell")
                    }
                  </div>
                );
              })
            }
          </div>
        );
      })
    ) : (
      <div className="text-xs text-gray-300 p-4 text-center">No data</div>
    );
  };
  const PageRowRender = (table: TableInstance<T>) => {
    // Loop over the table rows
    return table.page.length > 0 ? (
      // Loop over the table rows
      table.page.map((row) => {
        // Prepare the row for display
        prepareRow(row);
        return (
          // Apply the row props
          <div
            {...row.getRowProps()}
            className={`border-b border-gray-100 last:border-b-0 ${
              row.isSelected ? "bg-gray-100" : null
            }`}
          >
            {
              // Loop over the rows cells
              row.cells.map((cell) => {
                // Apply the cell props
                return (
                  <div
                    {...cell.getCellProps({
                      style: {
                        minWidth: cell.column.minWidth,
                        width: cell.column.width,
                        overflow: "hidden",
                        justifyContent:
                          cell.column.align === "right"
                            ? "flex-end"
                            : "flex-start",
                      },
                    })}
                    className={`text-xs text-gray-600 font-light px-6 py-2 whitespace-nowrap ${
                      cell.column.id === "_selector" ? "relative" : "flex"
                    }  self-center `}
                  >
                    {
                      // Render the cell contents
                      cell.render("Cell")
                    }
                  </div>
                );
              })
            }
          </div>
        );
      })
    ) : (
      <div className="text-xs text-gray-300 p-4 text-center">No data</div>
    );
  };

  return (
    <div {...getTableProps()} className="min-w-full overflow-visible ">
      {/* Toolbar */}
      <div className="p-1 flex">
        <div className="flex items-center">
          {/* <span className="text-xs font-bold mr-4 ml-4 self-center ">
              Test table
            </span> */}
          <GlobalFilter
            preGlobalFilteredRows={table.preGlobalFilteredRows}
            globalFilter={table.state.globalFilter}
            setGlobalFilter={table.setGlobalFilter}
          />
          <FilterPanel<T>
            setAllFilters={table.setAllFilters}
            setFilter={table.setFilter}
            filters={table.state.filters}
          />
        </div>
        <div className=" ml-auto">
          <ExportMenu excelExport={getExcel} />
          <button className=" rounded-md bg-transparent p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100">
            <DotsVerticalIcon className="h-4 w-4 " aria-hidden="true" />
          </button>
        </div>
      </div>
      {/* Overflow x container */}
      <div className=" overflow-x-auto">
        {/* Headers */}
        <div className="border-b-2 border-gray-100 ">
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Aplicamos las propiedades de ordenación a cada columna
                <div
                  {...column.getHeaderProps({
                    style: {
                      minWidth: column.minWidth,
                      width: column.width,
                    },
                    ...column.getSortByToggleProps(),
                  })}
                  className={`${
                    column.isSorted
                      ? column.isSortedDesc
                        ? "desc"
                        : "asc"
                      : ""
                  } ${
                    column.align === "right" ? "justify-end" : "justify-start"
                  } group px-6 py-2 flex text-left text-xs font-medium text-gray-400 tracking-wider  select-none `}
                >
                  {column.canSort ? (
                    <div className="flex items-center justify-between">
                      {column.render("Header")}
                      {/* Add a sort direction indicator */}
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <ArrowDownIcon className="w-3 h-3 text-gray-400" />
                          ) : (
                            <ArrowUpIcon className="w-3 h-3 text-gray-400" />
                          )
                        ) : (
                          <SwitchVerticalIcon className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100" />
                        )}
                      </span>
                    </div>
                  ) : (
                    <>{column.render("Header")}</>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* Apply the table body props */}
        <div {...getTableBodyProps()}>
          {props.pagination ? PageRowRender(table) : RowRender(table)}
          {/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}
          {props.pagination && (
            <div className="pagination p-1 flex gap-1 items-center">
              <button
                className="relative rounded-md inline-flex items-center px-2 py-2   disabled:bg-white disabled:text-gray-200  text-sm font-medium text-gray-400 hover:bg-gray-50"
                onClick={() => table.gotoPage(0)}
                disabled={!table.canPreviousPage}
              >
                <ChevronDoubleLeftIcon className="h-4 w-4" aria-hidden="true" />
              </button>{" "}
              <button
                className="relative rounded-md inline-flex items-center px-2 py-2   disabled:bg-white disabled:text-gray-200  text-sm font-medium text-gray-400 hover:bg-gray-50"
                onClick={() => table.previousPage()}
                disabled={!table.canPreviousPage}
              >
                <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
              </button>{" "}
              <button
                className="relative rounded-md inline-flex items-center px-2 py-2   disabled:bg-white disabled:text-gray-200 text-sm font-medium text-gray-400 hover:bg-gray-50"
                onClick={() => table.nextPage()}
                disabled={!table.canNextPage}
              >
                <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
              </button>{" "}
              <button
                className="relative rounded-md inline-flex items-center px-2 py-2  disabled:bg-white disabled:text-gray-200 text-sm font-medium text-gray-400 hover:bg-gray-50"
                onClick={() => table.gotoPage(table.pageCount - 1)}
                disabled={!table.canNextPage}
              >
                <ChevronDoubleRightIcon
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </button>{" "}
              <span className="text-xs">
                Page{" "}
                <strong>
                  {table.state.pageIndex + 1} of {table.pageOptions.length}
                </strong>{" "}
              </span>
              {/* <span className="text-xs">
              | Go to page:{" "}
              <input
                type="number"
                defaultValue={table.state.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.gotoPage(page);
                }}
                style={{ width: "100px" }}
              />
            </span>{" "} */}
              <select
                value={table.state.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
                className="text-xs border rounded-md ml-auto p-1"
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
