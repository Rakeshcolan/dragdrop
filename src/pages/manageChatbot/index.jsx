import { useEffect, useState } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./manageChatbot.css"
import DataTable from "../../components/common/dataTable";
import { useSelector } from "react-redux";

const ManageChatBot = () => {
    const [age, setAge] = useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };

    let {flowData} = useSelector((state)=>state) 
    console.log("mangaflow",flowData);
  return (
    <>
        <div className="managebotContainer">

      <h2>Manage Chatbot</h2>
      <div className="manageDrop">

      <label>Select Client Name :</label>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">Age</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
      </div>
      <DataTable flowData = {flowData}/>
        </div>
    </>
  );
};
export default ManageChatBot;