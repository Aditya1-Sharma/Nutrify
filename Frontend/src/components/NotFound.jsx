import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <section className="container nf">
        <div className="not-found">
          <h1>404 Not Found</h1>

          <Link to="/">
            <p>Go Back to home</p>
          </Link>
        </div>
      </section>
    </>
  );
}

export default NotFound;
