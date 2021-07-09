import React, {useEffect, useState} from 'react';

const ProfileStatus =(props)=>{

    let[status,setStatus]=useState(props.status);
    let[editMode,setEditMode]=useState(false);

   const activateEditMode = () => {
        setEditMode(true);
    }
   const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

 /*   const handleFocus = (event) => {
        event.target.select();
    }*/
    const onStatusChange = (e) => {
       setStatus(e.target.value);
    }

    useEffect(()=>{
            setStatus(props.status)
    },[props.status])

        return (
            <div>
                {!editMode &&
                <div>
                    <b>Status:</b> <span onDoubleClick={activateEditMode}>{props.status}</span>
                </div>
                }
                {editMode &&
                <div>
                    <input
                        onChange={onStatusChange}
                        autoFocus={true}
                        onBlur={deactivateEditMode}
                        value={status}/>
                </div>
                }
            </div>
        );

}

export default ProfileStatus;
