import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Keyboard,
  View,
  TouchableOpacity,
} from "react-native";

const AddTaskView = (props) => {
  const [text, setText] = useState("");

  const handleAddTask = () => {
    if (text !== "") {
      props.onPress(text);
      newText = "";
      setText(newText);
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={(newText) => setText(newText)}
        value={text}
        placeholder="Add a new task"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    align: "center",
  },
  textInput: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFF",
    fontSize: 17,
    borderRadius: 10,
  },
  button: {
    padding: 10,
  },
  buttonText: {
    fontSize: 17,
    color: "#558CF6",
    fontWeight: "bold",
  },
});

export default AddTaskView;
