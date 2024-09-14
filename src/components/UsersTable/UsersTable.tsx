import { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, filterName, filterUsername, filterEmail, filterPhone, selectFilteredUsers } from '../../redux/usersSlice';
import { AppDispatch } from '../../redux/store';
import SearchField from '../Search/SearchField';
import UserRow from '../UserRow/UserRow'
import fields from './fields';
import { fieldType, SearchFields } from './types';
import './UsersTable.styles.css';

const UsersTable = () => {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector(selectFilteredUsers);

    const [searchTerms, setSearchTerms] = useState<SearchFields>();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleSearch = useCallback(
        (type: keyof typeof searchTerms) => (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setSearchTerms({
                name: type === 'name' ? value : '',
                username: type === 'username' ? value : '',
                email: type === 'email' ? value : '',
                phone: type === 'phone' ? value : '',
            });

            switch (type) {
                case 'name':
                    dispatch(filterName(value));
                    break;
                case 'username':
                    dispatch(filterUsername(value));
                    break;
                case 'email':
                    dispatch(filterEmail(value));
                    break;
                case 'phone':
                    dispatch(filterPhone(value));
                    break;
                default:
                    break;
            }
        },
        [dispatch]
    );

    const memoizedUsers = useMemo(() => users, [users]);

    return (
        <div className="tableWrap">
            <table className="table">
                <thead>
                <tr>
                    {fields.map((field) => (
                        <SearchField
                            key={field.type}
                            label={field.label}
                            value={searchTerms ? searchTerms[field.type as fieldType] : undefined}
                            placeholder={field.placeholder}
                            onChange={handleSearch(field.type as keyof typeof searchTerms)}
                        />
                    ))}
                </tr>
                </thead>
                <tbody>
                {memoizedUsers.map((user) => (
                    <UserRow key={user.id} user={user} />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;
