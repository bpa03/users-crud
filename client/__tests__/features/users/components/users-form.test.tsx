import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UserForm from '../../../../src/features/users/components/user-form'

describe('Create user form', () => {
  test('Should render user form in the document', () => {
    render(<UserForm />)
    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(screen.getByRole('heading', {name: 'User form'})).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Firstname')).toBeInTheDocument()
    expect(screen.getByLabelText('Lastname')).toBeInTheDocument()
    expect(screen.getByLabelText('Age')).toBeInTheDocument()
  })

  test('Should validate user form fields and show validations errors to user', async () => {
    render(<UserForm />)
    const submitButton = screen.getByText(/submit/i)
    await userEvent.click(submitButton)

    expect(screen.getByText(/email is required/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true')

    expect(screen.getByText(/firstname is required/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Firstname')).toHaveAttribute('aria-invalid', 'true')

    expect(screen.getByText(/lastname is required/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Lastname')).toHaveAttribute('aria-invalid', 'true')

    await userEvent.type(screen.getByLabelText('Age'), 'aaaaaaaaa')
    expect(screen.getByText(/age must be a number/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Age')).toHaveAttribute('aria-invalid', 'true')
  })

  test('Form should validate that the given email is valid', async () => {
    render(<UserForm />)
    const submitButton = screen.getByText(/submit/i)
    
    await userEvent.type(screen.getByLabelText('Email'), 'invalidemail')
    await userEvent.type(screen.getByLabelText('Firstname'), 'Baldassare')
    await userEvent.type(screen.getByLabelText('Lastname'), 'Pugliese')
    await userEvent.type(screen.getByLabelText('Age'), '32')
    await userEvent.click(submitButton)

    expect(screen.getByText(/The given email is invalid/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true')

    await userEvent.type(screen.getByLabelText('Email'), 'validemail@gmail.com')
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'false')
  })

  test('Should trigger onSubmit event', async () => {
    const submitCallback = jest.fn()

    render(<UserForm onSubmit={submitCallback} />)
    const submitButton = screen.getByText(/submit/i)
    
    await userEvent.type(screen.getByLabelText('Email'), 'invalidemail@gmail.com')
    await userEvent.type(screen.getByLabelText('Firstname'), 'Baldassare')
    await userEvent.type(screen.getByLabelText('Lastname'), 'Pugliese')
    await userEvent.type(screen.getByLabelText('Age'), '32')
    await userEvent.click(submitButton)

    expect(submitCallback).toHaveBeenCalledTimes(1)
  })

  test('Should be disabled the submit button if the loading is \'pending\'', async () => {
    const submitCallback = jest.fn()

    render(<UserForm onSubmit={submitCallback} loading={true} />)
    const submitButton = screen.getByText(/submit/i)

    await userEvent.click(submitButton)
    expect(submitCallback).toHaveBeenCalledTimes(0)
    expect(submitButton).toHaveAttribute('aria-disabled', 'true')
  })
})
