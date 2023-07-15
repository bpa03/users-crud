'use client'
import {FC, PropsWithChildren} from 'react'
import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {Form, FormField, FormItem, FormControl, FormMessage, FormLabel} from '../../../components/ui/form'
import {Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader} from '../../../components/ui/dialog'
import {Input} from '../../../components/ui/input'
import {Button} from '../../../components/ui/button'
import {User} from '../types'

// Form schema
const userFormSchema = yup.object({
  email: yup.string().required('Email is required').email('The given email is invalid'),
  firstname: yup.string().required('Firstname is required'),
  lastname: yup.string().required('Lastname is required'),
  age: yup.number().typeError('Age must be a number').required('Age is required').positive('Age must be positive')
})

interface UserFormProps {
  onSubmit?: (form: yup.InferType<typeof userFormSchema>) => void;
  mode?: 'edit' | 'create';
  formTitle: string;
  formDescription: string;
  loading?: boolean;
  initialValues?: User;
}

const UserForm: FC<PropsWithChildren<UserFormProps>> = ({onSubmit, loading, formDescription, formTitle, children, initialValues, mode}) => {
  const form = useForm({
    resolver: yupResolver(userFormSchema),
    defaultValues: {
      email: initialValues?.email ?? '',
      firstname: initialValues?.firstname ?? '',
      lastname: initialValues?.lastname ?? '',
      age: initialValues?.age ?? 0
    }
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:w-96">
        <DialogHeader>
          <DialogTitle className="mt-3">{formTitle}</DialogTitle>
          <DialogDescription className="text-zinc-500">{formDescription}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit((form) => {
            if (onSubmit) onSubmit(form)
          })} role="form">
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={mode && mode === 'edit'} aria-disabled={mode && mode === 'edit'} />
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
            </div>
            <Button type="submit" className="w-full mt-5" disabled={loading} aria-disabled={loading}>Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UserForm
