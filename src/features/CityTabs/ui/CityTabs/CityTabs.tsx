import { memo, useEffect, useMemo } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getRouteMainPage } from '@/shared/consts/router';
import cn from 'classnames';

export const CityTabs = memo(() => {
    const cities: string[] = [
        'Paris',
        'Cologne',
        'Brussels',
        'Amsterdam',
        'Hamburg',
        'Dusseldorf',
    ];
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const activeTab = useMemo(() => searchParams.get('city'), [searchParams]);

    useEffect(() => {
        if (!activeTab) {
            navigate(`${getRouteMainPage()}?city=${cities[3]}`);
        }
    }, [activeTab, cities, navigate]);

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
                                    { 'tabs__item--active': activeTab },
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
