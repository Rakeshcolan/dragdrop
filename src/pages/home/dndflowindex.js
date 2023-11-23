import React, { useState, useRef, useCallback, useEffect } from "react";
import TextUpdaterNode from "../../components/fields/TextUpdaterNode.js";
import { useNavigate } from "react-router-dom";

import {
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";

import "../../index.css";
import TextAreaUpdater from "../../components/fields/textArea.js";
import ButtonNode from "../../components/fields/buttonNode.js";
import FlowPage from "../../components/common/reactflow.js";

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
  const navigate = useNavigate();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [textUpdaterInput, setTextUpdaterInput] = useState({});


  const onConnect = (params) =>
    setEdges((eds) => {
      params.markerEnd = {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: "black",
      };
      params.className = "customnode";
      return addEdge(params, eds);
    });

  const onStop = (event, node) => {};
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      let parentGroupId = event.target.id;
      // let parentGroup = event.target.classList[1];
      let parentWrapper = event.target.classList[0];
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      let type = event.dataTransfer.getData("application/reactflow");
      let droppingid = event.dataTransfer.getData("id");

      const parentPosition = reactFlowInstance
        .getNodes()
        .find((element) => element.id === parentGroupId)?.position;
      console.log("parenteposition", parentPosition);

      if (typeof type === "undefined" || !type) {
        return;
      }

      let newNode;
      // if (parentGroupId =="groupColumn") {
      if (parentGroupId.split("_").includes("groupnode")) {
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        const adjustedPosition = {
          x: position.x - parentPosition.x - 40,
          y: position.y - parentPosition.y - 40,
        };
        let nodeId = getId();
        newNode = {
          id: nodeId,
          type: type,
          position: adjustedPosition,
          // positionAbsolute:adjustedPosition,
          // positionType: "absolute",
          parentNode: parentGroupId,
          data: { nodeId: nodeId, onChangeInput: updateTextUpdaterInput },
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
          data: {
            groupId: nodeID,
            nodeId: nodeID,
            onChangeInput: updateTextUpdaterInput,
          },
        };
      } else {
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });
        let nodeId = getId();
        newNode = {
          id: nodeId,
          type: type,
          position,
          data: { nodeId: nodeId, onChangeInput: updateTextUpdaterInput },
        };
      }

      setNodes((nds) => nds.concat(newNode));
      // console.log("bnodes", nodes);
    },
    [reactFlowInstance]
  );

  let oldId;
  function buildJSON(nodes, edges, nodeId, oldid) {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) {
      return null;
    }
    // console.log("datalabel",node.data.label);
    const result = {
      message: node.data.label || node.data.response,
    };
    // console.log("resulstttt",result);
    if (nodeId.split("_")[0] == "groupnode") {
      const buttonnodeId = nodes.filter((n) => n.parentNode === nodeId);
      const outgoingEdges = buttonnodeId.map(
        (node) => edges.filter((edge) => edge.source === node.id)[0]
      );
      // const outgoingEdges = edges.filter((edge) => edge.source === nodeId);

      if (outgoingEdges.length > 0) {
        result.options = outgoingEdges.map((edge) => {
          const currentNode = nodes.find((n) => n.id === edge.source);
          const followUpNode = nodes.find((n) => n.id === edge.target);

          if (currentNode.parentNode) {
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
          } else {
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
        });
      }
    } else {
      const outgoingEdges = edges.filter((edge) => edge.source === nodeId);
      if (outgoingEdges.length > 0) {
        result.options = outgoingEdges.map((edge) => {
          const currentNode = nodes.find((n) => n.id === edge.source);
          const followUpNode = nodes.find((n) => n.id === edge.target);
          if (oldId == currentNode.id) {
            let lastEdge = edges.find((n) => n.source == currentNode.id);
            let lastNode = nodes.find((n) => n.id == lastEdge.target);
            return {
              response: lastNode.data.label,
            };
          }

          if (currentNode.parentNode) {
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
          } else {
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
        });
      }
    }

    return result;
  }

  const saveElements = () => {
    let savedElements = reactFlowInstance.toObject();
    console.log("saved", savedElements);
    localStorage.setItem("object", JSON.stringify(savedElements));
    navigate("/chatbot");
    const startingNodeId = "1";
    const resultJSON = buildJSON(
      savedElements.nodes,
      savedElements.edges,
      startingNodeId
    );
    console.log(resultJSON);
  };

  const updateTextUpdaterInput = (value, id) => {
    setTextUpdaterInput({ value, id });
  };

  useEffect(()=>{

    updateNode()
  },[textUpdaterInput])

  const updateNode = () => {
    return nodes.map((node) => {
      try {
        if (node.id === textUpdaterInput.id) {
          node.data = {
            ...node.data,
            label: textUpdaterInput.value,
          };
        }
        return node;
      } catch (err) {
        console.log("err", err);
      }
    });
  };

  return (
    <div className="dndflow">
      
      <FlowPage
        updateNode={nodes}
        ref={reactFlowWrapper}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        setReactFlowInstance={setReactFlowInstance}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onStop={onStop}
      />
      <button
        onClick={() => saveElements()}
        style={{
          backgroundColor: "#7294d4",
          margin: "10px",
          color: "white",
          height: "30px",
          borderRadius: "5px",
          fontSize: "20px",
          position:'fixed',
          bottom:"0"

        }}
      >
        Submit
      </button>
    </div>
  );
};

export default DnDFlow;
