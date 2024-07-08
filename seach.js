import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList, Image, ImageBackground } from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [
        {
          name: 'Creamline Cool Smashers',
          city: 'Philippines',
          image: require('./assets/ccs.png'), // Use local image
        },
        {
          name: 'Choco Mucho Flying Titans',
          city: 'Philippines',
          image: require('./assets/cmft.png'), // Use local image
        },
        {
          name: 'Petro Gas Angels',
          city: 'Philippines',
          image: require('./assets/pga.png'), // Use local image
        },
        {
          name: 'Saitama Ageo Medics',
          city: 'Japan',
          image: require('./assets/sga.png'), // Use local image
        },
        {
          name: 'Nakhon Ratchasima VC',
          city: 'Thailand',
          image: require('./assets/thailand.png'), // Use local image
        },
        // Add more teams as needed


        {
          name: ' VTV Bình Điền Long An',
          city: 'Vietnam',
          image: require('./assets/vt.jpg'), // Use local image
        },

        {
          name: ' Denso Airybees',
          city: 'Japan',
          image: require('./assets/jia.png'), // Use local image
        },
      ],
      searchTeam: '', // State to store the team being searched
      filteredTeams: [],
    };
  }

  componentDidMount() {
    this.setState({ filteredTeams: this.state.teams });
  }

  handleSearch = () => {
    const { searchTeam, teams } = this.state;
    const filteredTeams = teams.filter(team =>
      team.name.toLowerCase().includes(searchTeam.toLowerCase())
    );
    this.setState({ filteredTeams });
  }

  renderTeam = ({ item }) => (
    <View style={styles.teamContainer}>
      <Image source={item.image} style={styles.teamImage} />
      <View style={styles.teamDetails}>
        <Text style={styles.teamName}>{item.name}</Text>
        <Text>{item.city}</Text>
      </View>
    </View>
  );

  render() {
    const { searchTeam, filteredTeams } = this.state;

    return (
      <ImageBackground source={require('./assets/vb.jpg')} style={styles.background}>
        <View style={styles.overlay}>
          <Text style={styles.title}>Volleyball Teams</Text>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter team name"
              value={searchTeam}
              onChangeText={(text) => this.setState({ searchTeam: text })}
              onSubmitEditing={this.handleSearch} // Handle search on submit
            />
            <Button
              title="Search"
              onPress={this.handleSearch}
              color="#FFA500" // Volleyball-themed button color
            />
          </View>
          <FlatList
            data={filteredTeams}
            renderItem={this.renderTeam}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContainer}
          />
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white overlay
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  listContainer: {
    flexGrow: 1,
  },
  teamContainer: {
    flexDirection: 'row',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  teamImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  teamDetails: {
    justifyContent: 'center',
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
