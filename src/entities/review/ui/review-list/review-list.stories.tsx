import type { Meta, StoryObj } from '@storybook/react-vite';
import { ReviewList } from './review-list';
import { Review } from '../../model/types/review';

const mockReview: Review = {
    id: '1',
    user: {
        name: 'Max',
        avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/3.jpg',
        isPro: false,
    },
    rating: 4,
    comment:
        'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: '2024-10-15T12:00:00.000Z',
};

const mockReviews: Review[] = [
    mockReview,
    {
        id: '2',
        user: {
            name: 'Angelina',
            avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/5.jpg',
            isPro: false,
        },
        rating: 5,
        comment:
            'Beautiful space, fantastic location and atmosphere, really a wonderful place to stay, highly recommend!',
        date: '2024-09-20T10:30:00.000Z',
    },
    {
        id: '3',
        user: {
            name: 'Oliver',
            avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/8.jpg',
            isPro: false,
        },
        rating: 3,
        comment: 'Good location, but the apartment was smaller than expected.',
        date: '2024-08-12T14:15:00.000Z',
    },
];

const meta: Meta<typeof ReviewList> = {
    title: 'entities/Review/ReviewList',
    component: ReviewList,
    tags: ['autodocs'],
    parameters: {
        layout: 'centered',
    },
};

export default meta;
type Story = StoryObj<typeof ReviewList>;

export const Default: Story = {
    args: {
        reviews: mockReviews,
    },
};

export const SingleReview: Story = {
    args: {
        reviews: [mockReview],
    },
};

export const Empty: Story = {
    args: {
        reviews: [],
    },
};

export const HighRating: Story = {
    args: {
        reviews: [
            {
                ...mockReview,
                rating: 5,
                comment:
                    'Absolutely perfect! Everything exceeded our expectations. Highly recommended!',
            },
            {
                id: '4',
                user: {
                    name: 'Sophie',
                    avatarUrl:
                        'https://14.design.htmlacademy.pro/static/avatar/4.jpg',
                    isPro: false,
                },
                rating: 5,
                comment:
                    'Amazing stay! The host was wonderful and the location was perfect.',
                date: '2024-10-01T09:00:00.000Z',
            },
        ],
    },
};

export const LowRating: Story = {
    args: {
        reviews: [
            {
                ...mockReview,
                rating: 2,
                comment:
                    'The apartment was not as clean as expected and the neighborhood was quite noisy.',
            },
            {
                id: '5',
                user: {
                    name: 'John',
                    avatarUrl:
                        'https://14.design.htmlacademy.pro/static/avatar/6.jpg',
                    isPro: false,
                },
                rating: 1,
                comment: 'Very disappointed. Would not recommend.',
                date: '2024-09-15T16:45:00.000Z',
            },
        ],
    },
};

export const MixedRatings: Story = {
    args: {
        reviews: [
            {
                id: '6',
                user: {
                    name: 'Emma',
                    avatarUrl:
                        'https://14.design.htmlacademy.pro/static/avatar/1.jpg',
                    isPro: false,
                },
                rating: 5,
                comment: 'Perfect place! Will definitely come back.',
                date: '2024-11-01T11:20:00.000Z',
            },
            {
                id: '7',
                user: {
                    name: 'Lucas',
                    avatarUrl:
                        'https://14.design.htmlacademy.pro/static/avatar/2.jpg',
                    isPro: false,
                },
                rating: 3,
                comment: 'Decent apartment, but there were some minor issues.',
                date: '2024-10-28T13:30:00.000Z',
            },
            {
                id: '8',
                user: {
                    name: 'Isabella',
                    avatarUrl:
                        'https://14.design.htmlacademy.pro/static/avatar/7.jpg',
                    isPro: false,
                },
                rating: 1,
                comment:
                    'Not what was advertised. Very disappointing experience.',
                date: '2024-10-20T15:00:00.000Z',
            },
            {
                id: '9',
                user: {
                    name: 'Noah',
                    avatarUrl:
                        'https://14.design.htmlacademy.pro/static/avatar/9.jpg',
                    isPro: false,
                },
                rating: 4,
                comment:
                    'Great location and comfortable stay. Only minor improvements needed.',
                date: '2024-10-10T08:45:00.000Z',
            },
        ],
    },
};

export const LongComment: Story = {
    args: {
        reviews: [
            {
                ...mockReview,
                comment:
                    'This was an absolutely amazing experience! The apartment was even better than the photos showed. The location is perfect - right in the heart of the city but still quiet and peaceful. The host was incredibly responsive and helpful, providing great recommendations for local restaurants and attractions. The apartment itself was spotlessly clean, beautifully decorated, and had all the amenities we needed. We especially loved the balcony with the wonderful view. The bed was very comfortable and the bathroom was modern and well-equipped. We would definitely stay here again and highly recommend it to anyone visiting the city!',
            },
        ],
    },
};

export const ManyReviews: Story = {
    args: {
        reviews: Array.from({ length: 10 }, (_, i) => ({
            id: `review-${i}`,
            user: {
                isPro: false,
                name: `User ${i + 1}`,
                avatarUrl: `https://14.design.htmlacademy.pro/static/avatar/${(i % 10) + 1}.jpg`,
            },
            rating: (i % 5) + 1,
            comment: `This is review number ${i + 1}. ${i % 2 === 0 ? 'Great place!' : 'Could be better.'}`,
            date: new Date(2024, 9, i + 1).toISOString(),
        })),
    },
};

export const RecentReviews: Story = {
    args: {
        reviews: [
            {
                id: '10',
                user: {
                    name: 'Sarah',
                    avatarUrl:
                        'https://14.design.htmlacademy.pro/static/avatar/4.jpg',
                    isPro: false,
                },
                rating: 5,
                comment:
                    'Just checked out today. Perfect stay from start to finish!',
                date: new Date().toISOString(),
            },
            {
                id: '11',
                user: {
                    name: 'Michael',
                    avatarUrl:
                        'https://14.design.htmlacademy.pro/static/avatar/10.jpg',
                    isPro: false,
                },
                rating: 4,
                comment: 'Stayed here last week. Very good experience overall.',
                date: new Date(
                    Date.now() - 7 * 24 * 60 * 60 * 1000,
                ).toISOString(),
            },
        ],
    },
};
