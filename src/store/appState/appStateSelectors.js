
export function selectMessage(reduxState){
    return reduxState.appState.message;
}

export function selectLoading(reduxState){
    return reduxState.appState.loading;
}