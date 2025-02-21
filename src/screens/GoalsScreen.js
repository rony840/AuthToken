// Goals.js
import { StyleSheet, SafeAreaView, View} from 'react-native';
import TextDisplay from '../components/TextDisplay';
import Background from '../components/Background';

const Goals = () => {

  return (
    <SafeAreaView style={styles.container}>
      <Background/>
      <View style={styles.contentContainer}>
        <TextDisplay txt={'Goals Screen'}/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingVertical: '5%',
  },
});

export default Goals;
