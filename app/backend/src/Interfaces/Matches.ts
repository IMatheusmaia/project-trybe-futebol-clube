export default interface Matches {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
  homeTeam?: {
    teamName: string
  },
  awayTeam?: {
    teamName: string
  },
  onUpdate?: string,
  onDelete?: string,
}
