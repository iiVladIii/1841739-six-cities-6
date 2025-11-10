import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { StarRating } from './star-rating';
import '@/app/styles/main.css';

const SvgSprite = () => (
    <svg style={{ display: 'none' }}>
        <symbol id="icon-star" viewBox="0 0 37 33">
            <path d="M18.5 0L22.8 12.1L35.5 12.1L25.3 19.6L29.6 31.7L18.5 24.2L7.4 31.7L11.7 19.6L1.5 12.1L14.2 12.1L18.5 0Z" />
        </symbol>
    </svg>
);

const meta: Meta<typeof StarRating> = {
    title: 'shared/StarRating',
    component: StarRating,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div>
                <SvgSprite />
                <Story />
            </div>
        ),
    ],
    tags: ['autodocs'],
    argTypes: {
        className: {
            control: 'text',
            description: 'Дополнительный CSS класс',
        },
        onChange: {
            description: 'Callback, вызываемый при изменении рейтинга',
        },
    },
};

export default meta;
type Story = StoryObj<typeof StarRating>;

export const Default: Story = {
    args: {
        onChange: () => {},
    },
};

export const WithCustomClass: Story = {
    args: {
        className: 'custom-rating',
        onChange: () => {},
    },
};

export const Controlled: Story = {
    render: () => {
        const [rating, setRating] = useState(0);

        return (
            <div>
                <StarRating
                    onChange={(value) => {
                        setRating(value);
                    }}
                />
                <p style={{ marginTop: '20px', textAlign: 'center' }}>
                    Выбранный рейтинг: <strong>{rating || 'не выбран'}</strong>
                </p>
            </div>
        );
    },
};

export const PreselectedRating: Story = {
    render: () => {
        const [rating, setRating] = useState(4);

        return (
            <div>
                <StarRating onChange={setRating} />
                <p style={{ marginTop: '20px', textAlign: 'center' }}>
                    Текущий рейтинг: <strong>{rating}</strong> звезд
                </p>
                <button
                    onClick={() => setRating(0)}
                    style={{ marginTop: '10px', padding: '8px 16px' }}
                >
                    Сбросить рейтинг
                </button>
            </div>
        );
    },
};

export const WithoutCallback: Story = {
    args: {},
};

export const MultipleRatings: Story = {
    render: () => {
        const [ratings, setRatings] = useState<Record<string, number>>({
            quality: 0,
            service: 0,
            price: 0,
        });

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                }}
            >
                <div>
                    <h4 style={{ marginBottom: '10px' }}>Качество</h4>
                    <StarRating
                        onChange={(value) =>
                            setRatings((prev) => ({ ...prev, quality: value }))
                        }
                    />
                    <span style={{ marginLeft: '10px' }}>
                        {ratings.quality || '-'}
                    </span>
                </div>
                <div>
                    <h4 style={{ marginBottom: '10px' }}>Обслуживание</h4>
                    <StarRating
                        onChange={(value) =>
                            setRatings((prev) => ({ ...prev, service: value }))
                        }
                    />
                    <span style={{ marginLeft: '10px' }}>
                        {ratings.service || '-'}
                    </span>
                </div>
                <div>
                    <h4 style={{ marginBottom: '10px' }}>Цена</h4>
                    <StarRating
                        onChange={(value) =>
                            setRatings((prev) => ({ ...prev, price: value }))
                        }
                    />
                    <span style={{ marginLeft: '10px' }}>
                        {ratings.price || '-'}
                    </span>
                </div>
                <div
                    style={{
                        marginTop: '10px',
                        padding: '10px',
                        background: '#f0f0f0',
                    }}
                >
                    <strong>Средний рейтинг:</strong>{' '}
                    {Object.values(ratings).filter(Boolean).length > 0
                        ? (
                              Object.values(ratings).reduce(
                                  (a, b) => a + b,
                                  0,
                              ) / Object.values(ratings).filter(Boolean).length
                          ).toFixed(1)
                        : '-'}
                </div>
            </div>
        );
    },
};
