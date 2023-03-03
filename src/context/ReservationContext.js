import { createContext, useContext, useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Reservations } from '../models';
import { useAuthContext } from './AuthContext';

const ReservationContext = createContext({});

const ReservationContextProvider = ({ children }) => {

    const { dbUser } = useAuthContext();

    const [reservations, setReservations] = useState([]);
    console.log('dbUser');
    console.log(dbUser);

    const fetchReservations = async () => {
        const results = await DataStore.query(Reservations, r => r.userID.eq(dbUser?.id)).then(setReservations);
        setReservations(results);
    };

    useEffect(() => {
        if(!dbUser){
            return;
        }
        DataStore.query(Reservations, r => r.userID.eq(dbUser?.id)).then(setReservations);
    }, [dbUser]);

    return (<ReservationContext.Provider value={{ reservations, setReservations }}>
        {children}</ReservationContext.Provider>
    );
};

export default ReservationContextProvider;
export const useReservationContext = () => useContext(ReservationContext);