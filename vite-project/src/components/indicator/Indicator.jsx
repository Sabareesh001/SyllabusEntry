import './Indicator.css';

const Indicator = ({ active, inactive ,label}) => {
    let className = 'indicatorContainer';

    if (active) {
        className += ' active';
    } else if (inactive) {
        className += ' inactive';
    }

    return (
        <div className={className}>
           {label}
        </div>
    );
};

export default Indicator;
