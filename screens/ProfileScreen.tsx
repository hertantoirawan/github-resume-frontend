import { View, Text } from "../components/Themed";
import { useState } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { TextInput } from "react-native-paper";
import { TabView, SceneMap } from "react-native-tab-view";

const GeneralRoute = () => (
  <View style={styles.inputs}>
    <TextInput
      style={styles.input}
      mode="outlined"
      label="Company"
      // value={company}
      // onChangeText={(comp) => setCompany(comp)}
    />
    <TextInput
      style={styles.input}
      mode="outlined"
      label="Role"
      // value={role}
      // onChangeText={(jobRole) => setRole(jobRole)}
    />
  </View>
);

const WorkExperienceRoute = () => (
  <View style={styles.inputs}>
    <TextInput
      style={styles.input}
      mode="outlined"
      label="Company"
      // value={company}
      // onChangeText={(comp) => setCompany(comp)}
    />
    <TextInput
      style={styles.input}
      mode="outlined"
      label="Role"
      // value={role}
      // onChangeText={(jobRole) => setRole(jobRole)}
    />
  </View>
);

const EducationRoute = () => (
  <View style={styles.inputs}>
    <TextInput
      style={styles.input}
      mode="outlined"
      label="Company"
      // value={company}
      // onChangeText={(comp) => setCompany(comp)}
    />
    <TextInput
      style={styles.input}
      mode="outlined"
      label="Role"
      // value={role}
      // onChangeText={(jobRole) => setRole(jobRole)}
    />
  </View>
);

const renderScene = SceneMap({
  general: GeneralRoute,
  work: WorkExperienceRoute,
  education: EducationRoute,
});

export default function ProfileScreen({ navigation }) {
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "general", title: "General" },
    { key: "work", title: "Work" },
    { key: "education", title: "Education" },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});