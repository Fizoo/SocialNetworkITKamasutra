import {addMessageActionCreator} from "../../Redux/dialogs_reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hok/withAuthRedirect";
import {compose} from "redux";



let mapStateToProps=(state)=>{
    return{
        dialogsPage:state.dialogsPage,
    }
}

let mapDispatchToProps=(dispatch)=>{
    return{
        sendMessage:(newMessageBody)=>{
            dispatch(addMessageActionCreator(newMessageBody));
        }
    }
}

export  default compose(
    connect(mapStateToProps,mapDispatchToProps),
    //withAuthRedirect
)(Dialogs)

/*let AuthRedirectComponent=withAuthRedirect(Dialogs);
const DialogsContainer=connect(mapStateToProps,mapDispatchToProps)(AuthRedirectComponent);*/




