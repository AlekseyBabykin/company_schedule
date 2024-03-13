import React, { useState } from "react";
import { Button, Form, ListGroup } from "react-bootstrap";

const BusinessPage = () => {
  // Состояние для списка компаний
  const [companies, setCompanies] = useState([]);

  // Состояния для полей новой компании
  const [newCompanyName, setNewCompanyName] = useState("");
  const [newCompanyDescription, setNewCompanyDescription] = useState("");

  // Обработчик добавления новой компании
  const handleAddCompany = () => {
    // Создаем новый объект компании
    const newCompany = {
      name: newCompanyName,
      description: newCompanyDescription,
    };

    // Добавляем компанию в список
    setCompanies([...companies, newCompany]);

    // Очищаем поля ввода
    setNewCompanyName("");
    setNewCompanyDescription("");
  };

  // Обработчик удаления компании
  const handleDeleteCompany = (index) => {
    const updatedCompanies = [...companies];
    updatedCompanies.splice(index, 1);
    setCompanies(updatedCompanies);
  };
  return (
    <div className="container mt-5">
      <h1>My Business Page</h1>

      {/* Список компаний */}
      <div className="mb-4">
        <h2>List of Companies</h2>
        <ListGroup>
          {companies.map((company, index) => (
            <ListGroup.Item
              key={index}
              className="d-flex justify-content-between align-items-center"
            >
              {company.name}
              <div>
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
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      {/* Форма добавления новой компании */}
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
