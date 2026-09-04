import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OnboardingModal from '../OnboardingModal';
import api from '../../../utils/apiClient';
import * as AuthContext from '../../../contexts/AuthContext';

vi.mock('../../../utils/apiClient', () => ({
  default: {
    patch: vi.fn()
  }
}));

describe('OnboardingModal Stress Tests', () => {
  const mockRefreshUser = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(AuthContext, 'useAuth').mockReturnValue({
      user: { name: '' },
      refreshUser: mockRefreshUser
    });
  });

  it('EDGE CASE 1: Rapid clicking "Next" should not skip validation steps', async () => {
    render(<OnboardingModal />);
    
    // Step 1: Name (empty initially)
    const nextBtn = screen.getByRole('button', { name: /Далее/i });
    expect(nextBtn).toBeDisabled();
    
    await userEvent.type(screen.getByPlaceholderText('Анна Ивановна'), 'Аб');
    expect(nextBtn).not.toBeDisabled();
    
    // Spam click next
    fireEvent.click(nextBtn);
    fireEvent.click(nextBtn);
    
    // Should be at Step 2
    expect(screen.getByText('Шаг 2 из 3')).toBeInTheDocument();
    
    // Step 2: Roles (none selected, so disabled)
    expect(screen.getByRole('button', { name: /Далее/i })).toBeDisabled();
  });

  it('EDGE CASE 2: Adding massive amount of custom subjects to test array state integrity', async () => {
    render(<OnboardingModal />);
    
    // Pass step 1
    await userEvent.type(screen.getByPlaceholderText('Анна Ивановна'), 'Анна');
    fireEvent.click(screen.getByRole('button', { name: /Далее/i }));
    
    // Pass step 2 - Select a pedagog role
    fireEvent.click(screen.getByText('Репетитор'));
    fireEvent.click(screen.getByRole('button', { name: /Далее/i }));
    
    // Step 3
    const customSubjectInput = screen.getByPlaceholderText('Свой предмет...');
    const addBtn = customSubjectInput.nextElementSibling;
    
    // Add 15 subjects
    for (let i = 0; i < 15; i++) {
      await userEvent.type(customSubjectInput, `Предмет ${i}`);
      fireEvent.click(addBtn);
    }
    
    // Wait for DOM to update
    await waitFor(() => {
      expect(screen.getAllByText(/Предмет \d+/).length).toBe(15);
    });
    
    // Submit form
    api.patch.mockResolvedValueOnce({ success: true });
    fireEvent.click(screen.getByRole('button', { name: /Начать работу/i }));
    
    await waitFor(() => {
      expect(api.patch).toHaveBeenCalled();
      const payload = api.patch.mock.calls[0][1];
      expect(payload.subjects.length).toBe(15);
    });
  });
});
