import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { useGlobalFilter, useSortBy, useTable,usePagination } from "react-table";
import '../table.css';
import '../button.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GlobalFilter } from '../Filter';
import {Button,Modal} from 'react-bootstrap';




export function Products(props) {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const response = await axios
      .get("http://127.0.0.1:5000/all_sec_logs")
      .catch((err) => console.log(err));

    if (response) {
      const products = response.data;
      setProducts(products);
      
    }
  };

  const data = useMemo(
    () => products
  );

  const columns = useMemo(
    () => [
        {
            Header : 'Time',
            accessor : 'datetime',
    
        },
        {
            Header : 'Appareil',
            accessor : 'devname'
        },
        {
            Header : 'EventType',
            accessor : 'type'
        },
        {
            Header : 'Attack',
            accessor : 'attack'
        },
        {
            Header : 'User',
            accessor : 'loguser'
        },
        {
            Header : 'UI',
            accessor : 'ui'
        },
        {
            Header : 'Description',
            accessor : 'msg'
        },
    ],
    []
  );
  const [ModalInfo,setModalInfo] = useState();
     
  const tableHooks = (hooks) => {
     
     hooks.visibleColumns.push((columns) => [
       ...columns,
       { 
         Header: "Detail",
         Cell: ({ row }) => ( 
            <Button variant="outline-danger" onClick={()=>{setModalInfo(row.original);setShow(true);}} >View Detail</Button>
         ),
       },
     ]);
   }; 
  const ModalContent = ()=>{
    return  <Modal show={show}>
    <Modal.Header>Log...</Modal.Header>
    <Modal.Body>
    {ModalInfo.logall}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="danger" onClick={handClose}>Close Modal</Button>
    </Modal.Footer>
  </Modal> 
  } 
  
  const tableInstance = useTable(
    {
      columns,
      data
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    tableHooks,

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
  const [show,setShow] = useState(false);
 

  const handClose = ()=> setShow(false); 
  useEffect(() => {
    fetchProducts();
  }, []);


  

  return (
    <>
     <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
     <br /> <br />
      <table style={{margin: "auto",width:"80%"}} className="content-table" {...getTableProps()}>
        <thead style={{width:"80%"}}>
          {headerGroups.map(headerGroup => (
            <tr style={{width:"80%"}}  {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th style={{width:"80%"}} {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted ? column.isSortedDesc ? ' 🔻' : ' 🔺' : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody style={{width:"80%"}} {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row)
            return (
              <tr style={{width:"80%"}} {...row.getRowProps()}>
                {row.cells.map(cell => { 
                  return <td style={{width:"80%"}} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                }) }
              </tr>
            )
          })}
        </tbody>
      </table><br /> 
      <div className='btnPag' >
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
      {show ? <ModalContent /> : null}
    </>
  );
}