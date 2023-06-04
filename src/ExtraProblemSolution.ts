interface GameStats {
  gameId: string;
  playTime: number;
  wins: number;
  fails: number;
}

const groupGameStats = (gameStats: Record<string, GameStats>): GameStats[] => {
  const games: Record<string, GameStats> = {};

  for (const key in gameStats) {
    const gameStat = gameStats[key];
    if (!games[gameStat.gameId]) {
      games[gameStat.gameId] = {
        gameId: gameStat.gameId,
        playTime: gameStat.playTime,
        wins: gameStat.wins,
        fails: gameStat.fails,
      };
    } else {
      games[gameStat.gameId].playTime += gameStat.playTime;
      games[gameStat.gameId].wins += gameStat.wins;
      games[gameStat.gameId].fails += gameStat.fails;
    }
  }

  const groupedStats: GameStats[] = [];
  for (const key in games) {
    groupedStats.push(games[key]);
  }

  return groupedStats;
};

// Örnek kullanım:
const gameStats: Record<string, GameStats> = {
  'archery-mission-lvl': {
    fails: 9,
    gameId: 'archery-world-tour',
    playTime: 5291.706,
    wins: 8,
  },
  'archery-world-mission-1': {
    fails: 9,
    gameId: 'archery-world-tour',
    playTime: 981,
    wins: 6,
  },
  'bubble-woods-mission-1': {
    fails: 19,
    gameId: 'bubble-woods',
    playTime: 1206,
    wins: 9,
  },
  'bubble-woods-mission-lvl': {
    fails: 1,
    gameId: 'bubble-woods',
    playTime: 100,
    wins: 2,
  },
  'candy-bubble-mission-lvl': {
    fails: 6,
    gameId: 'candy-bubble',
    playTime: 1558,
    wins: 6,
  },
};

const groupedStats = groupGameStats(gameStats);
console.log(groupedStats);
