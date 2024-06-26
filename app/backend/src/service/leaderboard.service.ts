import matchService from './match.service';

const listGamesByName = (data: any[], status: string) => {
  const listByName = data.map((match: any) => {
    const { teamName } = match[`${status}Team`];
    return teamName;
  });
  const uniqueTeamsName = [...new Set(listByName)];
  const values = uniqueTeamsName.map((team: any) => {
    const filter = data.filter((match: any) => {
      const { teamName } = match[`${status}Team`];
      return teamName === team;
    });
    return filter;
  });
  return values;
};
const calcTotalVictories = (games: any) => games.reduce((acc: any, curr: any) => {
  if (curr.homeTeamGoals > curr.awayTeamGoals) {
    return acc + 1;
  }
  return acc;
}, 0);
const calcTotalDraws = (games: any) => games.reduce((acc: any, curr: any) => {
  if (curr.homeTeamGoals === curr.awayTeamGoals) {
    return acc + 1;
  }
  return acc;
}, 0);
const calcTotalLosses = (games: any) => games.reduce((acc: any, curr: any) => {
  if (curr.homeTeamGoals < curr.awayTeamGoals) {
    return acc + 1;
  }
  return acc;
}, 0);
const calcGoalsFavor = (games: any) => games
  .reduce((acc: any, curr: any) => acc + curr.homeTeamGoals, 0);

const calcGoalsOwn = (games: any) => games
  .reduce((acc: any, curr: any) => acc + curr.awayTeamGoals, 0);

const generateLeaderBoard = (data: any[], status: string) => data.map((games: any) => {
  const name = games[0][`${status}Team`].teamName;
  const totalGames = games.length;
  const totalVictories = calcTotalVictories(games);
  const totalDraws = calcTotalDraws(games);
  const totalLosses = calcTotalLosses(games);
  const goalsFavor = calcGoalsFavor(games);
  const goalsOwn = calcGoalsOwn(games);
  const totalPoints = (totalVictories * 3) + (totalDraws * 1);
  return { name,
    totalPoints,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn };
});
const listLeaderTeams = async (status: 'home' | 'away' = 'home') => {
  const { data } = await matchService.getAllInProgress(false);

  const listByName = listGamesByName(data, status);
  const leaderBoard = generateLeaderBoard(listByName, status);

  if (leaderBoard) {
    return { status: 'SUCCESSFUL', data: leaderBoard };
  }
  return { status: 'CONFLICT', data: [] };
};

export default {
  listLeaderTeams,
};
