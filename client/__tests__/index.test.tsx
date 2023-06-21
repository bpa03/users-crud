import {render, screen} from '@testing-library/react'

function HelloWorld() {
  return (
    <h1>Hello, World!</h1>
  )
}

describe('Index', () => {
  test('Should render hello world', () => {
    render(<HelloWorld />)

    const text = screen.getByText(/Hello, World!/i)

    expect(text).toBeInTheDocument()
  })
})
