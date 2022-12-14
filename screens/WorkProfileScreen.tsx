import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { Card, FAB } from "react-native-paper";
import { Text, View } from "../components/Themed";
import { useAuth } from "../hooks/useAuth";

export default function WorkProfileScreen() {
  const navigation = useNavigation();
  const [workExperience, setWorkExperience] = useState([]);
  const [refreshing, setRefreshing] = useState(true);

  const { user } = useAuth();

  const getWorkExperience = () => {
    axios
      .get(`${process.env.APP_BACKEND_URL}/user/${user.id}/work`)
      .then((res) => {
        setWorkExperience(res.data);
        setRefreshing(false);
        console.log(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getWorkExperience();
  }, []);

  const addWorkExperience = () => {
    console.log("add work experience.");
    navigation.navigate("AddWorkModal");
  };

  return (
    <View style={styles.container}>
      {refreshing ? <ActivityIndicator /> : null}
      <FlatList
        data={workExperience}
        renderItem={({ item }) => (
          <Card key={item.id} style={styles.card} mode="outlined">
            <Card.Title
              title={`${item.role} at ${item.company}`}
              subtitle={`${moment(item.start).format("YYYY")} - ${
                item.end ? moment(item.end).format("YYYY") : "Present"
              }`}
            />
            <Card.Content>
              <Text>{item.contribution}</Text>
            </Card.Content>
          </Card>
        )}
        showsHorizontalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={getWorkExperience}
          />
        }
      />
      <FAB icon="plus" style={styles.fab} onPress={addWorkExperience} />
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
