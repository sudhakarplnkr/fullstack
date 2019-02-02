import * as React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DateExtension } from '../../utils/DateExtension';

interface Props {
    value?: Date;
    onChange(date: Date | null, event: React.SyntheticEvent<any> | undefined): void;
}

const DatePicker = (props: Props) => {
    return (
        <div className="input-group col-md-2">
            <ReactDatePicker
                className={'form-control calendar'}
                selected={props.value}
                value={DateExtension.displayDate(props.value && props.value)}
                onChange={props.onChange}
            />
            <span className="input-group-addon"><span className="glyphicon-calendar glyphicon" /></span>
        </div>
    );
};

export default DatePicker;