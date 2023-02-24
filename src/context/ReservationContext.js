import { createContext, useContext, useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Reservations } from '../models';

const ReservationContext = createContext({});

const ReservationContextProvider = ({ children }) => {

    const [reservations, setReservations] = useState([]);

    const fetchReservations = async () => {
        const results = await DataStore.query(Reservations);
        setReservations(results);
    };

    useEffect(() => {
        fetchReservations();
    }, []);
    
    return (<ReservationContext.Provider value={{ reservations, setReservations }}>
        {children}</ReservationContext.Provider>
    );
};

export default ReservationContextProvider;
export const useReservationContext = () => useContext(ReservationContext);