import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UserForm from '../../../../src/features/users/components/user-form'
import {Button} from '../../../../src/components/ui/button'
import {UserMother} from '../../../../dummy/user-mother'

const defaultProps = {
  formTitle: 'Create user',
  formDescription: 'Add a new user'
}

describe('Create user form', () => {
  test('Should render dialog user form in the document an', async () => {
    render(
      <UserForm {...defaultProps}>
        <Button variant="outline">Create user</Button>
      </UserForm>
    )
    const openDialogButton = screen.getByText(/create user/i)
    await userEvent.click(openDialogButton)

    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {name: /Create user/i})
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Firstname')).toBeInTheDocument()
    expect(screen.getByLabelText('Lastname')).toBeInTheDocument()
    expect(screen.getByLabelText('Age')).toBeInTheDocument()
  })

  test('Should validate user form fields and show validations errors to user', async () => {
    render(
      <UserForm {...defaultProps}>
        <Button variant="outline">Create user</Button>
      </UserForm>
    )
    const openDialogButton = screen.getByText(/create user/i)
    await userEvent.click(openDialogButton)
    const submitButton = screen.getByText(/submit/i)
    await userEvent.click(submitButton)

    expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toHaveAttribute(
      'aria-invalid',
      'true'
    )

    expect(screen.getByText(/firstname is required/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Firstname')).toHaveAttribute(
      'aria-invalid',
      'true'
    )

    expect(screen.getByText(/lastname is required/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Lastname')).toHaveAttribute(
      'aria-invalid',
      'true'
    )

    await userEvent.type(screen.getByLabelText('Age'), 'aaaaaaaaa')
    expect(screen.getByText(/age must be a number/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Age')).toHaveAttribute('aria-invalid', 'true')
  })

  test('Form should validate that the given email is valid', async () => {
    render(
      <UserForm {...defaultProps}>
        <Button variant="outline">Create user</Button>
      </UserForm>
    )
    const openDialogButton = screen.getByText(/create user/i)
    await userEvent.click(openDialogButton)
    const submitButton = screen.getByText(/submit/i)

    await userEvent.type(screen.getByLabelText('Email'), 'invalidemail')
    await userEvent.type(screen.getByLabelText('Firstname'), 'Baldassare')
    await userEvent.type(screen.getByLabelText('Lastname'), 'Pugliese')
    await userEvent.type(screen.getByLabelText('Age'), '32')
    await userEvent.click(submitButton)

    expect(screen.getByText(/The given email is invalid/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toHaveAttribute(
      'aria-invalid',
      'true'
    )

    await userEvent.type(screen.getByLabelText('Email'), 'validemail@gmail.com')
    expect(screen.getByLabelText('Email')).toHaveAttribute(
      'aria-invalid',
      'false'
    )
  })

  test('Should trigger onSubmit event', async () => {
    const submitCallback = jest.fn()

    render(
      <UserForm {...defaultProps} onSubmit={submitCallback}>
        <Button variant="outline">Create user</Button>
      </UserForm>
    )
    const openDialogButton = screen.getByText(/create user/i)
    await userEvent.click(openDialogButton)
    const submitButton = screen.getByText(/submit/i)

    await userEvent.type(
      screen.getByLabelText('Email'),
      'invalidemail@gmail.com'
    )
    await userEvent.type(screen.getByLabelText('Firstname'), 'Baldassare')
    await userEvent.type(screen.getByLabelText('Lastname'), 'Pugliese')
    await userEvent.type(screen.getByLabelText('Age'), '32')
    await userEvent.click(submitButton)

    expect(submitCallback).toHaveBeenCalledTimes(1)
  })

  test('Should be disabled the submit button if the loading is \'pending\'', async () => {
    const submitCallback = jest.fn()

    render(
      <UserForm {...defaultProps} onSubmit={submitCallback} loading={true}>
        <Button variant="outline">Create user</Button>
      </UserForm>
    )
    const openDialogButton = screen.getByText(/create user/i)
    await userEvent.click(openDialogButton)
    const submitButton = screen.getByText(/submit/i)

    await userEvent.click(submitButton)
    expect(submitCallback).toHaveBeenCalledTimes(0)
    expect(submitButton).toHaveAttribute('aria-disabled', 'true')
  })

  test('Should render the form input with the given initial values', async () => {
    const user = UserMother.generateUser()
    render(
      <UserForm {...defaultProps} loading={true} initialValues={user}>
        <Button variant="outline">Create user</Button>
      </UserForm>
    )
    const openDialogButton = screen.getByText(/create user/i)
    await userEvent.click(openDialogButton)

    expect(screen.getByLabelText('Firstname')).toHaveValue(user.firstname)
    expect(screen.getByLabelText('Lastname')).toHaveValue(user.lastname)
    expect(screen.getByLabelText('Email')).toHaveValue(user.email)
    expect(screen.getByLabelText('Age')).toHaveValue(user.age.toString())
  })

  test('Email input should be disabled if the user is editing a record', async () => {
    const user = UserMother.generateUser()
    render(
      <UserForm {...defaultProps} loading={true} initialValues={user} mode="edit">
        <Button variant="outline">Create user</Button>
      </UserForm>
    )
    const openDialogButton = screen.getByText(/create user/i)
    await userEvent.click(openDialogButton)

    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-disabled', 'true')
  })
})
