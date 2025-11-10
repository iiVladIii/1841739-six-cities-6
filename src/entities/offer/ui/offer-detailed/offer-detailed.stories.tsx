import type { Meta, StoryObj } from '@storybook/react-vite';
import { OfferDetailed } from './offer-detailed';
import { DetailedOffer } from '../../model/types/offer';
import { CITY_NAME } from '@/entities/city';
import { StoreDecorator } from '@/shared/config/storybook/store-decorator';

const mockDetailedOffer: DetailedOffer = {
    id: '1',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'apartment',
    price: 120,
    previewImage: 'https://14.design.htmlacademy.pro/static/hotel/11.jpg',
    city: {
        name: CITY_NAME.Amsterdam,
        location: {
            latitude: 52.3909553943508,
            longitude: 4.85309666406198,
            zoom: 10,
        },
    },
    location: {
        latitude: 52.3909553943508,
        longitude: 4.85309666406198,
        zoom: 12,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.5,
    images: [
        'https://14.design.htmlacademy.pro/static/hotel/11.jpg',
        'https://14.design.htmlacademy.pro/static/hotel/12.jpg',
        'https://14.design.htmlacademy.pro/static/hotel/13.jpg',
        'https://14.design.htmlacademy.pro/static/hotel/14.jpg',
        'https://14.design.htmlacademy.pro/static/hotel/15.jpg',
        'https://14.design.htmlacademy.pro/static/hotel/16.jpg',
    ],
    bedrooms: 3,
    maxAdults: 4,
    goods: [
        'Wi-Fi',
        'Washing machine',
        'Towels',
        'Heating',
        'Coffee machine',
        'Baby seat',
        'Kitchen',
        'Dishwasher',
        'Cabel TV',
        'Fridge',
    ],
    host: {
        name: 'Angelina',
        avatarUrl:
            'https://14.design.htmlacademy.pro/static/host/avatar-angelina.jpg',
        isPro: true,
    },
    description:
        'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
};

const MockReviews = () => (
    <section className="offer__reviews reviews">
        <h2 className="reviews__title">
            Reviews · <span className="reviews__amount">1</span>
        </h2>
        <ul className="reviews__list">
            <li className="reviews__item">
                <div className="reviews__user user">
                    <div className="reviews__avatar-wrapper user__avatar-wrapper">
                        <img
                            className="reviews__avatar user__avatar"
                            src="https://14.design.htmlacademy.pro/static/avatar/1.jpg"
                            width="54"
                            height="54"
                            alt="Reviews avatar"
                        />
                    </div>
                    <span className="reviews__user-name">Max</span>
                </div>
                <div className="reviews__info">
                    <div className="reviews__rating rating">
                        <div className="reviews__stars rating__stars">
                            <span style={{ width: '80%' }}></span>
                            <span className="visually-hidden">Rating</span>
                        </div>
                    </div>
                    <p className="reviews__text">
                        A quiet cozy and picturesque that hides behind a a river
                        by the unique lightness of Amsterdam.
                    </p>
                    <time className="reviews__time" dateTime="2019-04-24">
                        April 2019
                    </time>
                </div>
            </li>
        </ul>
    </section>
);

const meta: Meta<typeof OfferDetailed> = {
    title: 'entities/Offer/OfferDetailed',
    component: OfferDetailed,
    tags: ['autodocs'],
    decorators: [StoreDecorator({})],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;
type Story = StoryObj<typeof OfferDetailed>;

export const Default: Story = {
    args: {
        offer: mockDetailedOffer,
    },
};

export const WithReviews: Story = {
    args: {
        offer: mockDetailedOffer,
        reviews: <MockReviews />,
    },
};

export const Premium: Story = {
    args: {
        offer: {
            ...mockDetailedOffer,
            isPremium: true,
        },
    },
};

export const Favorite: Story = {
    args: {
        offer: {
            ...mockDetailedOffer,
            isFavorite: true,
        },
    },
};

export const PremiumAndFavorite: Story = {
    args: {
        offer: {
            ...mockDetailedOffer,
            isPremium: true,
            isFavorite: true,
        },
        reviews: <MockReviews />,
    },
};

export const ProHost: Story = {
    args: {
        offer: {
            ...mockDetailedOffer,
            host: {
                ...mockDetailedOffer.host,
                isPro: true,
            },
        },
    },
};

export const RegularHost: Story = {
    args: {
        offer: {
            ...mockDetailedOffer,
            host: {
                name: 'John',
                avatarUrl:
                    'https://14.design.htmlacademy.pro/static/avatar/2.jpg',
                isPro: false,
            },
        },
    },
};

export const HighRating: Story = {
    args: {
        offer: {
            ...mockDetailedOffer,
            rating: 5,
        },
    },
};

export const LowRating: Story = {
    args: {
        offer: {
            ...mockDetailedOffer,
            rating: 2.3,
        },
    },
};

export const HouseType: Story = {
    args: {
        offer: {
            ...mockDetailedOffer,
            type: 'house',
            title: 'Charming family house with garden',
            bedrooms: 5,
            maxAdults: 8,
        },
    },
};

export const RoomType: Story = {
    args: {
        offer: {
            ...mockDetailedOffer,
            type: 'room',
            title: 'Cozy room in the city center',
            bedrooms: 1,
            maxAdults: 2,
            goods: ['Wi-Fi', 'Heating', 'Kitchen', 'Cable TV'],
        },
    },
};

export const HotelType: Story = {
    args: {
        offer: {
            ...mockDetailedOffer,
            type: 'hotel',
            title: 'Boutique hotel room',
            isPremium: true,
            bedrooms: 1,
            maxAdults: 2,
        },
    },
};

export const ManyImages: Story = {
    args: {
        offer: {
            ...mockDetailedOffer,
            images: [
                'https://14.design.htmlacademy.pro/static/hotel/1.jpg',
                'https://14.design.htmlacademy.pro/static/hotel/2.jpg',
                'https://14.design.htmlacademy.pro/static/hotel/3.jpg',
                'https://14.design.htmlacademy.pro/static/hotel/4.jpg',
                'https://14.design.htmlacademy.pro/static/hotel/5.jpg',
                'https://14.design.htmlacademy.pro/static/hotel/6.jpg',
                'https://14.design.htmlacademy.pro/static/hotel/7.jpg',
                'https://14.design.htmlacademy.pro/static/hotel/8.jpg',
                'https://14.design.htmlacademy.pro/static/hotel/9.jpg',
                'https://14.design.htmlacademy.pro/static/hotel/10.jpg',
            ],
        },
    },
};

export const FewImages: Story = {
    args: {
        offer: {
            ...mockDetailedOffer,
            images: [
                'https://14.design.htmlacademy.pro/static/hotel/11.jpg',
                'https://14.design.htmlacademy.pro/static/hotel/12.jpg',
            ],
        },
    },
};

export const ManyGoods: Story = {
    args: {
        offer: {
            ...mockDetailedOffer,
            goods: [
                'Wi-Fi',
                'Washing machine',
                'Towels',
                'Heating',
                'Coffee machine',
                'Baby seat',
                'Kitchen',
                'Dishwasher',
                'Cable TV',
                'Fridge',
                'Air conditioning',
                'Breakfast',
                'Laptop friendly workspace',
                'Private entrance',
                'Iron',
                'Hair dryer',
                'TV',
                'Fireplace',
            ],
            isPremium: true,
        },
    },
};

export const FewGoods: Story = {
    args: {
        offer: {
            ...mockDetailedOffer,
            goods: ['Wi-Fi', 'Heating', 'Kitchen'],
        },
    },
};

export const LargeBedrooms: Story = {
    args: {
        offer: {
            ...mockDetailedOffer,
            bedrooms: 8,
            maxAdults: 12,
            type: 'house',
            title: 'Spacious villa for large groups',
            isPremium: true,
        },
    },
};

export const Studio: Story = {
    args: {
        offer: {
            ...mockDetailedOffer,
            bedrooms: 1,
            maxAdults: 2,
            title: 'Modern studio apartment',
        },
    },
};

export const LongDescription: Story = {
    args: {
        offer: {
            ...mockDetailedOffer,
            description:
                "A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century. An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful. Perfect for families with children or groups of friends looking for a comfortable stay in the heart of Amsterdam. The apartment features a spacious living room with modern furniture, a fully equipped kitchen with all the necessary appliances, and comfortable bedrooms with quality mattresses for a good night's sleep.",
        },
    },
};

export const LongTitle: Story = {
    args: {
        offer: {
            ...mockDetailedOffer,
            title: 'Super beautiful and extremely luxurious apartment at absolutely great and amazing location in the heart of the wonderful city',
        },
    },
};

export const ExpensiveLuxury: Story = {
    args: {
        offer: {
            ...mockDetailedOffer,
            price: 500,
            isPremium: true,
            title: 'Luxury penthouse with stunning views',
            bedrooms: 4,
            maxAdults: 8,
            rating: 5,
            host: {
                ...mockDetailedOffer.host,
                isPro: true,
            },
        },
        reviews: <MockReviews />,
    },
};

export const BudgetOption: Story = {
    args: {
        offer: {
            ...mockDetailedOffer,
            price: 35,
            title: 'Budget-friendly room near city center',
            type: 'room',
            bedrooms: 1,
            maxAdults: 1,
            goods: ['Wi-Fi', 'Heating'],
            isPremium: false,
            rating: 3.8,
        },
    },
};
