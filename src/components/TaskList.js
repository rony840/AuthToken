import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const TaskListItem = ({ id, name, item, isCompleted, onUpdate, onEdit, onDelete }) => {
  return (
        <View key={id} style={styles.card}>
            <View style={styles.taskContainer}>
              <Text
                style={[
                  styles.taskText,
                  isCompleted && styles.completedTaskText,
                ]}
              >
                {name}
              </Text>
            </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity key={item.id} onPress={() => onUpdate(item)} style={styles.buttonCont1}>
              <Image style={ isCompleted ? styles.redoIcon : styles.doneIcon } source={ isCompleted ?  require('../assets/icons/redo.png') : require('../assets/icons/done.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onEdit(item)} style={styles.buttonCont2}>
            <Image style={styles.editIcon} source={require('../assets/icons/edit.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onDelete(item)} style={styles.buttonCont2}>
              <Image style={styles.delIcon} source={require('../assets/icons/delete.png')} />
            </TouchableOpacity>
          </View>
        </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    width: 350,
  },
  card: {
    width: 350,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgb(200, 207, 255)",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // for Android shadow
  },
  taskContainer: {
    paddingRight: 1,
  },
  taskText: {
    fontSize: 16,
    color: "black",
  },
  completedTaskText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex:1
  },
  doneText: {
    color: "white",
    fontWeight: "bold",
  },
  editIcon: {
    tintColor: "black",
    height: 25,
    width: 25,
  },
  buttonCont2: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 50,
    marginHorizontal: 5,
  },
  delIcon: {
    tintColor: "red",
    height: 25,
    width: 25,
  },
  buttonCont1: {
    padding: 3,
    backgroundColor: "white",
    borderRadius: 50,
    marginHorizontal: 5,
  },
  doneIcon: {
    tintColor: "green",
    height: 35,
    width: 35,
  },
  redoIcon: {
    tintColor: "orange",
    height: 35,
    width: 35,
  }
});

export default TaskListItem;
