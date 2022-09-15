export function selectBattles(reduxState) {
  return reduxState.battle.battles;
}

export function selectOneBattle(reduxState) {
  return reduxState.battle.battleDetail;
}
