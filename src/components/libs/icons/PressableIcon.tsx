import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Props {
  name: any;
  size: number;
  color: string;
  handleClick?: () => void;
}

const PressableIcon = (props: Props) => {
  const { name, size, color, handleClick } = props;

  return (
    <TouchableOpacity hitSlop={20} activeOpacity={0.3} onPress={handleClick}>
      <Ionicons name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default PressableIcon;
