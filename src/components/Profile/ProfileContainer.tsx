import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfile, updateStatus} from "../../redux/profile-reducer";
import {withRouter,RouteComponentProps} from "react-router-dom";
import {compose} from "redux";
import {ProfileType} from "../../types/types";
import {AppStateType} from "../../redux/redux-store";




class ProfileContainer extends React.Component<PropsType> {
    constructor(props: PropsType) {
    super(props)
}

    refreshProfile() {
        let userId:number|null =+ this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        if(userId) {
            this.props.getUserProfile(userId);
            this.props.getStatus(userId);
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps:PropsType, prevState:PropsType) {
        if (this.props.match.params.userId !== prevProps.match.params.userId ) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile {...this.props}
                    isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}/>
        )
    }
}

let mapStateToProps = (state:AppStateType) => {
    //console.log('mapStateToProps PROFILE')
    return ({
        profile: state.profilePage.profile,
        status: state.profilePage.status ,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    })
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter
)(ProfileContainer);

type MapPropsType = ReturnType<typeof mapStateToProps>

type DispatchType ={
    getUserProfile:(userId:number)=>void
    getStatus:(userId:number)=>void
    updateStatus:(status:string)=>void
    savePhoto:(file:File)=>void
    saveProfile:(profile:ProfileType)=>Promise<any>
}
type PathParamsType ={
    userId:string
}
type PropsType=MapPropsType & DispatchType & RouteComponentProps<PathParamsType>







