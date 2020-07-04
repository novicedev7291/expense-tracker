package com.expense.tracker.adapter;

import java.time.Clock;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

public class LocalDateUtil {

    public static final DateTimeFormatter DATE_UI_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    private LocalDateUtil() {
    }

    public static LocalDateTime localDateOf(int year, int month, int day) {
        return LocalDateTime.of(year, month, day, 0, 0);
    }

    public static LocalDateTime startDateOf(int year, int month) {
        return localDateOf(year, month, 1);
    }

    public static LocalDateTime lastDateOfMonthFor(LocalDateTime givenDate) {
        int month = givenDate.getMonthValue() + 1;
        if(month > 12) {
            month = 1;
        }
        return localDateOf(givenDate.getYear(), month, 1).minusDays(1L);
    }

    static LocalDateTime dateFromUIMonthYear(String rawMonthYear) {
        YearMonth yearMonth = YearMonth.parse(rawMonthYear, DateTimeFormatter.ofPattern("MM/yyyy"));
        LocalDate localDate = yearMonth.atDay(1);
        return localDate.atStartOfDay();
    }

    public static Clock fixedClockFor(String rawMonthYear) {
        LocalDateTime dateForMonthYear = dateFromUIMonthYear(rawMonthYear);
        return Clock.fixed(
                dateForMonthYear.toInstant(ZoneOffset.ofHours(0)),
                ZoneId.of("Asia/Kolkata")
        );
    }

    public static LocalDateTime dateFromUIFormat(String rawDate) {
        LocalDate localDate = LocalDate.parse(rawDate, DATE_UI_FORMAT);
        return localDate.atStartOfDay();
    }

    public static String dateToUIFormat(LocalDateTime addedOn) {
        return addedOn.format(DATE_UI_FORMAT);
    }
}
