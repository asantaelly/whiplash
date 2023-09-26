import { StyleSheet, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
} & ViewProps;

const AppLayout: React.FC<Props> = (props) => {
  const { children } = props;
  return <SafeAreaView style={[styles.container]} {...props}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
});

export default AppLayout;
