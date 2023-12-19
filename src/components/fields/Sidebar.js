import React, { useRef, useState } from "react";
import readXlsxFile from "read-excel-file";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import UploadIcon from '@mui/icons-material/Upload';
import "../../index.css"

export default () => {
  const [headText, setHeadText] = useState([]);
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.setData("id", event.target.id);
    event.dataTransfer.setData("value", event.target.innerText);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleUpload = (e) => {
    try {
      let files = e.target.files[0];
        if(files.name.split('.')[1] !== 'xlsx'){
        throw "please Upload Excel file"
      }
      readXlsxFile(e.target.files[0]).then((rows) => {
        setHeadText(rows[0]);
      });
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <>
  
      <aside>
      <form>
        <label htmlFor="excelupload" style={{color:"#62B2EA",cursor:"pointer",fontSize:"18px",border:"2px #62B2EA solid ",fontWeight:"bold",display:"flex",alignItems:"center",justifyContent:'space-around'}}><UploadIcon/>Please Upload Excel
         <input id="excelupload" type="file" onChange={(e) => handleUpload(e)} style={{display:"none"}}/>
        </label >
      </form>
      <hr></hr>
        <h2  style={{color:"#1976D2",margin:"15px"}} className="description">
          You can drag these nodes to the pane on the right.
        </h2>
        <div
          className="dndnode input"
          onDragStart={(event) => onDragStart(event, "input")}
          draggable
        >
          Input Node
        </div>
        <div
          className="dndnode"
          id="groupnode_0"
          onDragStart={(event) => onDragStart(event, "textupdater")}
          draggable
        >
          Group
        </div>
        <div
          className="dndnode output"
          id="button"
          onDragStart={(event) => onDragStart(event, "buttonNode")}
          draggable
        >
          Button
        </div>
        <div
          className="dndnode output"
          onDragStart={(event) => onDragStart(event, "textAreaUpdater")}
          draggable
        >
          Text
        </div>
        <hr></hr>
        <h3 style={{color:"#62B2EA"}}>Excel Column</h3>
        {headText.length > 0 ? (
          <>
            <Stack direction="column" spacing={1} className="stackname">
              {headText.map((text, i) => {
                return (
                  <Chip
                   className="chipname"
                    label={text}
                    onDelete={()=>console.log('delete')}
                    key={i}
                    id={i}
                    onDragStart={(event) => onDragStart(event, "headtext")}
                    draggable
                  />
                );
              })}
            </Stack>
          </>
        ) : (
          "Please Upload Excel to set the Text"
        )}
      
      </aside>
    </>
  );
};
