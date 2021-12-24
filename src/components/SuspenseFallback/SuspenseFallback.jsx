import React from 'react';
import styles from './SuspenseFallback.module.scss';
// Images
import humoLogo from '../../assets/images/humo-logo-textless.svg';

const SuspenseFallback = ({title = "Заголовок пустой", ...props}) =>  {

    return (
        <div className={styles.imageContainer}>
            <img src={humoLogo} className={styles.brandLogo} />
        </div>
    );
}

export default SuspenseFallback;