import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

export const useTypedNavigation = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  const navigate = <RouteName extends keyof RootStackParamList>(
    ...args: undefined extends RootStackParamList[RouteName]
      ? [screen: RouteName] | [screen: RouteName, params: RootStackParamList[RouteName]]
      : [screen: RouteName, params: RootStackParamList[RouteName]]
  ) => {
    // @ts-ignore - TypeScript a du mal avec les types conditionnels complexes
    navigation.navigate(...args);
  };

  return {
    navigate,
    goBack: navigation.goBack,
    // Ajoutez d'autres méthodes de navigation si nécessaire
  };
};