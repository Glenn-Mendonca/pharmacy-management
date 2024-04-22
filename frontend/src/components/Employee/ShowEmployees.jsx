import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import useAxiosAuth from "../../customHook/useAxiosAuth.js";

export default function ShowEmployees() {
  const [rows, setRows] = useState([]);
  const [refresh, setRefresh] = useState(false);
  function createData(employee_id, employee_name) {
    return { employee_id, employee_name };
  }

  const api = useAxiosAuth();

  useEffect(() => {
    // fetch("http://localhost:5432/employee/all", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    api.get("/employee/all")
      .then((data) => {
        setRows(test => {
          console.log(data.data.data)
          let temp = data.data.data.map((employee) => createData(employee.id, employee.name))
          console.log(temp)
          return temp;
        }
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [refresh]);

  function handleDelete(employeeId) {
    // fetch(`http://localhost:5432/employee/${employeeId}`, {
    //   method: "DELETE",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    api.delete(`/employee/${employeeId}`)
      .then((response) => response.json())
      .then(() => {
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      <div>
        <div className="container">
          <Typography component="h1" variant="h6" color="primary" gutterBottom>
            All Employees
          </Typography>
          <div className="card-container">
            {/* here the searchbars will go  */}
          </div>
          {/* <p className="admin-header">Warehouse Inventory</p> */}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className="table-header">Employee ID</TableCell>
                  <TableCell align="right" className="table-header">
                    Name
                  </TableCell>
                  <TableCell align="right" className="table-header">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.employee_id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      className="table-body"
                    >
                      {row.employee_id}
                    </TableCell>
                    <TableCell align="right" className="table-body">
                      {row.employee_name}
                    </TableCell>
                    <TableCell align="right" className="action-buttons">
                      <Button onClick={() => handleDelete(row.employee_id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}
