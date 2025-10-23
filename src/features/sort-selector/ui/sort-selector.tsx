import { memo, useCallback, useMemo, useRef, useState } from 'react';
import cn from 'classnames';
import { useOutsideClick } from '@/shared/hooks/useOutsideClick';
import { useSearchParams } from 'react-router-dom';
import { OFFER_SORT_OPTIONS } from '@/entities/Offer';

export const SortSelector = memo(() => {
    const [isOpen, setIsOpen] = useState(false);
    const listRef = useRef<HTMLUListElement | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const selectedOption = useMemo(() => {
        const option = OFFER_SORT_OPTIONS.find(
            (o) => searchParams.get('sort-by') === o.value,
        );
        return option || OFFER_SORT_OPTIONS[0];
    }, [searchParams]);

    useOutsideClick(listRef, () => {
        if (isOpen) setIsOpen(false);
    });

    const selectHandler = useCallback(
        (value: string) => {
            setIsOpen(false);
            setSearchParams((prev) => {
                const newParams = new URLSearchParams(prev);
                newParams.set('sort-by', value);
                return newParams;
            });
        },
        [setSearchParams],
    );

    return (
        <form className="places__sorting" action="#" method="get">
            <span className="places__sorting-caption">Sort by</span>
            <span
                className="places__sorting-type"
                tabIndex={0}
                onClick={() => setIsOpen((p) => !p)}
            >
                {selectedOption.label}
                <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                </svg>
            </span>
            <ul
                className={cn('places__options', 'places__options--custom', {
                    'places__options--opened': isOpen,
                })}
                ref={listRef}
            >
                {OFFER_SORT_OPTIONS.map((o) => (
                    <li
                        onClick={() => selectHandler(o.value)}
                        key={o.value}
                        className={cn('places__option', {
                            'places__option--active':
                                selectedOption.value === o.value,
                        })}
                        tabIndex={0}
                    >
                        {o.label}
                    </li>
                ))}
            </ul>
        </form>
    );
});
