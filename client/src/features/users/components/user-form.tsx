'use client'
import {FC} from 'react'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {Form, FormField, FormItem, FormControl, FormMessage, FormLabel} from '../../../components/ui/form'
import {Input} from '../../../components/ui/input'
import {Button} from '../../../components/ui/button'

// Form schema
const userFormSchema = yup.object({
  email: yup.string().required('Email is required').email('The given email is invalid'),
  firstname: yup.string().required('Firstname is required'),
  lastname: yup.string().required('Lastname is required'),
  age: yup.number().typeError('Age must be a number').required('Age is required').positive('Age must be positive')
})

interface UserFormProps {
  onSubmit?: (form: yup.InferType<typeof userFormSchema>) => void;
  loading?: boolean;
}

const UserForm: FC<UserFormProps> = ({onSubmit, loading}) => {
  const form = useForm({
    resolver: yupResolver(userFormSchema),
    defaultValues: {
      email: '',
      firstname: '',
      lastname: '',
      age: 0
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((form) => {
        if (onSubmit) onSubmit(form)
      })} role="form" className="space-y-4 w-10/12 mx-auto mt">
        <div className="text-center">
          <h1 className="font-bold text-2xl capitalize">User form</h1>
        </div>
        <FormField 
          control={form.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="firstname"
          render={({field}) => (
            <FormItem>
              <FormLabel>Firstname</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="lastname"
          render={({field}) => (
            <FormItem>
              <FormLabel>Lastname</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField 
          control={form.control}
          name="age"
          render={({field}) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading} aria-disabled={loading}>Submit</Button>
      </form>
    </Form>
  )
}

export default UserForm
