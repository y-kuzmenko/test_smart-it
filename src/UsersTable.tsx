import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, filterName, filterUsername, filterEmail, filterPhone, selectFilteredUsers } from './usersSlice';
import { AppDispatch } from './store';
import './UsersTable.css';

const UsersTable = () => {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector(selectFilteredUsers);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleSearchName = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(filterName(event.target.value));
    };
    const handleSearchUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(filterUsername(event.target.value));
    };
    const handleSearchEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(filterEmail(event.target.value));
    };
    const handleSearchPhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(filterPhone(event.target.value));
    };

    return (
        <div className="tableWrap">
            <table className="table">
            <thead>
                <tr>
                    <th>
                        Name 
                        <input type="text" placeholder="Search Name..." onChange={handleSearchName} />
                    </th>
                    <th>
                        Username 
                        <input type="text" placeholder="Search Username..." onChange={handleSearchUsername} />
                    </th>
                    <th>
                        Email 
                        <input type="text" placeholder="Search Email..." onChange={handleSearchEmail} />
                    </th>
                    <th>
                        Phone 
                        <input type="text" placeholder="Search Phone..." onChange={handleSearchPhone} />
                    </th>
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
}

export default UsersTable;
