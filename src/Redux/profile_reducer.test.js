import profileReducer, {addPostActionCreator} from "./profile_reducer";

it('my first test', function() {
    let state={
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 12},
            {id: 2, message: 'It\'s my first post', likesCount: 11},
            {id: 3, message: 'Blabla', likesCount: 11},
            {id: 4, message: 'Dada', likesCount: 11}
        ]
    }
    let action=addPostActionCreator('new Post')
    let newPost=profileReducer(state,action)
    expect(newPost.posts[4].message).toBe('new Post')
})