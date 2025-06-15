# Lista Zadań z Użytkownikami
# Wykonawcy: Marcel Wawryniuk, Seweryn Majewski, Daniel Domżalski, Sebastian Świt 

Prosta aplikacja do zarządzania zadaniami napisana w czystym JavaScript, zgodnie z zasadami programowania obiektowego (OOP).

## Funkcjonalności

### Zarządzanie Zadaniami
- Tworzenie i zarządzanie listą zadań
- Dodawanie, usuwanie i oznaczanie zadań jako ukończone
- Filtrowanie zadań (wszystkie, do zrobienia, zakończone)
- Sortowanie zadań (po priorytecie, dacie, kategorii)
- Wyszukiwanie zadań
- Statystyki zadań (wszystkie, zakończone, do zrobienia, przeterminowane)

### Funkcje Zadań
- Priorytety zadań (niski, średni, wysoki)
- Kategorie zadań (praca, nauka, hobby)
- Terminy wykonania zadań
- Przypisywanie zadań do użytkowników
- Oznaczanie zadań jako przeterminowane

### System Użytkowników
- Dodawanie i usuwanie użytkowników
- Przypisywanie zadań do użytkowników
- Automatyczne odprzypisywanie zadań przy usuwaniu użytkownika

### Interfejs Użytkownika
- Jasny i ciemny motyw
- Intuicyjna nawigacja
- Nowoczesny wygląd z wykorzystaniem Bootstrap 5

### Przechowywanie Danych
- Lokalne przechowywanie danych (localStorage)
- Automatyczne zapisywanie zmian
- Przywracanie stanu po odświeżeniu strony

## Struktura Projektu

- `index.html` - główny plik HTML
- `styles.css` - style CSS
- `js/`
  - `Task.js` - klasa reprezentująca pojedyncze zadanie
  - `TaskManager.js` - klasa zarządzająca zadaniami
  - `User.js` - klasa reprezentująca użytkownika i zarządzająca użytkownikami
  - `app.js` - główny plik aplikacji

## Jak Uruchomić

1. Sklonuj repozytorium
2. Otwórz plik `index.html` w przeglądarce

## Wymagania

- Nowoczesna przeglądarka internetowa z obsługą JavaScript
- Połączenie z internetem (do załadowania Bootstrap i ikon)

## Technologie

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5
- Bootstrap Icons
- LocalStorage API

## Funkcje w Planach

- Edycja istniejących zadań
- Edycja danych użytkowników
- Filtrowanie po kategoriach
- Filtrowanie po priorytetach
