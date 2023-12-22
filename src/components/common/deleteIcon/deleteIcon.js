import "./deleteIcon.css";
import ClearIcon from '@mui/icons-material/Clear';
const DeleteIcon = ({onDeleteInstance,deleteId})=>{

    
    const onDeleteNode = () => {
        console.log("ondeleteinstance",onDeleteInstance.getNodes());
        let deleteNode = onDeleteInstance?.getNodes()
          .filter((element) => element.id === deleteId);
          onDeleteInstance.deleteElements({ nodes: deleteNode });
      };

    return (
        <ClearIcon  fontSize="small" className="iconstyle" onClick={()=>{onDeleteNode()}}/>
    )
}

export default DeleteIcon;