import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ChatBotTableDesc, chatBotTableTitle } from "../../utils/tableArray";
import Button from "@mui/material/Button";
import "./dataTable.css";
import {useNavigate} from "react-router-dom"
import { resetFormData } from "../../redux/flowAction";
import { useDispatch } from "react-redux";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#101c47",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#a5b1c2",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

 

export default function DataTable(props) {
    let {flowData} = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleRoute = (val,path,index)=>{
        navigate(`${path}`,{state:{action:val,arrayIndex:index}})
    }



  return (
    <div
      style={{
        border: "1px #c6c8cf solid",
        marginTop: "8px",
        borderRadius: "5px",
      }}
    >
      <div className="tableheadbutton">
        <h3>ChatBot List</h3>
        <div>

        <Button color="success" variant="contained"  onClick={()=>handleRoute("Add","/flowpage")}>
          Add
        </Button>
        <span>||</span>
        <Button color="success" variant="contained" onClick={()=>dispatch(resetFormData({value:[]}))}>
          Reset
        </Button>
        </div>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              {chatBotTableTitle.map((title) => (
                <StyledTableCell key={title}>{title}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {flowData.map((row,i) => (
              <StyledTableRow key={i}>
                <StyledTableCell>{row.flowName.clientName}</StyledTableCell>
                <StyledTableCell>{row.flowName.chatbotName}</StyledTableCell>
                <StyledTableCell>Are you Human?</StyledTableCell>
                <StyledTableCell>
                  <Button
                    color={row.status === "Active" ? "success" : "error"}
                    variant="contained"
                    sx={{
                      fontSize: "14px",
                      padding: "5px",
                      width: "75px !important",
                    }}
                  >
                    InActive
                  </Button>
                </StyledTableCell>
                <StyledTableCell>
                  <Button onClick={()=>handleRoute("Edit","/flowpage",i)}>Edit</Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
