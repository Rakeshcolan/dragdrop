import { Handle, Position } from 'reactflow';


function ButtonNode({ data, isConnectable }) {

  return (
    <>
    

      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
    <button>
       Yes
    </button>
    <button>
       Yes
    </button>
   

    </>

  );
}

export default ButtonNode;
