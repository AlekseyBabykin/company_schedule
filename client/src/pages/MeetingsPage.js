import React, { useState } from "react";
import { Button, Form, ListGroup, Row, Col } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MeetingsPage = () => {
  const [meetings, setMeetings] = useState([
    {
      date: "2024-03-15",
      location: "Office",
      businessName: "ABC Inc.",
      summary: "Met with ABC Inc. to discuss project details.",
    },
    {
      date: "2024-03-16",
      location: "Zoom",
      businessName: "XYZ Corp.",
      summary: "Virtual meeting with XYZ Corp. for partnership agreement.",
    },
    {
      date: "2024-03-17",
      location: "Coffee Shop",
      businessName: "123 Enterprises",
      summary:
        "Informal meeting with 123 Enterprises regarding marketing plan.",
    },
    {
      date: "2024-03-18",
      location: "Conference Room",
      businessName: "Tech Solutions Ltd.",
      summary: "Meeting with Tech Solutions Ltd. to finalize contract details.",
    },
    {
      date: "2024-03-19",
      location: "Online",
      businessName: "Global Innovations",
      summary: "Webinar with Global Innovations on industry trends.",
    },
  ]);
  const [newMeetingDate, setNewMeetingDate] = useState("");
  const [newMeetingLocation, setNewMeetingLocation] = useState("");
  const [newMeetingBusinessName, setNewMeetingBusinessName] = useState("");
  const [newMeetingSummary, setNewMeetingSummary] = useState("");

  const handleAddMeeting = () => {
    const newMeeting = {
      date: newMeetingDate,
      location: newMeetingLocation,
      businessName: newMeetingBusinessName,
      summary: newMeetingSummary,
    };

    setMeetings([...meetings, newMeeting]);

    setNewMeetingDate("");
    setNewMeetingLocation("");
    setNewMeetingBusinessName("");
    setNewMeetingSummary("");
  };

  const handleDeleteMeeting = (index) => {
    const updatedMeetings = [...meetings];
    updatedMeetings.splice(index, 1);
    setMeetings(updatedMeetings);
  };
  const handleEditMeeting = (index) => {
    console.log("Edit meeting:", meetings[index]);
  };

  return (
    <div className="container mt-5">
      <h1>Meetings Page</h1>

      <div className="mb-4">
        <h2>List of All Meetings</h2>

        <ListGroup>
          {meetings.map((meeting, index) => (
            <Row>
              <ListGroup.Item
                key={index}
                className="d-flex justify-content-between align-items-center m-1"
              >
                <Col xs={2}>
                  <h5>{meeting.businessName}</h5>
                </Col>
                <Col xs={6}>
                  <p>{meeting.summary}</p>
                </Col>
                <Col xs={1}>
                  <p>{meeting.location}</p>
                </Col>
                <Col xs={1}>
                  <p>{meeting.date}</p>
                </Col>

                <Col xs={2} className="d-flex justify-content-end">
                  <Button
                    variant="primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEditMeeting(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteMeeting(index)}
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
        <h2>Add New Meeting Summary Form</h2>
        <Form>
          <Form.Group className="mb-3" controlId="meetingDate">
            <Form.Label>Date</Form.Label>
            <br />
            <DatePicker
              selected={newMeetingDate}
              onChange={(date) => setNewMeetingDate(date)}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select date"
              className="form-control"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="meetingLocation">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter meeting location"
              value={newMeetingLocation}
              onChange={(e) => setNewMeetingLocation(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="meetingBusinessName">
            <Form.Label>Business Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter business name"
              value={newMeetingBusinessName}
              onChange={(e) => setNewMeetingBusinessName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="meetingSummary">
            <Form.Label>Summary</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter meeting summary"
              value={newMeetingSummary}
              onChange={(e) => setNewMeetingSummary(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleAddMeeting}>
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default MeetingsPage;
