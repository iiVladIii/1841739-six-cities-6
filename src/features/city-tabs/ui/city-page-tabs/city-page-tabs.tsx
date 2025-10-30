import { memo, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getRouteMainPage } from '@/shared/consts/router';
import cn from 'classnames';
import { CITY_NAME, cityActions, useCityName } from '@/entities/city';
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch';
import { useLinkWithParams } from '@/shared/hooks/use-navigate-with-params';

export const CityPageTabs = memo(() => {
    const cities = Object.values(CITY_NAME);
    const city = useCityName();
    const [searchParams] = useSearchParams();
    const { setCity, resetCity } = cityActions;
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const getRouteLink = useLinkWithParams();

    useEffect(() => {
        const defaultLink = getRouteLink(getRouteMainPage(), {
            city: CITY_NAME.Paris,
            'sort-by': 'popular-desc',
        });
        if (searchParams) {
            const cityParam = searchParams.get('city');
            if (cityParam) dispatch(setCity(cityParam));
            else navigate(defaultLink);
        } else {
            navigate(defaultLink);
        }
    }, [dispatch, getRouteLink, navigate, searchParams, setCity]);

    useEffect(() => {
        const sortByParam = searchParams.get('sort-by');
        const defaultLink = getRouteLink(getRouteMainPage(), {
            'sort-by': 'popular-desc',
        });
        if (!sortByParam) navigate(defaultLink);
    }, [getRouteLink, navigate, searchParams]);

    useEffect(
        () => () => {
            dispatch(resetCity());
        },
        [],
    );

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
                                to={getRouteLink(getRouteMainPage(), {
                                    city: _c,
                                })}
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
