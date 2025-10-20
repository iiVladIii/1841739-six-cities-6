import { memo, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getRouteMainPage } from '@/shared/consts/router';
import cn from 'classnames';
import { CITY_NAME, cityActions, useCityName } from '@/entities/City';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';

export const CityPageTabs = memo(() => {
    const cities = Object.values(CITY_NAME);
    const navigate = useNavigate();
    const city = useCityName();
    const [searchParams] = useSearchParams();
    const { setCity } = cityActions;
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (searchParams) {
            const cityParam = searchParams.get('city');
            if (cityParam) dispatch(setCity(cityParam));
        }
    }, [searchParams, setCity]);

    useEffect(() => {
        if (!city) navigate(`${getRouteMainPage()}?city=${CITY_NAME.Paris}`);
    }, [city, navigate]);

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
