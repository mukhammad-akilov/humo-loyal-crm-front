import {SuspenseFallbackProps} from "./SuspenseFallback.props";
import styles from './SuspenseFallback.module.scss';
// Images
import humoLogo from '../../assets/images/humo-logo-textless.svg';

const SuspenseFallback = ({title = "Заголовок пустой"}: SuspenseFallbackProps): JSX.Element =>  {

    return (
        <div className={styles.imageContainer}>
            <img src={humoLogo} className={styles.brandLogo} />
        </div>
    );
}

export default SuspenseFallback;