import React from 'react';
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import GameItem from '../components/GameItem';
import {Game} from '../helpers/types';

interface GameListProps {
  games: Game[];
  isLoading: boolean;
  fetchGames: () => Promise<void>;
}

const GameList: React.FC<GameListProps> = ({games, isLoading, fetchGames}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={games}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchGames} />
        }
        refreshing={isLoading}
        onRefresh={() => {
          fetchGames();
        }}
        renderItem={({item}) => <GameItem game={item} />}
        keyExtractor={item => item.id.toString()} 
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
});

export default GameList;
