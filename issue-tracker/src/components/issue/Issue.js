import React from "react";
import PropTypes from 'prop-types';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";



const Issue = ({issue}) => {
    return(
           <Container>
  <Row>
    <Col>1 of 2</Col>
    <Col>2 of 2</Col>
  </Row>
  <Row>
    <Col>1 of 3</Col>
    <Col>2 of 3</Col>
    <Col>3 of 3</Col>
  </Row>
</Container> 
    )
}
Issue.propTypes = {
    issue: PropTypes.array
  };
export default Issue;