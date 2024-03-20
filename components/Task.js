import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const Task = (props) => {
  const { text, onPress, onDeletePress, isCompleted } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.tasks}>
        <View style={styles.checkbox}>
          {isCompleted && <Text style={styles.checkmark}>&#10003;</Text>}
        </View>
        <Text style={[styles.itemText, isCompleted && styles.completedText]}>
          {text}
        </Text>
        <TouchableOpacity
          onPress={onDeletePress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <View>
            <Text style={styles.minus}>-</Text>
          </View>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tasks: {
    flexDirection: "row",
    marginTop: 20,
    width: 361,
    padding: 16,
    align: "center",
    gap: 16,
    backgroundColor: "#FFF",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
    justifyContent: "space-between",
  },
  itemText: {
    fontSize: 17,
    flexGrow: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    flex: 0,
    backgroundColor: "#8DDFDA66",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    color: "#000",
    fontSize: 15,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  minus: {
    color: "red",
    fontWeight: "bold",
    fontSize: "20",
  },
});

export default Task;
