/** @jsxImportSource theme-ui */
import { Container } from "theme-ui"
import './styles.scss';

export const TableView = (props) => {
  const { data, displayFields, setCurrentRow, selectedRow } = props;

  console.log('TableView', {props})
  const renderHeaders = () => {
    if (!data) return;
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
  }
  
  const renderRows = () => {
    if (!data) return;
    return (
      <tbody>
      { Object.values(data).map((v, i) => {
          return (
            <tr key={i} id={i} className={i === selectedRow ? 'selected' : ''} onClick={e => setCurrentRow(e, i)}>
            {Object.values(v).map((u, j) => {
                if (displayFields.includes(Object.keys(data[0])[j])) {
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
  }
  
  return (
    <Container>
      <table>
        <thead>
          {renderHeaders()}
        </thead>
        { renderRows() }
      </table>
    </Container>
  )
}

export default TableView;
