export function selectUser(reduxState){
    return reduxState.user.user;
}

export function selectToken(reduxState){
    return reduxState.user.token;
}

export function selectAuthCheck(reduxState){
    return reduxState.user.authCheck;
}