import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import TablasNotasVertical from '../ProgramacionScreens/TablaNotas/TablaNotasVertical';
import TablasNotasHorizontal from '../ProgramacionScreens/TablaNotas/TablasNotasHorizontal';


const MatriculaScreen = () => {
  const [isPortrait, setIsPortrait] = useState(isDevicePortrait());

  function isDevicePortrait() {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
  }

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', () => {
      setIsPortrait(isDevicePortrait());
    });

    return () => subscription?.remove();
  }, []);

  return isPortrait ? <TablasNotasVertical /> : <TablasNotasHorizontal />;
};

export default MatriculaScreen;