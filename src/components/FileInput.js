import React, { useState } from "react";
import * as XLSX from "xlsx";
import "bootstrap/dist/css/bootstrap.min.css";

function FileInput() {
  const [items, setItems] = useState([]);
  function readExcel(file) {
    console.log("Your file is -", file.type);
    if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      const promise = new Promise((resolve, reject) => {
        //creating js filereader object
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e) => {
          const bufferArray = e.target.result;
          const wb = XLSX.read(bufferArray, { type: "buffer" });
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          const data = XLSX.utils.sheet_to_json(ws); //here i get a data
          console.log(data);
          resolve(data); //send a data as a resolve
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
      promise
        .then((d) => {
          console.log(d);
          setItems(d);
        })
        .catch((error) => console.log(error));
    } else {
      alert("Please Upload a Required File.");
    }
  }
  return (
    <div className="container">
      <input
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        type="file"
        onChange={(e) => {
          console.log(e.target.files);
          const files = e.target.files;
          const firstFile = files[0];
          readExcel(firstFile);
        }}
      />
      <br />
      <small>Please note: Only SaudaTech Excel sheet file is supported.</small>

      {/* table data */}
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Confirmation Id.</th>
            <th>Type</th>
            <th>Status</th>
            <th>Buyer</th>
            <th>Seller</th>
            <th>Broker</th>
            <th>Variety</th>
            <th>Station</th>
            <th>Delivery By</th>
            <th>Quantity</th>
            <th>Quantity Unit</th>
            <th>Original Price</th>
            <th>Accepted Price</th>
            <th>Price Unit</th>
            <th>Created At</th>
            <th>Confirmed At</th>
            <th>Staple</th>
            <th>Strength</th>
            <th>Trash</th>
            <th>Moisture</th>
            <th>Mic Minimum</th>
            <th>Mic Maximum</th>
            <th>Remarks</th>
            <th>Dhara</th>
          </tr>
        </thead>

        <tbody>
          {items.map((d) => (
            <tr key={d.Confirmation_ID}>
              <td>{d.Confirmation_ID}</td>
              <td>{d.Type}</td>
              <td>{d.Status}</td>
              <td>{d.Buyer}</td>
              <td>{d.Seller}</td>
              <td>{d.Broker}</td>
              <td>{d.Variety}</td>
              <td>{d.Station}</td>
              <td>{d.Delivery_By}</td>
              <td>{d.Quantity}</td>
              <td>{d.Quantity_Unit}</td>
              <td>{d.Original_Price}</td>
              <td>{d.Accepted_Price}</td>
              <td>{d.Price_Unit}</td>
              <td>{d.Created_At}</td>
              <td>{d.Confirmed_At}</td>
              <td>{d.Staple}</td>
              <td>{d.Strength}</td>
              <td>{d.Trash}</td>
              <td>{d.Moisture}</td>
              <td>{d.Mic_Minimum}</td>
              <td>{d.Mic_Maximum}</td>
              <td>{d.Remarks}</td>
              <td>{d.Dhara}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FileInput;
