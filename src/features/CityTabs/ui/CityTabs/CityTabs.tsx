import { memo } from 'react';
import { Link } from 'react-router-dom';
import { getRouteMainPage } from '@/shared/consts/router';
import cn from 'classnames';
import { Cities } from '@/entities/City';

interface Props {
    city: string | null;
}
export const CityTabs = memo((props: Props) => {
    const { city } = props;
    const cities = Object.values(Cities);

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
