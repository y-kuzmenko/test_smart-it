type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
};

type UserRowProps = {
    user: User;
};

const UserRow: React.FC<UserRowProps> = ({ user }) => (
    <tr>
        <td>{user.name}</td>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
    </tr>
);

export default UserRow;
