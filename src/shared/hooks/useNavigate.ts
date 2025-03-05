import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootStackParams} from '@shared/interface/rootStackParams';

/**
 * navigation hook
 * @returns navigation
 */
const useNavigate = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  return navigation;
};

export default useNavigate;
