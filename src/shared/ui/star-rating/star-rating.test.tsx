import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { StarRating } from './star-rating';

describe('StarRating', () => {
    it('should render 5 star inputs', () => {
        const { container } = render(<StarRating />);
        const inputs = container.querySelectorAll('input[type="radio"]');
        expect(inputs).toHaveLength(5);
    });

    it('should render stars with correct values', () => {
        const { container } = render(<StarRating />);
        const inputs = container.querySelectorAll('input[type="radio"]');
        const values = Array.from(inputs).map(
            (input) => (input as HTMLInputElement).value,
        );
        expect(values).toEqual(['5', '4', '3', '2', '1']);
    });

    it('should call onChange with correct value when star is clicked', () => {
        const onChange = vi.fn();
        const { container } = render(<StarRating onChange={onChange} />);

        const input = container.querySelector(
            'input[value="4"]',
        ) as HTMLInputElement;
        input.click();

        expect(onChange).toHaveBeenCalledWith(4);
    });

    it('should not call onChange when it is not provided', () => {
        const { container } = render(<StarRating />);
        const input = container.querySelector(
            'input[value="3"]',
        ) as HTMLInputElement;

        expect(() => input.click()).not.toThrow();
    });

    it('should apply custom className', () => {
        const { container } = render(<StarRating className="custom-class" />);
        const wrapper = container.firstChild;

        expect(wrapper).toHaveClass('form__rating', 'custom-class');
    });

    it('should render labels with correct titles', () => {
        const { container } = render(<StarRating />);
        const labels = container.querySelectorAll('label');
        const titles = Array.from(labels).map((label) => label.title);

        expect(titles).toEqual([
            'perfect',
            'good',
            'not bad',
            'badly',
            'terribly',
        ]);
    });

    it('should have correct name attribute for all inputs', () => {
        const { container } = render(<StarRating />);
        const inputs = container.querySelectorAll('input[type="radio"]');

        inputs.forEach((input) => {
            expect((input as HTMLInputElement).name).toBe('rating');
        });
    });

    it('should call onChange when label is clicked', () => {
        const onChange = vi.fn();
        const { container } = render(<StarRating onChange={onChange} />);

        const label = container.querySelector(
            'label[for="3-stars"]',
        ) as HTMLLabelElement;
        fireEvent.click(label);

        expect(onChange).toHaveBeenCalledWith(3);
    });

    it('should call onChange with value 5 for perfect rating', () => {
        const onChange = vi.fn();
        const { container } = render(<StarRating onChange={onChange} />);

        const input = container.querySelector(
            'input[value="5"]',
        ) as HTMLInputElement;
        input.click();

        expect(onChange).toHaveBeenCalledWith(5);
    });

    it('should call onChange with value 1 for terribly rating', () => {
        const onChange = vi.fn();
        const { container } = render(<StarRating onChange={onChange} />);

        const input = container.querySelector(
            'input[value="1"]',
        ) as HTMLInputElement;
        input.click();

        expect(onChange).toHaveBeenCalledWith(1);
    });
});
