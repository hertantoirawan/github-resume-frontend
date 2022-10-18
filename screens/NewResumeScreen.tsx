import { View, Text } from "../components/Themed";
import {
  TextInput,
  Button,
  Chip,
  Searchbar,
  Divider,
} from "react-native-paper";
import { StyleSheet, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const user = {
  name: "Hertanto Irawan",
  profile: "Software engineer with 10+ years of experience in Asia and the US.",
  website: "linkedin.com/in/hertantolie",
  email: "hertanto.irawan@outlook.com",
  phone: "+628979655562",
};

export default function NewResumeScreen({ navigation }) {
  const [resumeName, setResumeName] = useState("");
  const [resumeDescription, setResumeDescription] = useState("");
  const [resumeTags, setResumeTags] = useState([]);

  const handleNext = () => {
    navigation.navigate("Projects", {
      resume: {
        name: resumeName,
        description: resumeDescription,
        tags: resumeTags,
        templateId: 1,
      },
    });
  };

  const [text, setText] = useState("");
  const addResumeTags = () => {
    const tags = [...resumeTags];

    if (!tags.some((tag) => tag.name.toLowerCase() == text.toLowerCase())) {
      tags.push({ name: text });
      setResumeTags(tags);
    }

    setText("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        mode="outlined"
        label="Name"
        value={resumeName}
        onChangeText={(resumeName) => setResumeName(resumeName)}
      />
      <TextInput
        style={styles.multilineInput}
        mode="outlined"
        label="Description"
        value={resumeDescription}
        onChangeText={(resumeDescription) =>
          setResumeDescription(resumeDescription)
        }
      />

      <View style={styles.tags}>
        <TextInput
          style={{ width: "90%", marginRight: 8 }}
          mode="outlined"
          label="Tags"
          value={text}
          onChangeText={(text) => setText(text)}
        />
        <MaterialCommunityIcons
          name="tag-plus-outline"
          size={30}
          color="black"
          onPress={addResumeTags}
        />
      </View>

      <View style={styles.tags}>
        {resumeTags.map(({ name }) => (
          <Chip key={name} style={{ marginRight: 8 }}>
            {name}
          </Chip>
        ))}
      </View>
      <Button style={styles.button} mode="contained" onPress={handleNext}>
        Next
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    margin: 10,
  },
  multilineInput: {
    margin: 10,
    height: 100,
  },
  button: {
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  tags: {
    flexDirection: "row",
    padding: 10,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
