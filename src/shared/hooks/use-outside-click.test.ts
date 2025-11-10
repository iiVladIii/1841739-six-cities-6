import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useOutsideClick } from './use-outside-click';
import { createRef } from 'react';

describe('useOutsideClick', () => {
    let container: HTMLDivElement;

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        document.body.removeChild(container);
    });

    it('should call callback when clicking outside the element', () => {
        const ref = createRef<HTMLDivElement>();
        const callback = vi.fn();
        const element = document.createElement('div');
        container.appendChild(element);

        (ref as any).current = element;

        renderHook(() => useOutsideClick(ref, callback));

        const outsideElement = document.createElement('div');
        document.body.appendChild(outsideElement);
        outsideElement.dispatchEvent(
            new MouseEvent('mousedown', { bubbles: true }),
        );

        expect(callback).toHaveBeenCalledTimes(1);
        document.body.removeChild(outsideElement);
    });

    it('should not call callback when clicking inside the element', () => {
        const ref = createRef<HTMLDivElement>();
        const callback = vi.fn();
        const element = document.createElement('div');
        container.appendChild(element);

        (ref as any).current = element;

        renderHook(() => useOutsideClick(ref, callback));

        element.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

        expect(callback).not.toHaveBeenCalled();
    });

    it('should not call callback when ref.current is null', () => {
        const ref = createRef<HTMLDivElement>();
        const callback = vi.fn();

        renderHook(() => useOutsideClick(ref, callback));

        document.body.dispatchEvent(
            new MouseEvent('mousedown', { bubbles: true }),
        );

        expect(callback).not.toHaveBeenCalled();
    });

    it('should remove event listener on unmount', () => {
        const ref = createRef<HTMLDivElement>();
        const callback = vi.fn();
        const element = document.createElement('div');
        container.appendChild(element);

        (ref as any).current = element;

        const removeEventListenerSpy = vi.spyOn(
            document,
            'removeEventListener',
        );

        const { unmount } = renderHook(() => useOutsideClick(ref, callback));

        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalledWith(
            'mousedown',
            expect.any(Function),
        );
    });

    it('should update callback when it changes', () => {
        const ref = createRef<HTMLDivElement>();
        const callback1 = vi.fn();
        const callback2 = vi.fn();
        const element = document.createElement('div');
        container.appendChild(element);

        (ref as any).current = element;

        const { rerender } = renderHook(({ cb }) => useOutsideClick(ref, cb), {
            initialProps: { cb: callback1 },
        });

        rerender({ cb: callback2 });

        document.body.dispatchEvent(
            new MouseEvent('mousedown', { bubbles: true }),
        );

        expect(callback1).not.toHaveBeenCalled();
        expect(callback2).toHaveBeenCalledTimes(1);
    });

    it('should handle click on child element', () => {
        const ref = createRef<HTMLDivElement>();
        const callback = vi.fn();
        const element = document.createElement('div');
        const childElement = document.createElement('span');
        element.appendChild(childElement);
        container.appendChild(element);

        (ref as any).current = element;

        renderHook(() => useOutsideClick(ref, callback));

        childElement.dispatchEvent(
            new MouseEvent('mousedown', { bubbles: true }),
        );

        expect(callback).not.toHaveBeenCalled();
    });
});
