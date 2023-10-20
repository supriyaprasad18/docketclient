import React from "react";
import { CircularProgress } from "@material-ui/core";

const DocketList = (props) => {
  const { dockets, loading } = props;

  if (loading) return <CircularProgress />;
  if (dockets.length > 0) {
    return (
      <div>
        <table
          style={{
            border: "0.1rem solid black",
            borderRadius: "1rem",
            padding: "1rem",
            borderSpacing: "1rem",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Hours</th>
              <th>Rate per Hour</th>
              <th>Supplier</th>
              <th>PO Number</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {dockets.map((item) => (
              <tr>
                <td>{item.name || "-"}</td>
                <td>{item.startTime || "-"}</td>
                <td>{item.endTime || "-"}</td>
                <td>{item.hours || "-"}</td>
                <td>{item.rate || "-"}</td>
                <td>{item.supplier || "-"}</td>
                <td>{item.poNumber || "-"}</td>
                <td>{item.description || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return <div>Empty Docket List</div>;
  }
};
export default DocketList;
