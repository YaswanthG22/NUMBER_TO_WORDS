package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NumberToWordsController {

    private final String[] ones = {"", "one", "two", "three", "four", "five", "six",
            "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen",
            "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"};

    private final String[] tens = {"", "", "twenty", "thirty", "forty", "fifty",
            "sixty", "seventy", "eighty", "ninety"};

    private final String[] thousands = {"", "thousand", "million", "billion"};

    @GetMapping("/convert")
    public String convertNumber(@RequestParam long number) {
        if (number == 0) return "zero";
        return convert(number).trim();
    }

    private String convert(long num) {
        StringBuilder words = new StringBuilder();
        int i = 0;
        while (num > 0) {
            int chunk = (int) (num % 1000);
            if (chunk != 0) {
                words.insert(0, helper(chunk) + thousands[i] + " ");
            }
            num /= 1000;
            i++;
        }
        return words.toString().replaceAll("\\s+", " ").trim();
    }

    private String helper(int num) {
        if (num == 0) return "";
        else if (num < 20) return ones[num] + " ";
        else if (num < 100) return tens[num / 10] + " " + helper(num % 10);
        else return ones[num / 100] + " hundred " + helper(num % 100);
    }
}
