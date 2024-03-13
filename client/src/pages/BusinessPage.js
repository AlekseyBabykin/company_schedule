import React, { useState } from "react";
import { Button, Form, ListGroup, Row, Col } from "react-bootstrap";

const BusinessPage = () => {
  const [companies, setCompanies] = useState([
    { name: "Company A", description: "Description of Company A" },
    { name: "Company B", description: "Description of Company B" },
    { name: "Company C", description: "Description of Company C" },
    { name: "Company D", description: "Description of Company D" },
    { name: "Company E", description: "Description of Company E" },
  ]);

  const [newCompanyName, setNewCompanyName] = useState("");
  const [newCompanyDescription, setNewCompanyDescription] = useState("");

  const handleAddCompany = () => {
    const newCompany = {
      name: newCompanyName,
      description: newCompanyDescription,
    };

    setCompanies([...companies, newCompany]);

    setNewCompanyName("");
    setNewCompanyDescription("");
  };

  const handleDeleteCompany = (index) => {
    const updatedCompanies = [...companies];
    updatedCompanies.splice(index, 1);
    setCompanies(updatedCompanies);
  };
  return (
    <div className="container mt-5">
      <h1>My Business Page</h1>

      <div className="mb-4">
        <h2>List of Companies</h2>
        <ListGroup>
          {companies.map((company, index) => (
            <Row className="m-1">
              <ListGroup.Item
                key={index}
                className="d-flex justify-content-between align-items-center"
              >
                <Col xs={3}>
                  <h5>{company.name}</h5>
                </Col>
                <Col xs={6}>
                  <p>{company.description}</p>
                </Col>

                <Col xs={3} className="d-flex justify-content-end">
                  <Button variant="primary" size="sm" className="me-2">
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteCompany(index)}
                  >
                    Delete
                  </Button>
                </Col>
              </ListGroup.Item>
            </Row>
          ))}
        </ListGroup>
      </div>

      <div>
        <h2>Add New Company Form</h2>
        <Form>
          <Form.Group className="mb-3" controlId="companyName">
            <Form.Label>Company Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter company name"
              value={newCompanyName}
              onChange={(e) => setNewCompanyName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="companyDescription">
            <Form.Label>Company Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter company description"
              value={newCompanyDescription}
              onChange={(e) => setNewCompanyDescription(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleAddCompany}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default BusinessPage;
