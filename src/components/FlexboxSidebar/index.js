/** @jsxImportSource theme-ui */
// eslint-disable-next-line import/no-anonymous-default-export
export const FlexboxSidebar = (props) => (
  <div
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
    }}>
    <aside
      sx={{
        flexGrow: 1,
        flexBasis: 'sidebar',
      }}>
      {props.sidebar}
    </aside>
    <main
      sx={{
        flexGrow: 99999,
        flexBasis: 0,
        minWidth: 320,
      }}>
      {props.children}
    </main>
  </div>
)

export default FlexboxSidebar;
