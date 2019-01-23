# Tester

Jednoduchá aplikace sloužící k otevření a zpracování testů, které jsou uloženy v textových souborech s příponou txt. 

## Jak tester používat?
Soubory s testy musí mít přesný formát. Otázky i odpovědi musí vždy začínat na novém řádku. Správná odpověď má na začátku řádku +, špatná -. Otázky mohou začínat jakýmkoliv znakem kromě již zmíňených dvou.

Při opětovné návštěvě ze stejného počítače se lze vrátit k předchozím testům. Testy se automaticky ukládají do Local Storage v prohlížeči a jejich seznam je zobrazen na hlavní stránce, odkud je možné je i odstranit.

## Ukázka formátování souboru s testem

    Text první otázky
    + správná odpověd na první otázku
    - špatná odpověď na první otázku
    - špatná odpověď na první otázku
    + správná odpověd na první otázku
    Text druhé otázky
    - špatná odpověď na druhou otázku
    + správná odpověd na druhou otázku
    - špatná odpověď na druhou otázku


## Použité technologie
*   HTML5
*   CSS3
*   JS
*   jQuery
*   LocalStorage
*   Bootstrap