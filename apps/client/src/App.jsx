import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import TableComponent from './components/Table';

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
            <Navbar.Brand href="#home">ToolBox Challenge: Files</Navbar.Brand>
        </Container>
      </Navbar>
      <TableComponent />
    </>
  )
}

export default App
