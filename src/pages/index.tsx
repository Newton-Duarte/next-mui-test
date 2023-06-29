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
import Image from 'next/image';
import Link from 'next/link';

import { Login } from '@mui/icons-material';
import Head from 'next/head';
import { useForm } from 'react-hook-form';

import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { GetServerSideProps } from 'next';
import { withSSRGuest } from '@/utils/withSSRGuest';

const loginFormSchema = zod.object({
  email: zod.string().email('Informe o e-mail'),
  password: zod.string().min(6, 'Informe a senha'),
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
        <title>Água Amigão | Login</title>
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
                  Água Amigão - Login
                </Typography>
                <TextField
                  type="email"
                  label="E-mail"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  {...register('email')}
                />
                <TextField
                  type="password"
                  label="Senha"
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
                  Entrar
                </Button>
                <Divider />
                <Link href="/forgot-password">
                  <Button variant="text" size="small" fullWidth>
                    Esqueceu a senha?
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