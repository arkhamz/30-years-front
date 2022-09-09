export function selectUser(reduxState){
    return reduxState.user.user;
}

export function selectToken(reduxState){
    return reduxState.user.token;
}