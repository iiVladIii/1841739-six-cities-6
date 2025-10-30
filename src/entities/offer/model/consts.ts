export type OFFER_SORT_TYPE =
    | 'popular-desc'
    | 'price-asc'
    | 'price-desc'
    | 'top-desc';

export const OFFER_SORT_OPTIONS: Array<{
    label: string;
    value: OFFER_SORT_TYPE;
}> = [
    { label: 'Popular', value: 'popular-desc' },
    { label: 'Price: low to high', value: 'price-asc' },
    { label: 'Price: high to low', value: 'price-desc' },
    { label: 'Top rated first', value: 'top-desc' },
];
