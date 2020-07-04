package com.expense.tracker.adapter.ui;

import com.expense.tracker.adapter.LocalDateUtil;
import com.expense.tracker.adapter.web.ExpenseDto;
import com.vaadin.flow.component.ComponentEvent;
import com.vaadin.flow.component.ComponentEventListener;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.formlayout.FormLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.BeanValidationBinder;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.data.binder.ValidationException;
import com.vaadin.flow.shared.Registration;
import lombok.extern.apachecommons.CommonsLog;

import java.time.LocalDate;
import java.util.Objects;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
@CommonsLog
public class ExpenseForm extends FormLayout {
    private TextField category = new TextField("Category");
    private TextField description = new TextField("Description");
    private TextField amount = new TextField("Amount");
    private DatePicker addedOn = new DatePicker("Added On");

    private final Button save = new Button("Save");
    private final Button cancel = new Button("Cancel");

    private ExpenseDto expenseDto;
    Binder<ExpenseDto> binder = new BeanValidationBinder<>(ExpenseDto.class);

    public ExpenseForm() {
        addClassName("expense-form");

        binder.forField(addedOn).bind(
                expenseData -> {
                    if(Objects.isNull(expenseData.getAddedOn()))
                        return LocalDate.now();
                    return LocalDateUtil.dateFromUIFormat(expenseData.getAddedOn()).toLocalDate();
                },
                (expenseData, uiValue) -> expenseData.setAddedOn(LocalDateUtil.dateToUIFormat(uiValue.atStartOfDay()))
        );
        binder.bindInstanceFields(this);

        addedOn.setRequired(true);
        description.setRequired(true);
        amount.setRequiredIndicatorVisible(true);
        addedOn.setValue(LocalDate.now());

        add(
                category,
                description,
                amount,
                addedOn,
                createButtonLayout()
        );
    }

    private HorizontalLayout createButtonLayout() {
        save.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        cancel.addThemeVariants(ButtonVariant.MATERIAL_OUTLINED);

        save.setVisible(false);

        save.addClickListener(e -> validateAndSave());
        cancel.addClickListener(e -> fireEvent(new CancelEvent(this)));

        save.addClickShortcut(Key.ENTER);
        cancel.addClickShortcut(Key.ESCAPE);

        binder.addStatusChangeListener(event -> save.setEnabled(binder.isValid()));

        return new HorizontalLayout(save, cancel);
    }


    private void validateAndSave() {
        try{
            binder.writeBean(expenseDto);
            fireEvent(new SaveEvent(this, expenseDto));
        }catch (ValidationException e) {
            log.error(e);
        }
    }

    public void setExpenseDto(ExpenseDto expenseDto) {
        this.expenseDto = expenseDto;
        binder.readBean(expenseDto);

        if(Objects.nonNull(expenseDto) && Objects.isNull(expenseDto.getId())) {
            save.setVisible(true);
        }

        if(Objects.nonNull(expenseDto) && Objects.nonNull(expenseDto.getId())) {
            save.setVisible(false);
        }
    }

    public abstract static class ExpenseFormEvent extends ComponentEvent<ExpenseForm> {
        private final ExpenseDto expenseDto;

        protected ExpenseFormEvent(ExpenseForm source, ExpenseDto expenseDto) {
            super(source, false);
            this.expenseDto = expenseDto;
        }

        public ExpenseDto getExpenseDto() {
            return this.expenseDto;
        }
    }

    public static class SaveEvent extends ExpenseFormEvent {
        protected SaveEvent(ExpenseForm source, ExpenseDto expenseDto) {
            super(source, expenseDto);
        }
    }

    public static class CancelEvent extends ExpenseFormEvent {
        protected CancelEvent(ExpenseForm source) {
            super(source, null);
        }
    }

    public <T extends ComponentEvent<?>> Registration addListener(Class<T> eventType,
                                                                  ComponentEventListener<T> listener) {
        return getEventBus().addListener(eventType, listener);
    }
}
