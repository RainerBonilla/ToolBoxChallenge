import { useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';

function TableComponent () {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
    const fetchData = async () => {
        try {
        const response = await fetch('http://localhost:3001/files/data');
        const files = await response.json();
        console.log('Response from server:', files);
        setFiles(files);
        } catch (error) {
        console.error('Error fetching data:', error);
        setError(true);
        }
        setLoading(false);
    };

    fetchData();
    }, []);

    const tableSection = <Table striped bordered hover responsive>
        <thead>
        <tr>
            <th>File</th>
            <th>Text</th>
            <th>Number</th>
            <th>Hex</th>
        </tr>
        </thead>
        <tbody>
        {files.map((file, index) => (
        <tr key={index}>
            <td>{file.file}</td>
            <td>{file.text}</td>
            <td>{file.number}</td>
            <td>{file.hex}</td>
        </tr>
        ))}
        </tbody>
    </Table>;
    
    const errorMessage = <div className="alert alert-danger" role="alert">
      Error fetching data from server.
    </div>;

    const loadingSection = <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    </div>;

    return <Container className='mt-5 pt-3 w-60'>
        {loading ? loadingSection : error ? errorMessage : tableSection}
    </Container>;
}

export default TableComponent;