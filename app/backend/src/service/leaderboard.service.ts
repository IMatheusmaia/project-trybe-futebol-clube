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

const primaryAttributes = (games: any, status: string) => {
  const name = games[0][`${status}Team`].teamName;
  const totalGames = games.length;
  const totalVictories = calcTotalVictories(games);
  const totalDraws = calcTotalDraws(games);
  const totalLosses = calcTotalLosses(games);
  const goalsFavor = calcGoalsFavor(games);
  const goalsOwn = calcGoalsOwn(games);
  return {
    name,
    totalGames,
    totalVictories,
    totalDraws,
    totalLosses,
    goalsFavor,
    goalsOwn,
  };
};
const secondaryAttributes = (games: any, status: string) => {
  const { totalVictories, totalDraws,
    goalsFavor, totalGames, goalsOwn } = primaryAttributes(games, status);

  const totalPoints = (totalVictories * 3) + (totalDraws * 1);
  const goalsBalance = goalsFavor - goalsOwn;
  const efficiency = Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
  return {
    totalPoints,
    efficiency,
    goalsBalance,
  };
};
const generateLeaderBoard = (data: any[], status: string) => data.map((games: any) => ({
  ...primaryAttributes(games, status),
  ...secondaryAttributes(games, status),
}));

const listLeaderTeams = async (status: 'home' | 'away' = 'home') => {
  const { data } = await matchService.getAllInProgress(false);

  const listByName = listGamesByName(data, status);
  const leaderBoard = generateLeaderBoard(listByName, status);
  const orderedLeaderBoard = leaderBoard.sort((a, b) => {
    if (a.totalPoints !== b.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }
    if (a.goalsBalance !== b.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }
    return b.goalsFavor - a.goalsFavor;
  });

  if (leaderBoard) {
    return { status: 'SUCCESSFUL', data: orderedLeaderBoard };
  }
  return { status: 'CONFLICT', data: [] };
};

export default {
  listLeaderTeams,
};
