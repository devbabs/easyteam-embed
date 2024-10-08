import { StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'
import { Timesheet, TimesheetRef } from '@easyteam/ui';

const TimeSheetScreen = () => {
    const [startDate, setStartDate] = useState<string | undefined>();
	const [endDate, setEndDate] = useState<string | undefined>();
	const ref = useRef<TimesheetRef>(null);

    return (
        <Timesheet
            ref={ref}
            onDateRangeChange={(newStartDate: string, newEndDate: string) => {
                setStartDate(newStartDate);
                setEndDate(newEndDate);
            }}
            startDate={startDate}
            endDate={endDate}
            // onEvent={event => console.log(event)}
        />
    )
}

const styles = StyleSheet.create({})

export default TimeSheetScreen