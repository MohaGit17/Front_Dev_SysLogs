import React, {useEffect, useMemo, useState } from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
import '../table.css';
import '../button.css';
import { GlobalFilter } from '../Filter';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

export function SwitchTable (props) {
  
  const [prodres, setprodres] = useState([]);

  const fetchprodres = async () => {
    const response = await axios
      .get("http://127.0.0.1:5000/all_res_logs")
      .catch((err) => console.log(err));

    if (response) {
      const prodres = response.data;
      setprodres(prodres);
      
    }
  };

  const data = useMemo(
    () => prodres
  );

  const columns = useMemo(
    () => [
      {
          Header : 'Option1',
          accessor : 'devip'
      },
      {
          Header : 'Time',
          accessor : 'datetime',
  
      },
      {
          Header : 'Option2',
          accessor : 'devid'
      },
      {
          Header : 'Option3',
          accessor : 'opt'
      },
      {
          Header : 'Message',
          accessor : 'msg'
      },
  ],
    []
  );
  
    
  const tableInstance = useTable(
    {
      columns,
      data
    },
    useGlobalFilter,
    useSortBy,
    usePagination,

  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,

    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    setGlobalFilter,
  } = tableInstance;
  
  


  const { pageIndex, globalFilter } = state

   
  useEffect(() => {
    fetchprodres();
  }, []);
  return (
    <>
      <GlobalFilter  filter={globalFilter} setFilter={setGlobalFilter} /> <br />
      <br />
      <table style={{margin: "auto"}} className="content-table" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? column.isSortedDesc ? ' 🔻' : ' 🔺' : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => { 
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                }) }
              </tr>
            )
          })}
        </tbody>
      </table>

      <div style={{margin:"10px"}} className='btnPag' >
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
            </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
            </button>
      </div>
      
    </>
  )
}