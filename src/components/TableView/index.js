/** @jsxImportSource theme-ui */
import { Container } from "theme-ui"

export const TableView = (props) => {
  const { data, displayFields } = props;

  console.log('TableView', {props})
  const renderHeaders = () => {
    if (!data) return;
    return (
      <tr>
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
            <tr key={i}>
            {Object.values(v).map((u, j) => {
                if (displayFields.includes(Object.keys(data[0])[j])) {
                console.log('rows', {u})
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
