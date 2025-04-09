import { useState, useEffect } from 'react';
import { getInfo, getLugar, getProfileInfo } from '../services/Service';

const useFetch = () => {
  const [infoacademica, setInfoacademica] = useState(null);
  const [lugar, setLugar] = useState(null);
  const [perfil, setPerfil] = useState(null);
      useEffect(() => {
          const fetchStudents = async () => {
              const data = await getInfo();
              setInfoacademica(data);
              setLoading(false);
          };
  
          fetchStudents();
      }, []);
      
        useEffect(() => {
          const fetchLugar = async () => {    
            const data = await getLugar();
            setLugar(data);
            setLoading(false);
          };
          fetchLugar();
        }, []);
        
          useEffect(() => {
            const fetchProfile = async () => {
              const data = await getProfileInfo();
              setPerfil(data);
              setLoading(false);
            };
            fetchProfile();
          }, []);
        
      return { infoacademica, lugar, perfil };   
};
export default useFetch;
