import { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { MarkerType, ReactFlow, ReactFlowProvider, useEdgesState,   addEdge,useNodesState } from "reactflow";
import Sidebar from "../fields/Sidebar";
import ButtonNode from "../../components/fields/buttonNode";
import TextAreaUpdater from "../../components/fields/textArea";
import TextUpdaterNode from "../../components/fields/TextUpdaterNode";
import "reactflow/dist/style.css";

const FlowPage = forwardRef((props, ref) => {

  const {
    // updateNode,\
    setNodes,
    nodes,
    reactFlowInstance,
    edges,
    onNodesChange,
    onEdgesChange,
    // onConnect,
    setReactFlowInstance,
    onDragOver,
    onStop,
    setEdges
  } = props;
  
  const reactFlowWrapper = useRef(null);
  
  const [textUpdaterInput, setTextUpdaterInput] = useState({value:'',id:""});
  // const [textUpdaterInputId, setTextUpdaterInputId] = useState(;
  const [nodeTypes, setNodeTypes] = useState({
    textupdater: TextUpdaterNode,
    buttonNode: ButtonNode,
    textAreaUpdater: TextAreaUpdater,
  });

  let id = 0;
const getId = () => `dndnode_${id++}`;
let groupId = 1;
const getGroupId = () => `groupnode_${groupId++}`;

const updateTextUpdaterInput = (value, id) => {
  console.log("settextupdate",{...textUpdaterInput,["value"]:value,"id":id});
  // setTextUpdaterInput({"value":value,"id":id});
  updateNode(id,value)
  // checkNode();
};


  if(nodes.length>1){
    nodes.map((val)=>  val.data.onChangeInput=updateTextUpdaterInput)
  }
  
// useEffect(() => {
//   updateNode();
//   console.log("i[ooooooo");
// }, [textUpdaterInput]);

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

// console.log(textUpdaterInput,"textUpdaterInput");

const updateNode = (id,value) => {

  setNodes((nds) =>
      nds.map((node) => {
        if (node.id === id) {
          node.data = {
            ...node.data,
            label:value
          };
        }

        return node;
      })
    );
  
  // return nodes.map((node) => {
  //   try {
  //     if (node.id === textUpdaterInput.id) {
  //       console.log("innodeeeeee");
  //       node.data = {
  //            ...node.data,
  //            label: textUpdaterInput.value,
  //       };
  //       console.log("trynodeeee",node.data);
  //     }
  //     return node;
  //   } catch (err) {
  //     console.log("err", err);
  //   }
  // });
};
// console.log("nupdateaertewr",updateNode());
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
      // console.log("parenteposition", parentPosition);

      if (typeof type === "undefined" || !type) {
        return;
      }
     
      let newNode;
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      if (parentGroupId.split("_").includes("groupnode")) {
        const adjustedPosition = {
          x: position.x - parentPosition.x - 40,
          y: position.y - parentPosition.y - 40,
        };
        let nodeId = getId();
        newNode = {
          id: nodeId,
          type: type,
          position: adjustedPosition,
          parentNode: parentGroupId,
          data: { nodeId: nodeId, onChangeInput: updateTextUpdaterInput },
        };
      } else if (
        parentWrapper === "react-flow__pane" &&
        droppingid.split("_").includes("groupnode")
      ) {
        let nodeID = getGroupId();
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
        let nodeId = getId();
        newNode = {
          id: nodeId,
          type: type,
          position,
          data: { nodeId: nodeId, onChangeInput: updateTextUpdaterInput },
        };
      }

      setNodes((nds) => nds.concat(newNode));
   
    },
    [reactFlowInstance]
  );

  // const onNodesChange = updateNode();

  return (
    <>
      <ReactFlowProvider>
        <div className="reactflow-wrapper" id="flowpaper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
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
          ></ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </>
  );
});
export default FlowPage;
