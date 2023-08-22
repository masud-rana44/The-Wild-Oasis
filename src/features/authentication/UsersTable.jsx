import { useUsers } from "./useUsers";

function UsersTable() {
  const { users, isLoading } = useUsers();
  return <div>UserTable</div>;
}

export default UsersTable;
