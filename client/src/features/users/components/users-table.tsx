import {FC} from 'react'
import {ListOfUsers} from '../types'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../../../components/ui/table'
import {Button} from '../../../components/ui/button'
import {BsPencilFill} from 'react-icons/bs'
import {MdOutlineClose} from 'react-icons/md'

interface UsersTableProps {
  users?: ListOfUsers;
  isLoading: boolean;
}

const UsersTable: FC<UsersTableProps> = ({users}) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[35%]">Email</TableHead>
        <TableHead>Firstname</TableHead>
        <TableHead>Lastname</TableHead>
        <TableHead>Age</TableHead>
        <TableHead className="text-right">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {users && users.map((user) => (
        <TableRow key={user.id}>
          <TableCell className="font-medium">{user.email}</TableCell>
          <TableCell>{user.firstname}</TableCell>
          <TableCell>{user.lastname}</TableCell>
          <TableCell className="text-left">{user.age}</TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end space-x-3">
              <Button variant="outline" size="icon">
                <BsPencilFill size={14}/>
              </Button>
              <Button variant="destructive" size="icon">
                <MdOutlineClose size={18}/>
              </Button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

export default UsersTable
