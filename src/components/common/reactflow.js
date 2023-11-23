import { forwardRef, useState } from "react";
import { ReactFlow, ReactFlowProvider } from "reactflow";
import Sidebar from "../fields/Sidebar";
import 'reactflow/dist/style.css';
import ButtonNode from "../../components/fields/buttonNode";
import TextAreaUpdater from "../../components/fields/textArea";
import TextUpdaterNode from "../../components/fields/TextUpdaterNode";

const FlowPage =forwardRef( (props,ref) => {
    const {updateNode,edges,onNodesChange,onEdgesChange,onConnect,setReactFlowInstance,onDragOver,onDrop,onStop} =props;
    const [nodeTypes, setNodeTypes] = useState({
        textupdater: TextUpdaterNode,
        buttonNode: ButtonNode,
        textAreaUpdater: TextAreaUpdater,
      })
   return (
    <>
      <ReactFlowProvider>
        <div
          className="reactflow-wrapper"
          id="flowpaper"
          ref={ref}
        >
          <ReactFlow
            nodes={updateNode}
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
})
export default FlowPage