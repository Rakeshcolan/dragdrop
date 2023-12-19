import React, { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { useNodesState, useEdgesState } from "reactflow";
import "reactflow/dist/style.css";

import "../../index.css";
import Switch from "@mui/material/Switch";
import FlowPage from "../../components/common/reactflow.js";
import { useDispatch } from "react-redux";
import { getFlow } from "../../redux/flowAction";
import { useSelector } from "react-redux";
import AlertUser from "../../components/modalComponent";

const label = { inputProps: { "aria-label": "Switch demo" } };

const initialNodes = [
  {
    id: "1", 
    type: "input",
    data: { label: "Start" },
    position: { x: 250, y: 5 },
  },
];
const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  let { action, arrayIndex } = location.state;
  let dispatch = useDispatch();
  let nodeObject = useSelector((state) => state.flowData);

  const [chatbotData, setChatbotData] = useState({
    clientName: "",
    chatbotName: "",
  });

  const onStop = (event, node) => {};
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  let oldId;
  function buildJSON(nodes, edges, nodeId, oldid) {
    // console.log("nodeiddd",nodeId);
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) {
      return null;
    }
    // console.log("datalabel",node.data.label,"nodeId",nodeId,"oldId",oldId);
    const result = {
      message: node.data.label || node.data.response,
    };
    // console.log("resulstttt",result);
    if (nodeId.split("_")[0] == "groupnode") {
      const buttonnodeId = nodes.filter((n) => n.parentNode === nodeId);
      const outgoingEdges = buttonnodeId.map((node) => {
       let availableoutgoing =  edges.filter((edge) => edge.source === node.id)[0]
       if(availableoutgoing){
        return availableoutgoing
       }
       else {
        return node
       }
      });
      // const outgoingEdges = edges.filter((edge) => edge.source === nodeId);
        console.log("outgoingedges",buttonnodeId);
      if (outgoingEdges.length > 0) {
        result.options = outgoingEdges.map((edge) => {
          if(edge?.source){

            const currentNode = nodes.find((n) => n.id === edge?.source);
            const followUpNode = nodes.find((n) => n.id === edge?.target);
           
            if (currentNode?.parentNode) {
              if(followUpNode){
                oldId = followUpNode.id;
                return {
                  response: currentNode.data.label,
                  follow_up: buildJSON(
                    nodes,
                    edges,
                    followUpNode.id,
                    currentNode.id
                  ),
                };
              }
             
            } else {
              oldId = followUpNode?.id;
              return {
                message: currentNode?.data.label,
                follow_up: buildJSON(
                  nodes,
                  edges,
                  followUpNode?.id,
                  currentNode?.id
                ),
              };
            }
          }
          else{
            return {
              response:edge.data.label
            }
          }
        });
      }
      
    } else {
      const outgoingEdges = edges.filter((edge) => edge.source === nodeId);
      if (outgoingEdges.length > 0) {
        result.options = outgoingEdges.map((edge) => {
          const currentNode = nodes.find((n) => n.id === edge.source);

          const followUpNode = nodes.find((n) => n.id === edge.target);
          if (oldId == currentNode.id) {
            oldId = followUpNode.id;
            let lastEdge = edges.find((n) => n.source == currentNode.id);
            let lastNode = nodes.find((n) => n.id == lastEdge.target);
            return {
              // response: lastNode.data.label,
              follow_up: buildJSON(
                nodes,
                edges,
                followUpNode.id,
                currentNode.id
              ),
            };
          }
         else if(oldId !== currentNode.id){
            oldId = followUpNode.id;
            return {
              message: currentNode.data.label,
              follow_up: buildJSON(
                nodes,
                edges,
                followUpNode.id,
                currentNode.id
              ),
            };
          }

          if (currentNode.parentNode) {
            oldId = currentNode.id;
            return {
              response: currentNode.data.label,
              follow_up: buildJSON(
                nodes,
                edges,
                followUpNode.id,
                currentNode.id
              ),
            };
          } 
          else  {
          
              return {
                
                follow_up: buildJSON(
                  nodes,
                  edges,
                  followUpNode.id,
                  currentNode.id
                ),
              };
            
          }
        });
      }
    }

    return result;
  }

  useEffect(() => {
    if (nodeObject && action == "Edit") {
      let savedNodeObject = [...nodeObject[arrayIndex].flowElements.nodes];
      setNodes(savedNodeObject);
      setEdges(nodeObject[arrayIndex].flowElements.edges);
    }
  }, []);

  const saveElements = () => {
    let savedElements = {
      flowElements: reactFlowInstance.toObject(),
      flowName: chatbotData,
    };
    console.log("saved", savedElements);
    dispatch(getFlow({ savedElements }));
    navigate("/");
    const startingNodeId = "1";
    const resultJSON = buildJSON(
      savedElements.flowElements.nodes,
      savedElements.flowElements.edges,
      startingNodeId
    );
    console.log(resultJSON);
  };

  const updateName = (e) => {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    setChatbotData({ ...chatbotData, [name]: value });
  };



  return (
    <>
      <div className="dndflowheader">
        <h2>Manage ChatBot</h2>
        <div className="dndflowfields">
          <div className="dndflowinput">
            <label>Client Name</label>
            <input
              value={chatbotData.clientName}
              name="clientName"
              onChange={(e) => updateName(e)}
            />
          </div>
          <div className="dndflowinput">
            <label>Chatbot Name</label>
            <input
              value={chatbotData.chatbotName}
              name="chatbotName"
              onChange={(e) => updateName(e)}
            />
          </div>
          <div className="dndactive">
            <label>Status:</label>
            <span>Active</span>
            <Switch {...label} defaultChecked />
            <span>InActive</span>
          </div>
        </div>
      </div>

      <div className="dndflow">
    

          <FlowPage
            nodes={nodes}
            ref={reactFlowWrapper}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            // onConnect={onConnect}
            // onDrop={onDrop}
            setEdges={setEdges}
            setReactFlowInstance={setReactFlowInstance}
            reactFlowInstance={reactFlowInstance}
            onDragOver={onDragOver}
            setNodes={setNodes}
            onStop={onStop}
          />
        
        <button
          onClick={() => saveElements()}
          style={{
            backgroundColor: "#87cc87",
            margin: "10px",
            color: "white",
            fontWeight:"bolder",
            height: "30px",
            borderRadius: "5px",
            fontSize: "20px",
            position: "fixed",
            bottom: "0",
            right:"0",
            border:"none"
          }}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default DnDFlow;
