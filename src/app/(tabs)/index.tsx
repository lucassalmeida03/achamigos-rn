import { Link } from "expo-router";
import { View } from "react-native";
import { StepCards } from "../../components/StepsCards";

export default function Home() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-100">
     <StepCards/>
    </View>
  );
}