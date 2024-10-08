import React, { useRef, useState } from 'react'
import { Timesheet, TimesheetRef } from '@easyteam/ui';

const EmployeeTimeSheetScreen = () => {
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
        />
    )
}

export default EmployeeTimeSheetScreen