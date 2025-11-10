import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { OfferReviewForm } from './offer-review-form';

const { mockUseUserAuthData } = vi.hoisted(() => ({
    mockUseUserAuthData: vi.fn(),
}));

vi.mock('@/entities/user', () => ({
    useUserAuthData: mockUseUserAuthData,
}));

interface StarRatingProps {
    onChange: (value: number) => void;
}

vi.mock('@/shared/ui', () => ({
    StarRating: ({ onChange }: StarRatingProps) => (
        <div data-testid="star-rating" onClick={() => onChange(5)} />
    ),
}));

vi.mock('@/entities/review', () => ({
    createOfferReview: vi.fn(() => Promise.resolve({ id: '1' })),
}));

vi.mock('@/shared/types/api', () => ({
    apiErrorHandler: vi.fn(),
}));

describe('OfferReviewForm', () => {
    beforeEach(() => {
        mockUseUserAuthData.mockReturnValue({
            id: '1',
            email: 'test@test.com',
        });
    });

    it('should render when user is authenticated and id provided', () => {
        render(<OfferReviewForm id="123" />);
        expect(screen.getByText('Your review')).toBeInTheDocument();
    });

    it('should not render without auth data', () => {
        mockUseUserAuthData.mockReturnValue(null);
        const { container } = render(<OfferReviewForm id="123" />);
        expect(container.firstChild).toBeNull();
    });

    it('should update comment on textarea change', () => {
        render(<OfferReviewForm id="123" />);
        const textarea = screen.getByPlaceholderText(/Tell how was your stay/i);
        fireEvent.change(textarea, { target: { value: 'Great place!' } });
        expect(textarea).toHaveValue('Great place!');
    });

    it('should disable submit when review is invalid', () => {
        render(<OfferReviewForm id="123" />);
        const submitButton = screen.getByText('Submit');
        expect(submitButton).toBeDisabled();
    });

    it('should enable submit when review is valid', () => {
        render(<OfferReviewForm id="123" />);
        const textarea = screen.getByPlaceholderText(/Tell how was your stay/i);
        const rating = screen.getByTestId('star-rating');

        fireEvent.click(rating);
        fireEvent.change(textarea, {
            target: { value: 'A'.repeat(51) },
        });

        const submitButton = screen.getByText('Submit');
        expect(submitButton).not.toBeDisabled();
    });
});
