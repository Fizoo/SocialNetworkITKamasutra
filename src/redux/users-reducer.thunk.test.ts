import {actions, follow} from "./users-reducer";
import {usersAPI} from "../api/users-api";
import {APIResponseType, ResultCodesEnum} from "../api/api";

jest.mock('../api/users-api')
const userAPIMock=usersAPI
const result:APIResponseType={
        resultCode:ResultCodesEnum.Success,
    messages:[],
    data:{}
}
// @ts-ignore
userAPIMock.follow.mockReturnValue(Promise.resolve(result))

test('',async ()=>{

    const thunk=follow(1)
    const dispatchMosk=jest.fn()

    // @ts-ignore
    await thunk(dispatchMosk )

    expect(dispatchMosk).toBeCalledTimes(3)
    expect(dispatchMosk).toHaveBeenNthCalledWith(1,actions.toggleFollowingProgress(true,1))
    expect(dispatchMosk).toHaveBeenNthCalledWith(2,actions.followSuccess(1))
    expect(dispatchMosk).toHaveBeenNthCalledWith(3,actions.toggleFollowingProgress(false,1))


})