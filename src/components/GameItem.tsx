import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {Game} from '../helpers/types';

interface GameItemProps {
  game: Game;
}

const GameItem: React.FC<GameItemProps> = ({game}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: game.thumbnail}} style={styles.thumbnail} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{game.name}</Text>
        <Text style={styles.platform}>{game.platform}</Text>
        <Text style={styles.category}>{game.category}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  detailsContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  platform: {
    fontSize: 14,
    marginBottom: 2,
  },
  category: {
    fontSize: 14,
    color: '#888',
  },
});

export default GameItem;
