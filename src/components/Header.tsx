import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import {
  CategoryType,
  FilterOptions,
  PlatformType,
  SortByValues,
} from '../helpers/types';
import {capitalizeFirstLetter} from '../helpers/generalFunctions';

const deviceWidth = Dimensions.get('window').width;

interface HeaderProps {
  title: string;
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const Header: React.FC<HeaderProps> = ({title, filters, onFilterChange}) => {
  const types = useMemo(() => {
    return {
      platform: ['all', 'pc', 'browser'] as PlatformType[],
      category: [
        'mmorpg',
        'shooter',
        'strategy',
        'action',
        'racing',
        'sports',
        'mmo',
        'survival',
        'social',
      ] as CategoryType[],
      sortBy: [
        'release-date',
        'popularity',
        'alphabetical',
        'relevance',
      ] as SortByValues[],
    };
  }, []);

  const handlePlatformFilter = (platform: PlatformType) => {
    onFilterChange({...filters, platform});
  };

  const handleCategoryFilter = (category: CategoryType) => {
    onFilterChange({...filters, category});
  };

  const handleSortByChange = (sortBy: SortByValues) => {
    onFilterChange({...filters, sortBy});
  };

  const renderFilterButtonCategory = ({item}: {item: CategoryType}) => {
    const isActive = filters.category === item;
    return (
      <TouchableOpacity
        style={[styles.filterButton, isActive && styles.activeFilterButton]}
        onPress={() => handleCategoryFilter(item)}>
        <Text style={styles.filterButtonText}>
          {capitalizeFirstLetter(item)}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderFilterButtonPlatform = ({item}: {item: PlatformType}) => {
    const isActive = filters.platform === item;
    return (
      <TouchableOpacity
        style={[styles.filterButton, isActive && styles.activeFilterButton]}
        onPress={() =>
          isActive ? handlePlatformFilter('all') : handlePlatformFilter(item)
        }>
        <Text style={styles.filterButtonText}>
          {capitalizeFirstLetter(item)}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSortByButton = ({item}: {item: SortByValues}) => {
    return (
      <TouchableOpacity
        style={[
          styles.sortByButton,
          filters.sortBy === item && styles.activeSortByButton,
        ]} 
        onPress={() => handleSortByChange(item)}>
        <Text style={styles.sortByButtonText}>
          {capitalizeFirstLetter(item).replace('-', ' ')}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.filterContainer}>
        <FlatList
          data={types.platform}
          renderItem={renderFilterButtonPlatform}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <View style={styles.filterContainer}>
        <FlatList
          data={types.category}
          renderItem={renderFilterButtonCategory}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={true}
        />
      </View>
      <View style={styles.sortByContainer}>
        <Text style={styles.sortByLabel}>Sort By:</Text>
        <FlatList
          data={types.sortBy}
          renderItem={renderSortByButton}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    maxWidth: deviceWidth - 32,
    marginBottom: 8,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: '#e5e5e5',
  },
  activeFilterButton: {
    backgroundColor: '#4287f5',
  },
  filterButtonText: {
    color: 'black',
  },
  sortByContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: deviceWidth - 32,
  },
  sortByLabel: {
    marginRight: 8,
    fontSize: 16,
  },
  sortByButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#e5e5e5',
    marginRight: 8,
  },
  activeSortByButton: {
    backgroundColor: '#4287f5',
  },
  sortByButtonText: {
    color: 'black',
  },
});

export default Header;
