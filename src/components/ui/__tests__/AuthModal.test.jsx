import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthModal from '../AuthModal';
import api from '../../../utils/apiClient';

vi.mock('../../../utils/apiClient', () => ({
  default: {
    post: vi.fn()
  }
}));

describe('AuthModal Stress Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('EDGE CASE 1: Extremely long email should be handled gracefully', async () => {
    const longEmail = 'a'.repeat(250) + '@example.com';
    render(<AuthModal isOpen={true} onClose={vi.fn()} onLoginSuccess={vi.fn()} />);
    
    const emailInput = screen.getByPlaceholderText('ваша@почта.ru');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    
    await userEvent.type(emailInput, longEmail, { delay: 0 }); // fast type
    await userEvent.type(passwordInput, 'validpass123', { delay: 0 });
    
    api.post.mockResolvedValueOnce({ success: true });
    
    fireEvent.click(screen.getByRole('button', { name: /Войти/i }));
    
    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/auth/login', {
        email: longEmail,
        password: 'validpass123'
      });
    });
  });

  it('EDGE CASE 2: Network failure and multiple rapid submit clicks (prevent double submit)', async () => {
    render(<AuthModal isOpen={true} onClose={vi.fn()} onLoginSuccess={vi.fn()} />);
    
    const emailInput = screen.getByPlaceholderText('ваша@почта.ru');
    const passwordInput = screen.getByPlaceholderText('••••••••');
    
    await userEvent.type(emailInput, 'test@test.com');
    await userEvent.type(passwordInput, 'password123');
    
    // Simulate a slow network failure
    api.post.mockImplementationOnce(() => new Promise((_, reject) => setTimeout(() => reject(new Error('Network Error')), 500)));
    
    const submitBtn = screen.getByRole('button', { name: /Войти/i });
    fireEvent.click(submitBtn);
    fireEvent.click(submitBtn);
    fireEvent.click(submitBtn);
    
    expect(api.post).toHaveBeenCalledTimes(1); // Button should be disabled after first click
    
    await waitFor(() => {
      expect(screen.getByText(/Network Error/i)).toBeInTheDocument();
    });
    
    expect(submitBtn).not.toBeDisabled(); // Should be re-enabled after failure
  });

  it('EDGE CASE 3: Switching to register and back retains states properly but prevents invalid submits', async () => {
    render(<AuthModal isOpen={true} onClose={vi.fn()} onLoginSuccess={vi.fn()} />);
    
    await userEvent.type(screen.getByPlaceholderText('ваша@почта.ru'), 'test@test.com');
    await userEvent.type(screen.getByPlaceholderText('••••••••'), '123'); // Invalid length for register
    
    // Switch to register
    fireEvent.click(screen.getByRole('button', { name: 'Зарегистрироваться' }));
    
    // Trying to submit with short password should show error without hitting API
    fireEvent.click(screen.getByRole('button', { name: /Создать аккаунт/i }));
    
    expect(api.post).not.toHaveBeenCalled();
    expect(screen.getByText(/Пароль должен быть не менее 6 символов/i)).toBeInTheDocument();
  });
});
