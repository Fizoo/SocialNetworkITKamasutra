import usersReducer, {actions, InitialStateType} from "./users-reducer";

let state:InitialStateType;

beforeEach(() => {
    // @ts-ignore
    state={
        users: [
            {
                id:0,name:'Oleg1',followed:false,status:'Status 0',photos:{small:null,large:null}
            },

            {
                id:1,name:'Oleg2',followed:false,status:'Status2 ',photos:{small:null,large:null}
            },
            {
                id:2,name:'Oleg3',followed:true,status:'Status3 ',photos:{small:null,large:null}
            },
            {
                id:3,name:'Oleg4',followed:true,status:'Status 4',photos:{small:null,large:null}
            }
        ] ,
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: true,
        followingInProgress: [] ,
        fake: 10
    }
})

test('unfollow success',()=>{
    const newState= usersReducer(state,actions.followSuccess(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})
test('follow success',()=>{
    const newState= usersReducer(state,actions.unfollowSuccess(3))

    expect(newState.users[2].followed).toBeTruthy();
    expect(newState.users[3].followed).toBeFalsy();
})