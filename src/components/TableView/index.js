/** @jsxImportSource theme-ui */
import { useEffect, useCallback, useState } from "react";
import { Container } from "theme-ui"
import './styles.scss';

export const TableView = (props) => {
  const { data, displayFields, setCurrentRow, selectedRow } = props;
  const [rows, setRows] = useState(undefined);
  const [headers, setHeaders] = useState(undefined);

  const renderHeaders = useCallback(() => {
    if (!data || !data[0]) return;
    console.log('TableView', {data})
    return (
      <tr key={'header'}>
        {Object.keys(data[0]).map((v, i) => {
          if (displayFields.includes(v)) {
            return <th key={i}>{v.replace('_', ' ').toLocaleUpperCase()}</th>
          }
          return false;
        })}
      </tr>
    )
  }, [data, displayFields]);
  
  const renderRows = useCallback(() => {
    if (!data || data.length < 1) return (<tbody><tr><td colSpan={'*'} sx={{textAlign: 'center', fontWeight: 900, padding: '15px'}}>No results</td></tr></tbody>);
    console.log('selectedRow',{props})
    return (
      <tbody>
      { Object.values(data).map((v, i) => {
        console.log('here2', {v}, {selectedRow})
          let className = (v && selectedRow && v.name === selectedRow.name) ? 'selected' : '';
          return (
            <tr key={i} id={i} className={className} onClick={e => setCurrentRow(e, i)}>
            {Object.values(v).map((u, j) => {
                if (data[0] && displayFields.includes(Object.keys(data[0])[j])) {
                  return <td key={j}>{u}</td>
                }
                return false;
            })}
            </tr>
          )
        })
      }
      </tbody>
    )
  }, [data, displayFields, selectedRow, setCurrentRow]);

  useEffect(() => {
    setHeaders(renderHeaders());
    setRows(renderRows());
  }, [renderHeaders, renderRows])
  
  useEffect(() => {
  },[]);
  
  return (
    <Container>
      <table sx={{width: '100%'}}>
        <thead>
          {headers}
        </thead>
        { rows }
      </table>
    </Container>
  )
}

export default TableView;
