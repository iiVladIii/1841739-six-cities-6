import { memo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getRouteMainPage } from '@/shared/consts/router';
import cn from 'classnames';
import { CITY_NAME, cityActions, useCityName } from '@/entities/City';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';

export const CityPageTabs = memo(() => {
    const cities = Object.values(CITY_NAME);
    const city = useCityName();
    const [searchParams, setSearchParams] = useSearchParams();
    const { setCity, resetCity } = cityActions;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (searchParams) {
            const cityParam = searchParams.get('city');
            if (cityParam) dispatch(setCity(cityParam));
        }
    }, [dispatch, searchParams, setCity]);

    useEffect(
        () => () => {
            dispatch(resetCity());
        },
        [],
    );

    useEffect(() => {
        if (city && !searchParams.get('city')) {
            setSearchParams((prev) => {
                const newParams = new URLSearchParams(prev);
                newParams.set('city', city);
                return newParams;
            });
        }
    }, [city, searchParams, setSearchParams]);

    return (
        <div className="tabs">
            <section className="locations container">
                <ul className="locations__list tabs__list">
                    {cities.map((_c) => (
                        <li className="locations__item" key={_c}>
                            <Link
                                className={cn(
                                    'locations__item-link',
                                    'tabs__item',
                                    { 'tabs__item--active': city === _c },
                                )}
                                to={`${getRouteMainPage()}?city=${_c}`}
                            >
                                <span>{_c}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
});
