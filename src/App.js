// import { useDrop } from 'react-dnd';
// import { useDrag } from 'react-dnd';
// import React, { createElement, useState } from 'react'

// import './App.css';

// const DraggableDiv = ({ id, text }) => {
//   const [{ isDragging }, drag] = useDrag({
//     type: 'DIV',
//     item: { id, text },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });

//   return (
//     <div
//       ref={drag}
//       style={{
//         opacity: isDragging ? 0.5 : 1,
//         cursor: 'move',
//       }}
//       id={id}
//     >
//       {text}
//     </div>
//   );
// };

// const DropZone = () => {
//   const [droppedText, setDroppedText] = useState([]);

//   const createElem = (text)=>{
//     if(text == 'input1'){
//       setDroppedText([...droppedText,<input type="text" value="input1" onChange={(e) => setDroppedText(e.target.value)}/>])
//     }
//     if(text == 'button'){
//       setDroppedText([...droppedText,<input type="button" value="input1" onChange={(e) => setDroppedText(e.target.value)}/>])
//     }
//   }

//   const [{ isOver }, drop] = useDrop({
//     accept: 'DIV',
//     drop: (item) => {
//       createElem(item.id)
//     },
//     collect: (monitor) => ({
//       isOver: monitor.isOver(),
//     }),
//   });

//   return (
//     <div
//       ref={drop}
//       style={{
//         width: '300px',
//         height: '300px',
//         border: '1px solid #000',
//         // display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         background: isOver ? 'lightgreen' : 'white',
//       }}
//     >
//       {droppedText?.map((data)=>{
//         return data
//       })}
//     </div>
//   );
// };

// export const Basket = () => {

//     return (
//       <>
//        <DraggableDiv id="input1" text="input" />
//        <DraggableDiv id="button" text="button" />
//        <DropZone/>
//        </>
//     )
// }

//Flow Rendererr

import React, { useState, useRef, useCallback } from "react";
import TextUpdaterNode from "./TextUpdaterNode.js";

import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";

import Sidebar from "./Sidebar";

import "./index.css";
import ButtonNode from "./buttonNode.js";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "input node" },
    position: { x: 250, y: 5 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodeTypes, setNodeTypes] = useState({textupdater:TextUpdaterNode,buttonNode:ButtonNode});
  const onConnect = (params) =>
    setEdges((eds) => {
      console.log(params, eds);
      return addEdge(params, eds);
    });

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      let parentGroup = event.target.id;
      let parentWrapper = event.target.classList[0]
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      let type = event.dataTransfer.getData("application/reactflow");
      let droppingid = event.dataTransfer.getData("id");
      console.log(reactFlowWrapper.current.id,parentWrapper,droppingid, "parentGroup");
      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }
      // if (type == "textupdater") {
      //   setNodeTypes({ textupdater: TextUpdaterNode });
      // }
      // else if(type == "buttonNode"){
      //   setNodeTypes({...nodeTypes,buttonNode:ButtonNode });
      // }
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      let newNode;
      if (parentGroup === "groupColumn") {
        newNode = {
          id: getId(),
          type: type,
          position,
          parentNode: "groupColumn",
          data: { label: `output node` },
        };
      } else if (parentGroup === "" && parentWrapper === "react-flow__pane" && droppingid === "groupColumn") {
        console.log("this is fine");
        newNode = {
          id: "groupColumn",
          type: type,
          position,
          data: { label: `output node` },
        };
      } else {
        
        newNode = {
          id: getId(),
          type: type,
          position,
          data: { label: `output node` },
        };
      }

      console.log(newNode);
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div
          className="reactflow-wrapper"
          id="flowpaper"
          ref={reactFlowWrapper}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            {/* <Controls /> */}
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
