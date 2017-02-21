/*
	______________________________
	//////////////////////////////

		Simple Calculator
		Самостоятельная работа

		Автор: Гарипов Р.И.
	______________________________
	//////////////////////////////
*/


"use strict";

// Инициализируем все необходимые глобальные переменные
// ____________________________________________________

// Объекты DOM
// поле ввода
var enteringInput = document.getElementById("entering");
// поле вывода
var resultInput = document.getElementById("result");

// Кнопки с цифрами
var numBtns = document.getElementsByClassName("number");
// Кнопки с арифметическими операциями
var arithmeticBtns = document.getElementsByClassName("arithmetic");
// Кнопка, запускающая выполнение расчета
var resultBtn = document.getElementById("count");


// Глобальные переменные, необходимые для работы логики калькулятора

// Число первое
var num1;
// Число второе
var num2;
// Оператор
var operator;



// Логика приложения
// ____________________________________________________


// Вешаем event "click" на кнопки с цифрами
for (var i = 0; i < numBtns.length; i++) {
    numBtns[i].addEventListener("click", function(event) {
        // Добавляем цифру в поле ввода (enteringInput)
        enteringInput.value += event.target.textContent;
    });
}

// Вешаем event "click" на кнопки с арифметическими операциями
for (var i = 0; i < arithmeticBtns.length; i++) {
    arithmeticBtns[i].addEventListener("click", function(event) {
        // Сохраняем значение арифметического оператора
        operator = event.target.textContent;
        // Сохраняем первое число
        num1 = checkAndSaveValue();
        // Пропишем, какое было число в placeholder поля ввода
        enteringInput.placeholder += ` ${operator}`;
        // Очистим поле ввода
        enteringInput.value = '';
        // Очистим поле вывода, если есть какое-то значение
        resultInput.value = '';
    });
}

// Если в поле ввода число, если нет выводим инструкцию alert-ом
function checkAndSaveValue() {
    // Проверяем, что в поле ввода число
    if (!isNaN(Number(enteringInput.value))) {
        // Сохраняем значение числа 
        var num = Number(enteringInput.value);
        // Пропишем, какое было число в placeholder поля ввода
        enteringInput.placeholder = `${num}`;
        return num;
    } else {
        // Просим ввести число
        alert('Пожалуйста, введите число!');
        enteringInput.placeholder = `0`;
        return undefined;
    }
}

// Вешаем event "click" на кнопку, выводящую результат
resultBtn.addEventListener("click", function(event) {
    // Сохраняем второе число, очищаем поле ввода
    num2 = checkAndSaveValue();
    // Если какая-то переменная неопределена, то не делаем ничего
    if ((num1 == undefined || num2 == undefined || operator == undefined || isNaN(num1) || isNaN(num2))) {
        result = '';
        enteringInput.placeholder = `Введите первое число!`;
    } else {
        // Пропишем, что мы именно считали в placeholder поля ввода
        enteringInput.placeholder = `${num1} ${operator} ${num2}`;
        // Число с результатом, в зависимости от результата
        var result;
        if (operator == '+') {
            result = num1 + num2;
        } else if (operator == '-') {
            result = num1 - num2;
        } else if (operator == '*') {
            result = num1 * num2;
        } else if (operator == '/') {
            if (num2 == 0) { result = 'Деление на ноль запрещено'; } else {
                result = num1 / num2;
            }
        } else {
            // Просто как обработчик ошибок
            result = '';
            enteringInput.placeholder = `Введите первое число`;
        }
        // Выведем результат в поле вывода
        resultInput.value = '' + result;
    }

    // Обнуляем значения num1, num2, operator
    num1 = undefined;
    num2 = undefined;
    operator = undefined;

    // Очистим поле ввода
    enteringInput.value = '';

});
