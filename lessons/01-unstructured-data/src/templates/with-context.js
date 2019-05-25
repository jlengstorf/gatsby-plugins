import React from 'react';

const Unstructured = ({ pageContext }) => (
  <>
    <h1>{pageContext.title}</h1>
    <p>{pageContext.body}</p>
  </>
);

export default Unstructured;
