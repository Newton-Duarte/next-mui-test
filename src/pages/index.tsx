import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Link from 'next/link';

import { Login } from '@mui/icons-material';
import Head from 'next/head';
import { useForm } from 'react-hook-form';

import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { GetServerSideProps } from 'next';
import { withSSRGuest } from '@/utils/withSSRGuest';

const loginFormSchema = zod.object({
  email: zod.string().email('Required'),
  password: zod.string().min(6, 'Required'),
});

type LoginFormData = zod.infer<typeof loginFormSchema>;


export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function handleSignIn(data: any) {
    await console.log(data);
  }

  return (
    <>
      <Head>
        <title>Next Mui Test | Login</title>
      </Head>
      <Container maxWidth="lg">
        <Stack height="100dvh" alignItems="center" justifyContent="center">
          <Card
            elevation={3}
            sx={{
              padding: 3,
              width: 500,
              maxWidth: '100%',
              margin: '0 auto',
            }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <Stack
                component="form"
                onSubmit={handleSubmit(handleSignIn)}
                spacing={3}
              >
                <Typography color="primary" variant="h5" fontWeight="bold">
                  Next MUI Test - Login
                </Typography>
                <TextField
                  type="email"
                  label="Email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...register('email')}
                />
                <TextField
                  type="password"
                  label="Password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  {...register('password')}
                />
                <Button
                  type="submit"
                  startIcon={<Login />}
                  fullWidth
                  size="large"
                  variant="contained"
                >
                  Login
                </Button>
                <Divider />
                <Link href="/forgot-password">
                  <Button variant="text" size="small" fullWidth>
                    Forgot password?
                  </Button>
                </Link>
              </Stack>
            </Box>
          </Card>
        </Stack>
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(
  // eslint-disable-next-line no-unused-vars
  async (ctx) => {
    return {
      props: {},
    };
  }
);