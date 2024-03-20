import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import Task from "./components/Task.js";
import AddTaskView from "./components/AddTaskView.js";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [items, setItems] = useState([]);

  const handleAddTask = (task) => {
    const updatedTasks = [...items, { text: task, isCompleted: false }];
    setItems(updatedTasks);
    saveTasks(updatedTasks);
  };

  const saveTasks = async (tasks) => {
    try {
      const jsonValue = JSON.stringify(tasks);
      await AsyncStorage.setItem("tasks-list", jsonValue);
    } catch (error) {
      console.error("Error loading tasks from AsyncStorage: ", error);
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("tasks-list");
        if (storedTasks !== null) {
          setItems(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error("Error loading tasks from AsyncStorage: ", error);
      }
    };
    loadTasks();
  }, []);

  const onTaskPress = (index) => {
    const updatedTasks = [...items];
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
    if (updatedTasks[index].isCompleted) {
      const completedTask = updatedTasks.splice(index, 1)[0];
      updatedTasks.push(completedTask);
    }
    setItems(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.titleText}>Today's Tasks</Text>
        <FlatList
          data={items}
          renderItem={({ item, index }) => (
            <Task
              text={item.text}
              onPress={() => onTaskPress(index)}
              isCompleted={item.isCompleted}
              key={index}
            />
          )}
          style={styles.tasks}
        ></FlatList>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.addTaskContainer}
      >
        <AddTaskView onPress={handleAddTask} />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F1F1",
  },
  tasksWrapper: {
    marginTop: 80,
    marginHorizontal: 16,
  },
  tasks: {
    marginTop: 20,
  },
  titleText: {
    fontSize: 34,
    fontWeight: "bold",
  },
  addTaskContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    backgroundColor: "#F5F1F1",
  },
});
