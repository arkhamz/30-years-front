export function selectCommanders(reduxState) {
  return reduxState.commander.commanders;
}

export function selectOneCommander(reduxState) {
  return reduxState.commander.commanderDetail;
}
