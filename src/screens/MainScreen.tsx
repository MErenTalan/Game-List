import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import GameList from './GameList';
import Header from '../components/Header';
import {FilterOptions, Game} from '../helpers/types';

const MainScreen: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({
    platform: 'all',
    category: 'mmorpg',
    sortBy: 'release-date',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchGames();
  }, [filters]);

  const fetchGames = async () => {
    try {
      setIsLoading(true);
      const url = `https://www.freetogame.com/api/games?platform=${filters.platform}&category=${filters.category}&sort-by=${filters.sortBy}`;
      const response = await fetch(url);
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <View style={styles.container}>
      <Header
        title="Free-to-Play Games"
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      <GameList fetchGames={fetchGames} isLoading={isLoading} games={games} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default MainScreen;
