import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
};

const AppLayout: React.FC<Props> = (props) => {
  const { children } = props;
  return <SafeAreaView style={[styles.container]}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AppLayout;
