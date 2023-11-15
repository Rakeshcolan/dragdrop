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
import TextAreaUpdater from "./textArea.js";

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Start" },
    position: { x: 250, y: 5 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;
let groupId = 1;
const getGroupId = () => `groupnode_${groupId++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [textUpdaterInput,setTextUpdaterInput] = useState({})

  const [nodeTypes, setNodeTypes] = useState({ 
    textupdater: TextUpdaterNode,
    buttonNode: ButtonNode,
    textAreaUpdater: TextAreaUpdater,
  });
  const onConnect = (params) =>
    setEdges((eds) => {
      console.log(addEdge(params, eds),"ddddddwqww");
      return addEdge(params, eds);
    });

  const onStop = (event, node) => {
    // console.log("dkdkdkkdkldkdkd",node,event);
  };
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      let parentGroupId = event.target.id;
      let parentGroup = event.target.classList[1];
      let parentWrapper = event.target.classList[0];
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      let type = event.dataTransfer.getData("application/reactflow");
      let droppingid = event.dataTransfer.getData("id");
      console.log(
event.target,
        "parentGroup"
      );

      if (typeof type === "undefined" || !type) {
        return;
      }

      // const position = reactFlowInstance.project({
      //   x: event.clientX - reactFlowBounds.left,
      //   y: event.clientY - reactFlowBounds.top,
      // });
      let newNode;
      // if (parentGroupId =="groupColumn") {
      if (parentGroupId.split("_").includes("groupnode")) {
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        let nodeId = getId(); 
        newNode = {
          id: nodeId,
          type: type,
          position,
          positionAbsolute:position,
          positionType: "absolute",
          parentNode: parentGroupId,
          data: { label: `output node`,nodeId:nodeId,onChangeInput: updateTextUpdaterInput, },
        };
      } else if (
        parentWrapper === "react-flow__pane" &&
        droppingid.split("_").includes("groupnode")
      ) {
        let nodeID = getGroupId();
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        newNode = {
          id: nodeID,
          type: type,
          position,
          data: { label: `outputW node`, groupId: nodeID ,nodeId:nodeID,onChangeInput: updateTextUpdaterInput,},
        };
        } else {
          const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
          });
          let nodeId = getId(); 
        newNode = {
          id:nodeId,
          type: type,
          position,
          data: { label: `output node`,nodeId:nodeId ,onChangeInput: updateTextUpdaterInput,},
        };
      }

      setNodes((nds) => nds.concat(newNode));
      console.log("bnodes", nodes);
    },
    [reactFlowInstance]
  );
  const convertToResponseArray = (nodes, edges) => {
    const responseArray = [];
  
    const findNodeById = (id) => nodes.find((node) => node.id === id);
  
    const traverseNode = (nodeId,index) => {
      const Parentnode = findNodeById(nodeId);
            console.log("findnodessss",Parentnode);
      if (Parentnode) {
        let options=[]
        nodes.map((node,i)=>{
          if(node.type === "buttonNode" && Parentnode.id == node.parentNode){
             options.push( edges
            .filter((edge) => edge.source === node.data.nodeId)
            .map((edge) => {
              const targetNode = findNodeById(edge.target);
              const responseNode = findNodeById(edge.source)
    
              if (targetNode) {
                return {
                  response: responseNode.data.label,
                  follow_up: traverseNode(edge.target),
                };
              }
    
              return null;
            })
            .filter((option) => option !== null)[0])
            
          }
        })
     
  
        return {
          message: Parentnode.data.label,
          options,
        };
      }
  
      return null;
    };
  
    nodes.forEach((node,i) => {
      console.log("nodess",node);
      if (node.type === "textupdater") {
        const flow = traverseNode(node.data.nodeId,i);
        if (flow) {
          responseArray.push(flow);
        }
       }
    });
  
    return responseArray;
  };

  const saveElements = () => {
    let savedElements = reactFlowInstance.toObject();
    console.log("saved",savedElements);
    const responseArray = convertToResponseArray(savedElements.nodes, savedElements.edges);

    // let data = [{"message":"Start",options:[]}]
    // savedElements?.edges?.map((elem)=>{
    //   savedElements?.nodes.map((node)=>{
    //     if(node.data.nodeId === elem.source){
    //         data[0].options.push{}
    //     }
    //   })
    // })
    console.log("responsearraty",responseArray[0]);
  };
  const updateTextUpdaterInput = (value,id) => {
    setTextUpdaterInput({value,id});
    console.log("valueeeeee",value,id);
    
  };

  const updateNode = ()=>{
   return  nodes.map((node)=>{
      try{
        if(node.id ===textUpdaterInput.id){
          node.data = {
            ...node.data,label:textUpdaterInput.value,
          }
         
        }
        return node
      }
      catch(err){
        console.log("err",err);
      }
     
  })
  }
  // console.log(updateNode());

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div
          className="reactflow-wrapper"
          id="flowpaper"
          ref={reactFlowWrapper}
        >
          <button onClick={() => saveElements()}>Submit</button>
          <ReactFlow
          nodes={updateNode()}
            // nodes={nodes.map((node) => {
            //    console.log("checknode",node);
            //   if (node.type === "textupdater") {
                
            //     // Pass the input value and update function to TextUpdaterNode
            //      node.data = {
            //         ...node.data,
            //         inputValue: textUpdaterInput,
            //         onChangeInput: updateTextUpdaterInput,
            //       }
            //     };
              
            //   return node;
            // })}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            className="react-flow-subflows-example"
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            onNodeDragStop={onStop}
            fitView
          >
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
