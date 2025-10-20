function escapeSelector(selector: string): string {
    const idMatch = selector.match(/^#(.+)$/);
    const classMatch = selector.match(/^\.(.+)$/);

    if (idMatch) {
        const id = idMatch[1];
        if (/^[0-9]/.test(id)) {
            return `#${CSS.escape(id)}`;
        }
    }

    if (classMatch) {
        const className = classMatch[1];
        if (/^[0-9]/.test(className)) {
            return `.${CSS.escape(className)}`;
        }
    }

    return selector;
}

export function scrollIntoView(selector: string) {
    const escapedSelector = escapeSelector(selector);
    const element = document.querySelector(escapedSelector) as HTMLElement;

    if (!element) return;

    element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
    });

    setTimeout(() => {
        element.style.animation = 'pulse 1s ease-in-out 3';
        setTimeout(() => {
            element.style.animation = '';
        }, 3000);
    }, 1000);
}
