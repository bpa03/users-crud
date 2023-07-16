import {render, screen} from '@testing-library/react'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import UsersTable from '../../../../src/features/users/components/users-table'
import {UserMother} from '../../../../dummy/user-mother'

const queryClient = new QueryClient()
const wrapper = ({children}: {children: React.ReactNode}) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
)

describe('Users table', () => {
  test('Should render all the given users', async () => {
    const users = UserMother.generateMultipleUsers(10)
    render(<UsersTable users={users} isLoading={false} />, {wrapper})
    for (const user of users) {
      expect(screen.getByText(user.email)).toBeInTheDocument()
      expect(screen.getByText(user.firstname)).toBeInTheDocument()
      expect(screen.getByText(user.lastname)).toBeInTheDocument()
    }
  })

  test('Should render the action buttons', async () => {
    const user = UserMother.generateUser()
    render(<UsersTable users={[user]} isLoading={false} />, {wrapper})

    expect(screen.getByRole('button', {name: /delete user/i})).toBeInTheDocument()
    expect(screen.getByRole('button', {name: /update user/i})).toBeInTheDocument()
  })
})

