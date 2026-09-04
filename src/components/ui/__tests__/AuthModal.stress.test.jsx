import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import AuthModal from '../AuthModal';
import api from '../../../utils/apiClient';

vi.mock('../../../utils/apiClient', () => ({
  default: {
    post: vi.fn()
  }
}));

describe('AuthModal Registration Stress Tests', () => {
  const onClose = vi.fn();
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const switchToRegister = () => {
    fireEvent.click(screen.getByRole('button', { name: 'Зарегистрироваться' }));
  };

  it('Test 1: XSS injection in name field — tags are stripped', async () => {
    render(<AuthModal isOpen={true} onClose={onClose} onLoginSuccess={vi.fn()} />);
    switchToRegister();
    
    api.post.mockResolvedValueOnce({});
    
    fireEvent.change(screen.getByPlaceholderText('Ваше имя'), { target: { value: "<script>alert('xss')</script>" } });
    fireEvent.change(screen.getByPlaceholderText('ваша@почта.ru'), { target: { value: 'xss@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('checkbox'));
    
    fireEvent.click(screen.getByRole('button', { name: /Создать аккаунт/i }));
    
    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/auth/register', {
        email: 'xss@test.com',
        password: 'password123',
        name: "alert('xss')"
      });
    });
  });

  it('Test 2: SQL injection in email field — blocked by format validation', async () => {
    render(<AuthModal isOpen={true} onClose={onClose} onLoginSuccess={vi.fn()} />);
    switchToRegister();
    
    const sqlString = "'; DROP TABLE users; --@evil.com";
    
    fireEvent.change(screen.getByPlaceholderText('Ваше имя'), { target: { value: 'Тест' } });
    fireEvent.change(screen.getByPlaceholderText('ваша@почта.ru'), { target: { value: sqlString } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('checkbox'));
    
    const form = screen.getByRole('button', { name: /Создать аккаунт/i }).closest('form');
    fireEvent.submit(form);
    
    expect(await screen.findByText('Введите корректный email')).toBeInTheDocument();
    expect(api.post).not.toHaveBeenCalled();
  });

  it('Test 3: Unicode bomb in name field', async () => {
    render(<AuthModal isOpen={true} onClose={onClose} onLoginSuccess={vi.fn()} />);
    switchToRegister();
    
    api.post.mockResolvedValueOnce({});
    
    const unicodeString = 'test Привет 你好 🎓';
    
    fireEvent.change(screen.getByPlaceholderText('Ваше имя'), { target: { value: unicodeString } });
    fireEvent.change(screen.getByPlaceholderText('ваша@почта.ru'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('checkbox'));
    
    fireEvent.click(screen.getByRole('button', { name: /Создать аккаунт/i }));
    
    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/auth/register', {
        email: 'test@test.com',
        password: 'password123',
        name: unicodeString
      });
    });
  });

  it('Test 4: Whitespace-only name should be rejected', async () => {
    render(<AuthModal isOpen={true} onClose={onClose} onLoginSuccess={vi.fn()} />);
    switchToRegister();
    
    fireEvent.change(screen.getByPlaceholderText('Ваше имя'), { target: { value: '   ' } });
    fireEvent.change(screen.getByPlaceholderText('ваша@почта.ru'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('checkbox'));
    
    fireEvent.click(screen.getByRole('button', { name: /Создать аккаунт/i }));
    
    expect(await screen.findByText('Укажите, как к вам обращаться')).toBeInTheDocument();
    expect(api.post).not.toHaveBeenCalled();
  });

  it('Test 5: Password of exactly MIN_PASSWORD_LENGTH (boundary)', async () => {
    render(<AuthModal isOpen={true} onClose={onClose} onLoginSuccess={vi.fn()} />);
    switchToRegister();
    
    api.post.mockResolvedValueOnce({});
    
    fireEvent.change(screen.getByPlaceholderText('Ваше имя'), { target: { value: 'Тест' } });
    fireEvent.change(screen.getByPlaceholderText('ваша@почта.ru'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('checkbox'));
    
    fireEvent.click(screen.getByRole('button', { name: /Создать аккаунт/i }));
    
    await waitFor(() => {
      expect(api.post).toHaveBeenCalled();
    });
  });

  it('Test 6: Password of MIN_PASSWORD_LENGTH - 1 (boundary fail)', async () => {
    render(<AuthModal isOpen={true} onClose={onClose} onLoginSuccess={vi.fn()} />);
    switchToRegister();
    
    fireEvent.change(screen.getByPlaceholderText('Ваше имя'), { target: { value: 'Тест' } });
    fireEvent.change(screen.getByPlaceholderText('ваша@почта.ru'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: '12345' } });
    fireEvent.click(screen.getByRole('checkbox'));
    
    fireEvent.click(screen.getByRole('button', { name: /Создать аккаунт/i }));
    
    await waitFor(() => {
        expect(api.post).not.toHaveBeenCalled();
    });
  });

  it('Test 7: Form state is NOT cleared when switching between login/register modes', async () => {
    render(<AuthModal isOpen={true} onClose={onClose} onLoginSuccess={vi.fn()} />);
    
    fireEvent.change(screen.getByPlaceholderText('ваша@почта.ru'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'pass' } });
    
    switchToRegister();
    
    expect(screen.getByPlaceholderText('ваша@почта.ru')).toHaveValue('test@test.com');
    expect(screen.getByPlaceholderText('••••••••')).toHaveValue('pass');
  });

  it('Test 8: Server returns unknown error — generic message shown', async () => {
    render(<AuthModal isOpen={true} onClose={onClose} onLoginSuccess={vi.fn()} />);
    switchToRegister();
    
    api.post.mockRejectedValueOnce(new Error('Something completely unexpected happened'));
    
    fireEvent.change(screen.getByPlaceholderText('Ваше имя'), { target: { value: 'Тест' } });
    fireEvent.change(screen.getByPlaceholderText('ваша@почта.ru'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByPlaceholderText('••••••••'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('checkbox'));
    
    fireEvent.click(screen.getByRole('button', { name: /Создать аккаунт/i }));
    
    expect(await screen.findByText('Произошла ошибка. Попробуйте позже.')).toBeInTheDocument();
  });
});
