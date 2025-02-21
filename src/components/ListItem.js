import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../assets/colors/Colors';

const ListItem = ({ id, title, createDt, updateDt, onEdit, onDelete }) => {
  return (
    <View style={styles.itemContainer}>
        <View style={styles.transactionDetails}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>Created on: {createDt}</Text>
          <Text style={styles.date}>Updated on: {updateDt}</Text>
        </View>

        {/* Edit and Delete Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onEdit(id)} // Pass the id to the edit handler
          >
            <Image style={styles.icon1} source={require('../assets/icons/edit.png')}/>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => onDelete(id)} // Pass the id to the delete handler
          >
            <Image style={styles.icon2} source={require('../assets/icons/delete.png')}/>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: Colors.companyName,
    borderRadius: 10,
    justifyContent: 'space-between', // Space out the details and the buttons
    flexDirection: 'row',
    alignItems:'center'
  },
  transactionDetails: {
    flexWrap:'nowrap',
    width:200,
    height:80,
    justifyContent: 'space-between', // Space out the details and the buttons
    alignItems: 'flex-start',
    
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    overflow:'hidden',
    
  },
  amount: {
    fontSize: 16,
    color: '#4CAF50', // Green color for payment amount
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons in a row
    justifyContent: 'flex-end', // Align buttons to the right
  },
  icon1:{
    tintColor:Colors.appBackground,
    height:25,
    width:25,
  },
  icon2:{
    tintColor:'red',
    height:25,
    width:25,
  },
  button: {
    padding: 10,
    backgroundColor: Colors.formButtonBG,
    borderRadius: 20,
    marginHorizontal: 5,
  },
});

export default ListItem;
