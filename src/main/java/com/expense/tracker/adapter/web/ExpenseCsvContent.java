package com.expense.tracker.adapter.web;

import com.google.common.base.Splitter;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

/**
 * @author <a href="kuldeepyadav7291@gmail.com">Kuldeep</a>
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseCsvContent {
    public static final Pattern NEWLINE_SEPARATOR = Pattern.compile("\r?\n");
    private String content;
    private String monthYear;

    public List<String> asLines() {
        List<String> lines = new ArrayList<>(Splitter.on(NEWLINE_SEPARATOR)
                .omitEmptyStrings()
                .splitToList(content));
        lines.remove(0); //Remove header row
        return lines;
    }
}
