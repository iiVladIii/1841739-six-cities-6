import { memo } from 'react';
import cls from './Loader.module.css';

interface Props {
    size?: number | string;
    width?: number | string;
    height?: number | string;
    isPage?: boolean;
}

export const Loader = memo((props: Props) => {
    const { size = 40, width, height, isPage } = props;

    const style = {
        width: width ?? size,
        height: height ?? size,
    };

    if (isPage)
        return (
            <div className={cls.pageWrapper}>
                <div className={cls.Loader} style={style}></div>
            </div>
        );

    return <div className={cls.Loader} style={style}></div>;
});
