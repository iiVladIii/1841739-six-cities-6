import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from './login-form';

vi.mock('@/shared/hooks/use-app-dispatch', () => ({
    useAppDispatch: () => vi.fn(),
}));

vi.mock('@/entities/user', () => ({
    login: vi.fn(),
    useAuthError: vi.fn(() => null),
}));

describe('LoginForm', () => {
    it('should render form fields', () => {
        render(<LoginForm />);
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: 'Sign in' }),
        ).toBeInTheDocument();
    });

    it('should update email field', () => {
        render(<LoginForm />);
        const emailInput = screen.getByPlaceholderText('Email');
        fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
        expect(emailInput).toHaveValue('test@test.com');
    });

    it('should update password field', () => {
        render(<LoginForm />);
        const passwordInput = screen.getByPlaceholderText('Password');
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        expect(passwordInput).toHaveValue('password123');
    });

    it('should disable button when loading', async () => {
        render(<LoginForm />);
        const button = screen.getByRole('button', { name: 'Sign in' });
        const form = button.closest('form')!;

        fireEvent.submit(form);
        await waitFor(() => {
            expect(button).toBeDisabled();
        });
    });
});
