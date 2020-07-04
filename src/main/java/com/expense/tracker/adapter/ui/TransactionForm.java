package com.expense.tracker.adapter.ui;

import com.expense.tracker.adapter.LocalDateUtil;
import com.expense.tracker.adapter.web.TransactionDto;
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
public class TransactionForm extends FormLayout {
    private TextField source = new TextField("Source");
    private TextField amount = new TextField("Amount");
    private DatePicker addedOn = new DatePicker("Added On");

    private final Button save = new Button("Save");
    private final Button cancel = new Button("Cancel");

    private TransactionDto transactionDto;
    Binder<TransactionDto> binder = new BeanValidationBinder<>(TransactionDto.class);

    public TransactionForm() {
        addClassName("transaction-form");

        binder.forField(addedOn).bind(
                incomeData -> {
                    if(Objects.isNull(incomeData.getAddedOn()))
                        return LocalDate.now();
                    return LocalDateUtil.dateFromUIFormat(incomeData.getAddedOn()).toLocalDate();
                },
                (incomeData, uiValue) -> incomeData.setAddedOn(LocalDateUtil.dateToUIFormat(uiValue.atStartOfDay()))
        );
        binder.bindInstanceFields(this);

        addedOn.setRequired(true);
        source.setRequired(true);
        amount.setRequiredIndicatorVisible(true);
        addedOn.setValue(LocalDate.now());

        add(
                source,
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
        cancel.addClickListener(e -> fireEvent(new TransactionForm.CancelEvent(this)));

        save.addClickShortcut(Key.ENTER);
        cancel.addClickShortcut(Key.ESCAPE);

        binder.addStatusChangeListener(event -> save.setEnabled(binder.isValid()));

        return new HorizontalLayout(save, cancel);
    }


    private void validateAndSave() {
        try{
            binder.writeBean(transactionDto);
            fireEvent(new TransactionForm.SaveEvent(this, transactionDto));
        }catch (ValidationException e) {
            log.error(e);
        }
    }

    public void setTransactionDto(TransactionDto transactionDto) {
        this.transactionDto = transactionDto;
        binder.readBean(transactionDto);

        if(Objects.nonNull(transactionDto) && Objects.isNull(transactionDto.getId())) {
            save.setVisible(true);
        }

        if(Objects.nonNull(transactionDto) && Objects.isNull(transactionDto.getId())) {
            save.setVisible(false);
        }
    }

    public abstract static class TransactionFormEvent extends ComponentEvent<TransactionForm> {
        private final TransactionDto transactionDto;

        protected TransactionFormEvent(TransactionForm source, TransactionDto transactionDto) {
            super(source, false);
            this.transactionDto = transactionDto;
        }

        public TransactionDto getTransactionDto() {
            return this.transactionDto;
        }
    }

    public static class SaveEvent extends TransactionFormEvent {
        protected SaveEvent(TransactionForm source, TransactionDto transactionDto) {
            super(source, transactionDto);
        }
    }

    public static class CancelEvent extends TransactionFormEvent {
        protected CancelEvent(TransactionForm source) {
            super(source, null);
        }
    }

    public <T extends ComponentEvent<?>> Registration addListener(Class<T> eventType,
                                                                  ComponentEventListener<T> listener) {
        return getEventBus().addListener(eventType, listener);
    }
}
