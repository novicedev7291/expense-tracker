package com.expense.tracker.adapter.ui;

import com.expense.tracker.adapter.LocalDateUtil;
import com.vaadin.flow.component.AbstractField;
import com.vaadin.flow.component.ComponentEvent;
import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.html.Label;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.shared.Registration;
import org.apache.commons.lang3.StringUtils;

import java.time.LocalDate;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
public class MonthYearView extends HorizontalLayout {
    private final DatePicker datePicker = new DatePicker();
    private String monthYear;

    public MonthYearView() {
        addClassName("month-picker-view");
        setUpSheetMonthYear();

        Label label = new Label("Month");
        label.setWidth(null);
        label.addClassName("month-picker-label");

        setDefaultVerticalComponentAlignment(Alignment.CENTER);

        add(label, datePicker);
        this.monthYear = getMonthValueFrom(datePicker.getValue());
    }

    public String value() {
        return monthYear;
    }

    private void setUpSheetMonthYear() {
        LocalDate now = LocalDate.now();
        LocalDate date1stOfCurrentMonthYear = LocalDateUtil.localDateOf(now.getYear(), now.getMonthValue(), 1)
                .toLocalDate();
        datePicker.setValue(date1stOfCurrentMonthYear);
        datePicker.addValueChangeListener(this::notifyValueUpdate);
    }

    private void notifyValueUpdate(AbstractField.ComponentValueChangeEvent<DatePicker, LocalDate> e) {
        monthYear = getMonthValueFrom(e.getValue());
        fireEvent(new MonthValueChangeEvent(this, monthYear));
    }

    private String getMonthValueFrom(LocalDate date) {
        return StringUtils.leftPad(""+date.getMonthValue(), 2, '0') + "/" +date.getYear();
    }

     abstract static class MonthValueEvent extends ComponentEvent<MonthYearView> {
        private final String monthYear;
        protected MonthValueEvent(MonthYearView source, String monthYear) {
            super(source, false);
            this.monthYear = monthYear;
        }

        public String chosenValue() {
            return monthYear;
        }
    }

    public static class MonthValueChangeEvent extends MonthValueEvent {
        protected MonthValueChangeEvent(MonthYearView source, String monthYear) {
            super(source, monthYear);
        }
    }

    @Override
    protected <T extends ComponentEvent<?>> Registration addListener(Class<T> eventType,
                                                                     ComponentEventListener<T> listener) {
        return getEventBus().addListener(eventType, listener);
    }
}
