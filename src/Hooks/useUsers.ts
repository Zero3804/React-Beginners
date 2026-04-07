import { useEffect, useState } from "react";
import userService, { User } from "../services/userService";
import { CanceledError } from "axios";

const useUsers = ( ) => {
    const [users, setUsers] = useState<User[]>([]);
      const [error, setError] = useState("");
      const [isLoading, setLoading] = useState(false);
    
      useEffect(() => {
        const controller = new AbortController();
        const {request, cancel} = userService.getAll<User>();
        
        const fetchUsers = async () => {
          setLoading(true);
          try {
            const res = await request;
            setUsers(res.data);
            setLoading(false);
          } catch (err) {
            if (err instanceof CanceledError) return;
            setError((err as Error).message);
            setLoading(false);
          }
        };
        fetchUsers();
        return () => cancel(); 
      }, []);
        return {users, error, isLoading, setUsers, setError};
}

export default useUsers;